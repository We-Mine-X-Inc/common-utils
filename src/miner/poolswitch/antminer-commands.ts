import AxiosDigestAuth from "@mhoc/axios-digest-auth";
import {
  MinerCommandResolution,
  SwitchPoolParams,
  VerifyOperationsParams,
} from "./common-types";
// import { format as prettyFormat } from "pretty-format";
import { HostedMinerInflated, MinerErrorType, Pool } from "wemine-apis";

import {
  isFanSpeedWithinBounds,
  isHashRateWithinBounds,
  isInletTempWithinBounds,
  isOutletTempWithinBounds,
} from "./common-funcs";
import {
  MINER_FAN_SPEED_FAILURE_PREFIX,
  MINER_FAN_SPEED_HEALTHY_MSG,
  MINER_HASHRATE_FAILURE_PREFIX,
  MINER_HASHRATE_HEALTHY_MSG,
  MINER_TEMPERATURE_FAILURE_PREFIX,
  MINER_TEMPERATURE_HEALTHY_MSG,
  POOL_STATUS_HEALTHY_MSG,
  POOL_SWITCHING_FAILURE_PREFIX,
  POOL_VERIFICATION_FAILURE_PREFIX,
} from "./constants";
import { constructPoolUser } from "../pool-user";

const ANTMINER_DEFAULTS = {
  MINER_USERNAME: "root",
  MINER_PWD: "root",
};
const ANTMINER_DIGESTAUTH = new AxiosDigestAuth({
  username: ANTMINER_DEFAULTS.MINER_USERNAME,
  password: ANTMINER_DEFAULTS.MINER_PWD,
});

const EMPTY_POOL_CONFIG = {
  url: "",
  user: "",
  pass: "",
};

type AntminerMinerPoolInfo = {
  url: string;
  user: string;
  pass: string;
};

type PoolValidationInfo = {
  macAddress: string;
};

type MinerValidator<T> = (param: PoolValidationInfo) => T;

type PoolConfigInfo = {
  "bitmain-fan-ctrl": boolean;
  "bitmain-fan-pwm": string;
  "freq-level": string;
  "miner-mode": number;
  pools: AntminerMinerPoolInfo[];
};

type AntminerChainInfo = {
  temp_chip: Array<number>;
};

type AntminerFanInfo = {
  fan: Array<number>;
};

async function getSytemInfo(ipAddress: string): Promise<PoolValidationInfo> {
  return await ANTMINER_DIGESTAUTH.request({
    headers: { Accept: "application/json" },
    method: "GET",
    url: `http://${ipAddress}/cgi-bin/get_system_info.cgi`,
  }).then((res) => {
    return { macAddress: res.data["macaddr"] };
  });
}

function verifyMinerIsForClient<
  T extends SwitchPoolParams | VerifyOperationsParams
>(params: T): MinerValidator<T> {
  return (validationInfo: PoolValidationInfo) => {
    if (validationInfo.macAddress != params.hostedMiner.macAddress) {
      throw Error("Miner mismatch. The MAC does not match the expected IP.");
    }
    return params;
  };
}

function getMinerConfig(
  params: SwitchPoolParams | VerifyOperationsParams
): () => Promise<PoolConfigInfo> {
  return async () => {
    return await ANTMINER_DIGESTAUTH.request({
      headers: { Accept: "application/json" },
      method: "GET",
      url: `http://${params.hostedMiner.ipAddress}/cgi-bin/stats.cgi`,
    }).then((res) => {
      const minerConfig = res.data;
      const pools: AntminerMinerPoolInfo[] = minerConfig["pools"];
      return {
        "bitmain-fan-ctrl": minerConfig["bitmain-fan-ctrl"],
        "bitmain-fan-pwm": minerConfig["bitmain-fan-pwm"],
        "freq-level": minerConfig["bitmain-freq-level"],
        "miner-mode": parseInt(minerConfig["bitmain-work-mode"]),
        pools: pools,
      };
    });
  };
}

function updateMinerConfig(
  switchPoolParams: SwitchPoolParams
): (poolConfig: PoolConfigInfo) => Promise<any> {
  return async (poolConfig: PoolConfigInfo) => {
    const data = buildNewMinerConfig(switchPoolParams, poolConfig);
    return await ANTMINER_DIGESTAUTH.request({
      headers: { Accept: "application/json" },
      method: "POST",
      url: `http://${switchPoolParams.hostedMiner.ipAddress}/cgi-bin/set_miner_conf.cgi`,
      data: data,
    });
  };
}

