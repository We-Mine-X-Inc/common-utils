import axios from "axios";
import {
  MinerCommandResolution,
  SwitchPoolParams,
  VerifyOperationsParams,
} from "./common-types";
import { HostedMinerInflated, MinerErrorType, Pool } from "wemine-apis";
import {
  isFanSpeedWithinBounds,
  isHashRateWithinBounds,
  isOutletTempWithinBounds,
} from "./common-funcs";
import { assertMiner } from "wemine-apis";
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

const NUMBERS_ONLY_REGEX = /\d+/g;

const GOLDSHELL_DEFAULTS = {
  POOL_PWD: "123",
  MINER_USERNAME: "admin",
  MINER_PWD: "123456789",
};

type SessionInfo = {
  ipAddress: string;
  authToken: string;
};

type GoldshellMinerPoolInfo = {
  url: string;
  active: boolean;
  dragid: number;
  user: string;
  "pool-priority": number;
  pass: string;
  legal: boolean;
};

type PoolValidationInfo = {
  sessionInfo: SessionInfo;
  macAddress: string;
};

type MinerValidator = (param: PoolValidationInfo) => SessionInfo;

type ApplyPoolSwitchInfo = {
  sessionInfo: SessionInfo;
  pools: GoldshellMinerPoolInfo[];
};

async function loginToMiner(ipAddress: string): Promise<SessionInfo> {
  return await axios({
    method: "get",
    url: `http://${ipAddress}/user/login?username=${GOLDSHELL_DEFAULTS.MINER_USERNAME}&password=${GOLDSHELL_DEFAULTS.MINER_PWD}`,
  }).then((res: any) => {
    return { ipAddress: ipAddress, authToken: res.data["JWT Token"] };
  });
}

async function getSettings(
  sessionInfo: SessionInfo
): Promise<PoolValidationInfo> {
  return await axios({
    method: "get",
    url: `http://${sessionInfo.ipAddress}/mcb/setting`,
    headers: getRequestHeaders(sessionInfo.authToken),
  }).then((res) => {
    return {
      sessionInfo: sessionInfo,
      macAddress: res.data.name,
    };
  });
}

function verifyMinerIsForClient<
  T extends SwitchPoolParams | VerifyOperationsParams
>(params: T): MinerValidator {
  return (validationInfo: PoolValidationInfo) => {
    if (validationInfo.macAddress != params.hostedMiner.macAddress) {
      throw Error("Miner mismatch. The MAC does not match the expected IP.");
    }
    return validationInfo.sessionInfo;
  };
}

async function getPools(
  sessionInfo: SessionInfo
): Promise<ApplyPoolSwitchInfo> {
  return await axios({
    method: "get",
    url: `http://${sessionInfo.ipAddress}/mcb/pools`,
    headers: getRequestHeaders(sessionInfo.authToken),
  }).then((res) => {
    return {
      sessionInfo: sessionInfo,
      pools: res.data,
    };
  });
}

async function deletePools(
  poolSwitchInfo: ApplyPoolSwitchInfo
): Promise<SessionInfo> {
  const sessionInfo = poolSwitchInfo.sessionInfo;
  if (poolSwitchInfo.pools.length <= 0) {
    return new Promise((resolve) => {
      resolve(sessionInfo);
    });
  }
  return Promise.all(
    poolSwitchInfo.pools.map((pool) => {
      return axios({
        method: "put",
        url: `http://${sessionInfo.ipAddress}/mcb/delpool`,
        headers: getRequestHeaders(sessionInfo.authToken),
        data: pool,
      });
    })
  ).then(() => {
    return sessionInfo;
  });
}

function addPool(switchPoolParams: SwitchPoolParams) {
  return async (sessionInfo: SessionInfo): Promise<SessionInfo> => {
    return await axios({
      method: "put",
      url: `http://${sessionInfo.ipAddress}/mcb/newpool`,
      headers: getRequestHeaders(sessionInfo.authToken),
      data: buildNewPool(switchPoolParams),
    }).then(() => {
      return sessionInfo;
    });
  };
}

export async function rebootGoldshellMiner(params: SwitchPoolParams) {
  const sessionInfo = await loginToMiner(params.hostedMiner.ipAddress);
  return await axios({
    method: "get",
    url: `http://${sessionInfo.ipAddress}/mcb/restart`,
    headers: getRequestHeaders(sessionInfo.authToken),
  });
}

function buildNewPool(
  switchPoolParams: SwitchPoolParams
): GoldshellMinerPoolInfo {
  return {
    legal: true,
    url: constructPoolUrl(switchPoolParams.pool),
    user: constructPoolUser(switchPoolParams),
    pass: GOLDSHELL_DEFAULTS.POOL_PWD,
    dragid: 0,
    active: false,
    "pool-priority": 0,
  };
}

function constructPoolUrl(pool: Pool) {
  return `${pool.protocol}://${pool.domain}`;
}

export async function switchGoldshellPool(
  params: SwitchPoolParams
): Promise<MinerCommandResolution> {
  return await loginToMiner(params.hostedMiner.ipAddress)
    .then(getSettings)
    .then(verifyMinerIsForClient(params))
    .then(getPools)
    .then(deletePools)
    .then(addPool(params))
    .catch((e) => {
      const error = `${POOL_SWITCHING_FAILURE_PREFIX} 
        Failed trying to switch Goldshell's Pool: ${JSON.stringify(params)}.
        Error msg: ${e}.`;

      return Promise.reject({
        minerErrorType: MinerErrorType.POOL_SWITCH_ERROR,
        stackTrace: error,
      });
    });
}