function verifyLivePoolStatus(
  verifyPoolParams: VerifyOperationsParams
): () => Promise<any> {
  return async () => {
    return await ANTMINER_DIGESTAUTH.request({
      headers: { Accept: "application/json" },
      method: "GET",
      url: `http://${verifyPoolParams.hostedMiner.ipAddress}/cgi-bin/pools.cgi`,
    }).then((resp: any) => {
      const currentPoolInfo = resp.data["POOLS"][0];
      const expectedUrl = constructPoolUrl(verifyPoolParams.pool);
      const expectedUser = constructPoolUser(verifyPoolParams);
      if (
        !(
          currentPoolInfo.url == expectedUrl &&
          currentPoolInfo.user == expectedUser &&
          currentPoolInfo.status == "Alive" &&
          currentPoolInfo.priority == 0
        )
      ) {
        throw Error(
          `Bitmain miner pool does not match expectations.
          Actual v. Expected:
            ${currentPoolInfo.url} - ${expectedUrl}
            ${currentPoolInfo.user} - ${expectedUser}
            ${currentPoolInfo.status} - Alive
            ${currentPoolInfo.priority} - 0
          Please check miner:
            ${verifyPoolParams.hostedMiner.ipAddress}
            ${verifyPoolParams.hostedMiner.friendlyMinerId} `
        );
      }
    });
  };
}

export async function rebootAntminerMiner(params: SwitchPoolParams) {
  await ANTMINER_DIGESTAUTH.request({
    headers: { Accept: "application/json" },
    method: "GET",
    url: `http://${params.hostedMiner.ipAddress}/cgi-bin/reboot.cgi`,
  });
}

function buildNewMinerConfig(
  switchPoolInfo: SwitchPoolParams,
  poolConfig: PoolConfigInfo
): PoolConfigInfo {
  const newPoolConfig = { ...poolConfig };
  newPoolConfig.pools = [
    {
      url: constructPoolUrl(switchPoolInfo.pool),
      user: constructPoolUser(switchPoolInfo),
      pass: "",
    },
    EMPTY_POOL_CONFIG,
    EMPTY_POOL_CONFIG,
  ];
  return newPoolConfig;
}

function constructPoolUrl(pool: Pool) {
  return `${pool.protocol}://${pool.domain}`;
}

export async function switchAntminerPool(
  params: SwitchPoolParams
): Promise<MinerCommandResolution> {
  return await getSytemInfo(params.hostedMiner.ipAddress)
    .then(verifyMinerIsForClient(params))
    .then(getMinerConfig(params))
    .then(updateMinerConfig(params))
    .catch((e) => {
      const error = `${POOL_SWITCHING_FAILURE_PREFIX}
        Failed trying to switch Antminer's Pool: ${JSON.stringify(params)}.
        Error msg: ${e}.`;

      return Promise.reject({
        minerErrorType: MinerErrorType.POOL_SWITCH_ERROR,
        stackTrace: error,
      });
    });
}

export async function verifyAntminerPool(
  params: VerifyOperationsParams
): Promise<MinerCommandResolution> {
  return await getSytemInfo(params.hostedMiner.ipAddress)
    .then(verifyMinerIsForClient(params))
    .then(getMinerConfig(params))
    .then(verifyLivePoolStatus(params))
    .then(() => POOL_STATUS_HEALTHY_MSG)
    .catch((e) => {
      const error = `${POOL_VERIFICATION_FAILURE_PREFIX} 
        Failed to verify the mining pool for an Antminer: ${JSON.stringify(
          params
        )}.
        Error msg: ${e}.`;

      return Promise.reject({
        minerErrorType: MinerErrorType.POOL_STATUS_ERROR,
        stackTrace: error,
      });
    });
}

export async function verifyAntminerHashRate(
  hostedMiner: HostedMinerInflated
): Promise<MinerCommandResolution> {
  return await ANTMINER_DIGESTAUTH.request({
    headers: { Accept: "application/json" },
    method: "GET",
    url: `http://${hostedMiner.ipAddress}/cgi-bin/stats.cgi`,
  }).then((res) => {
    const minerStats = res.data["STATS"][0];
    if (
      !(
        isHashRateWithinBounds({
          hostedMiner: hostedMiner,
          actualHashRate: minerStats["rate_5s"],
        }) &&
        isHashRateWithinBounds({
          hostedMiner: hostedMiner,
          actualHashRate: minerStats["rate_30m"],
        }) &&
        isHashRateWithinBounds({
          hostedMiner: hostedMiner,
          actualHashRate: minerStats["rate_avg"],
        })
      )
    ) {
      return Promise.reject({
        minerErrorType: MinerErrorType.HASH_RATE_ERROR,
        stackTrace: Error(`${MINER_HASHRATE_FAILURE_PREFIX}
      HashRate not within the expected bounds: 
        expectedHashRate for miner - ${JSON.stringify(
          hostedMiner.miner.operationDetails.expectedHashRateRange
        )}
        rate_5s actualHashRate - ${minerStats["rate_5s"]}
        rate_30m actualHashRate - ${minerStats["rate_30m"]}
        rate_avg actualHashRate - ${minerStats["rate_avg"]}.
        Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`),
      });
    }

    return MINER_HASHRATE_HEALTHY_MSG;
  });
}

export async function verifyAntminerFanSpeed(
  hostedMiner: HostedMinerInflated
): Promise<MinerCommandResolution> {
  return await ANTMINER_DIGESTAUTH.request({
    headers: { Accept: "application/json" },
    method: "GET",
    url: `http://${hostedMiner.ipAddress}/cgi-bin/stats.cgi`,
  }).then((res) => {
    const minerFanSpeeds: AntminerFanInfo = res.data["STATS"][0];
    const malfunctioningFans = minerFanSpeeds.fan.filter((fanSpeed) => {
      return isFanSpeedWithinBounds({
        hostedMiner: hostedMiner,
        actualFanSpeed: fanSpeed,
      });
    });
    if (malfunctioningFans.length > 0) {
      return Promise.reject({
        minerErrorType: MinerErrorType.FAN_SPEED_ERROR,
        stackTrace: Error(`${MINER_FAN_SPEED_FAILURE_PREFIX}
      Fan speeds are concerning and not within the expected bounds: 
        expectedFansSpeeds for miner - ${JSON.stringify(
          hostedMiner.miner.operationDetails.expectedFanSpeedRange
        )}
        malfunctioning fan speeds: ${malfunctioningFans}. 
        Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`),
      });
    }

    return MINER_FAN_SPEED_HEALTHY_MSG;
  });
}

export async function verifyAntminerTemperature(
  hostedMiner: HostedMinerInflated
): Promise<MinerCommandResolution> {
  return await ANTMINER_DIGESTAUTH.request({
    headers: { Accept: "application/json" },
    method: "GET",
    url: `http://${hostedMiner.ipAddress}/cgi-bin/stats.cgi`,
  }).then((res) => {
    const minerChains: Array<AntminerChainInfo> = res.data["STATS"][0]["chain"];
    const tempMalfunctioningChips = minerChains.filter((chainStats) => {
      const [inlet1, inlet2, outlet1, outlet2] = chainStats.temp_chip;
      return !(
        isInletTempWithinBounds({
          hostedMiner: hostedMiner,
          actualTemperature: inlet1,
        }) &&
        isInletTempWithinBounds({
          hostedMiner: hostedMiner,
          actualTemperature: inlet2,
        }) &&
        isOutletTempWithinBounds({
          hostedMiner: hostedMiner,
          actualTemperature: outlet1,
        }) &&
        isOutletTempWithinBounds({
          hostedMiner: hostedMiner,
          actualTemperature: outlet2,
        })
      );
    });
    if (tempMalfunctioningChips.length > 0) {
      return Promise.reject({
        minerErrorType: MinerErrorType.TEMPERATURE_ERROR,
        stackTrace: Error(`${MINER_TEMPERATURE_FAILURE_PREFIX}
      Temperatures are concerning and not within the expected bounds: 
        expectedTemperature within miner - ${hostedMiner}
        malfunctioning chip temperatures: ${tempMalfunctioningChips}. 
        Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`),
      });
    }

    return MINER_TEMPERATURE_HEALTHY_MSG;
  });
}