export async function verifyGoldshellPool(
  params: VerifyOperationsParams
): Promise<MinerCommandResolution> {
  return await loginToMiner(params.hostedMiner.ipAddress)
    .then(getSettings)
    .then(verifyMinerIsForClient(params))
    .then(verifyLivePoolStatus(params))
    .then(() => POOL_STATUS_HEALTHY_MSG)
    .catch((e) => {
      const error = `${POOL_VERIFICATION_FAILURE_PREFIX} 
        Failed to verify the mining pool for an Goldshell: ${JSON.stringify(
          params
        )}.
        Error msg: ${e}.`;

      return Promise.reject({
        minerErrorType: MinerErrorType.POOL_STATUS_ERROR,
        stackTrace: error,
      });
    });
}

function verifyLivePoolStatus(
  verifyPoolParams: VerifyOperationsParams
): (sessionInfo: SessionInfo) => Promise<MinerCommandResolution> {
  return async (sessionInfo: SessionInfo) => {
    return await axios({
      method: "get",
      url: `http://${sessionInfo.ipAddress}/mcb/pools`,
      headers: getRequestHeaders(sessionInfo.authToken),
    }).then((res) => {
      const currentPoolInfo = res.data[0];
      const expectedUrl = constructPoolUrl(verifyPoolParams.pool);
      const expectedUser = constructPoolUser(verifyPoolParams);

      if (
        !(
          currentPoolInfo.url == expectedUrl &&
          currentPoolInfo.user == expectedUser &&
          currentPoolInfo.active &&
          currentPoolInfo["pool-priority"] == 0
        )
      ) {
        return Promise.reject({
          minerErrorType: MinerErrorType.POOL_STATUS_ERROR,
          stackTrace: Error(
            `Goldshell miner pool does not match expectations.
            Actual v. Expected:
              ${currentPoolInfo.url} - ${expectedUrl}
              ${currentPoolInfo.user} - ${expectedUser}
              ${currentPoolInfo.active} - true
              ${currentPoolInfo["pool-priority"]} - 0
            Please check miner:
              ${verifyPoolParams.hostedMiner.ipAddress}
              ${verifyPoolParams.hostedMiner.friendlyMinerId} `
          ),
        });
      }

      return POOL_STATUS_HEALTHY_MSG;
    });
  };
}

export async function verifyGoldshellHashRate(
  hostedMiner: HostedMinerInflated
): Promise<MinerCommandResolution> {
  const { ipAddress, authToken } = await loginToMiner(hostedMiner.ipAddress);

  return await axios({
    method: "get",
    url: `http://${ipAddress}/mcb/cgminer?cgminercmd=devs`,
    headers: getRequestHeaders(authToken),
  }).then((res) => {
    const chipStats = res.data["data"];
    const chipHashRates = chipStats.map(
      (chipStat: any) => chipStat["hashrate"]
    );
    const actualHashRate = chipHashRates.reduce(
      (partialSum: number, a: number) => partialSum + a,
      0
    );
    if (
      !isHashRateWithinBounds({
        hostedMiner: hostedMiner,
        actualHashRate,
      })
    ) {
      const miner = hostedMiner.miner;
      assertMiner(miner);

      const expectedHashRateRange =
        miner.operationDetails.expectedHashRateRange;

      return Promise.reject({
        minerErrorType: MinerErrorType.HASH_RATE_ERROR,
        stackTrace: Error(`${MINER_HASHRATE_FAILURE_PREFIX} 
          HashRate not within the expected bounds: 
            miner --> ${hostedMiner}
            expectedHashRate --> ${expectedHashRateRange}
            actualHashRate -> ${actualHashRate}.
            Please check miner: ${JSON.stringify(ipAddress)}`),
      });
    }

    return MINER_HASHRATE_HEALTHY_MSG;
  });
}

export async function verifyGoldshellFanSpeed(
  hostedMiner: HostedMinerInflated
): Promise<MinerCommandResolution> {
  const { ipAddress, authToken } = await loginToMiner(hostedMiner.ipAddress);

  return await axios({
    method: "get",
    url: `http://${ipAddress}/mcb/cgminer?cgminercmd=devs`,
    headers: getRequestHeaders(authToken),
  }).then((res) => {
    const chipStats = res.data["data"];
    const minerFanSpeeds = chipStats.flatMap((chipStat: any) =>
      parseInt(chipStat["fanspeed"].match(NUMBERS_ONLY_REGEX))
    );
    const malfunctioningFans = minerFanSpeeds.filter((fanSpeed: number) => {
      return !isFanSpeedWithinBounds({
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

export async function verifyGoldshellTemperature(
  hostedMiner: HostedMinerInflated
): Promise<MinerCommandResolution> {
  const { ipAddress, authToken } = await loginToMiner(hostedMiner.ipAddress);

  return await axios({
    method: "get",
    url: `http://${ipAddress}/mcb/cgminer?cgminercmd=devs`,
    headers: getRequestHeaders(authToken),
  }).then((res) => {
    const chipStats = res.data["data"];
    const chipTemps = chipStats.map((chipStats: any) =>
      chipStats["temp"].match(NUMBERS_ONLY_REGEX)
    );
    const tempMalfunctioningChips = chipTemps.filter((chipTemp: number) => {
      return !isOutletTempWithinBounds({
        hostedMiner: hostedMiner,
        actualTemperature: chipTemp,
      });
    });
    if (tempMalfunctioningChips.length > 0) {
      return Promise.reject({
        minerErrorType: MinerErrorType.POOL_STATUS_ERROR,
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

function getRequestHeaders(authToken: string) {
  return {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    Connection: "keep-alive",
  };
}
