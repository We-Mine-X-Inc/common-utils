import axios from "axios";
import { HostedMinerInflated, MinerErrorType } from "wemine-apis";
import {
  MinerCommandResolution,
  SwitchPoolParams,
  VerifyOperationsParams,
} from "./common-types";
import {
  isFanSpeedWithinBounds,
  isHashRateWithinBounds,
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
const { exec } = require("child_process");

const SUMMARY_FIELD = "SUMMARY";
const MEGA_HASH_WITHIN_5_SECS = "MHS 5s";
const MEGA_HASH_WITHIN_15_MINS = "MHS 15m";
const MEGA_HASH_AVG = "MHS av";

export async function verifyBraiinsHashRate(
  hostedMiner: HostedMinerInflated
): Promise<MinerCommandResolution> {
  return new Promise((resolve, reject) => {
    const minerIP = hostedMiner.ipAddress;
    const getSummaryCommand = `echo '{"command":"summary"}' | nc ${minerIP} 4028 | jq .`;
    exec(getSummaryCommand, (error: any, stdout: any, stderr: any) => {
      const minerStats = JSON.parse(stdout)[SUMMARY_FIELD][0];
      const hashRate5Secs = minerStats[MEGA_HASH_WITHIN_5_SECS];
      const hashRate15Mins = minerStats[MEGA_HASH_WITHIN_15_MINS];
      const hashRateAvg = minerStats[MEGA_HASH_AVG];
      if (
        !(
          isHashRateWithinBounds({
            hostedMiner: hostedMiner,
            actualHashRate: hashRate5Secs,
          }) &&
          isHashRateWithinBounds({
            hostedMiner: hostedMiner,
            actualHashRate: hashRate15Mins,
          }) &&
          isHashRateWithinBounds({
            hostedMiner: hostedMiner,
            actualHashRate: hashRateAvg,
          })
        )
      ) {
        reject({
          minerErrorType: MinerErrorType.HASH_RATE_ERROR,
          stackTrace: Error(`${MINER_HASHRATE_FAILURE_PREFIX}
          HashRate not within the expected bounds: 
            expectedHashRate for miner - ${JSON.stringify(
              hostedMiner.miner.operationDetails.expectedHashRateRange
            )}
            MHS 5s actualHashRate - ${hashRate5Secs}
            MHS 15m actualHashRate - ${hashRate15Mins}
            MHS avg actualHashRate - ${hashRateAvg}.
            Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`),
        });
      }
      resolve(MINER_HASHRATE_HEALTHY_MSG);
    });
  });
}

export async function verifyBraiinsFanSpeed(
  hostedMiner: HostedMinerInflated
): Promise<MinerCommandResolution> {
  return new Promise((resolve, reject) => {
    const minerIP = hostedMiner.ipAddress;
    const getFanStatsCommand = `echo '{"command":"fans"}' | nc ${minerIP} 4028 | jq .`;
    exec(getFanStatsCommand, (error: any, stdout: any, stderr: any) => {
      const minerFanStats = JSON.parse(stdout)["FANS"];
      const malfunctioningFans = minerFanStats.filter((fanStats: any) => {
        return !isFanSpeedWithinBounds({
          hostedMiner: hostedMiner,
          actualFanSpeed: parseInt(fanStats["RPM"]),
        });
      });
      if (malfunctioningFans.length > 0) {
        reject({
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
      resolve(MINER_FAN_SPEED_HEALTHY_MSG);
    });
  });
}

export async function verifyBraiinsTemperature(
  hostedMiner: HostedMinerInflated
): Promise<MinerCommandResolution> {
  return new Promise((resolve, reject) => {
    const minerIP = hostedMiner.ipAddress;
    const getTempStatsCommand = `echo '{"command":"temps"}' | nc ${minerIP} 4028 | jq .`;
    exec(getTempStatsCommand, (error: any, stdout: any, stderr: any) => {
      const minerTempStats = JSON.parse(stdout)["TEMPS"];
      const tempMalfunctioningBoards = minerTempStats.filter(
        (tempStats: any) => {
          return !isOutletTempWithinBounds({
            hostedMiner: hostedMiner,
            actualTemperature: tempStats["Board"],
          });
        }
      );
      if (tempMalfunctioningBoards.length > 0) {
        reject({
          minerErrorType: MinerErrorType.TEMPERATURE_ERROR,
          stackTrace: Error(`${MINER_TEMPERATURE_FAILURE_PREFIX}
      Temperatures are concerning and not within the expected bounds: 
        expectedOutletTemp (Board) for miner - ${JSON.stringify(
          hostedMiner.miner.operationDetails.expectedOutletTempRange
        )}
        malfunctioning board temperatures: ${JSON.stringify(
          tempMalfunctioningBoards
        )}. 
        Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`),
        });
      }
      resolve(MINER_TEMPERATURE_HEALTHY_MSG);
    });
  });
}

export async function verifyBraiinsPool(
  params: VerifyOperationsParams
): Promise<MinerCommandResolution> {
  return new Promise((resolve, reject) => {
    const minerIP = params.hostedMiner.ipAddress;
    const getPoolsCommand = `echo '{"command":"pools"}' | nc ${minerIP} 4028 | jq .`;
    exec(getPoolsCommand, (error: any, stdout: any, stderr: any) => {
      if (error) {
        reject({
          minerErrorType: MinerErrorType.POOL_STATUS_ERROR,
          stackTrace: Error(`${POOL_VERIFICATION_FAILURE_PREFIX}
          Failed to verify the mining pool for Braiins.
          
          Error msg: ${error}.`),
        });
      }

      const poolConfiguration = JSON.parse(stdout)["POOLS"][0];
      const currPoolUser = poolConfiguration["User"];
      const currPoolStatus = poolConfiguration["Status"];
      const expectedPoolUser = constructPoolUser(params);
      if (currPoolUser == expectedPoolUser && currPoolStatus == "Alive") {
        resolve(POOL_STATUS_HEALTHY_MSG);
      }

      reject({
        minerErrorType: MinerErrorType.POOL_STATUS_ERROR,
        stackTrace: Error(`${POOL_VERIFICATION_FAILURE_PREFIX} 
        Failed to verify the mining pool for Braiins.
        Expected: ${JSON.stringify({
          username: expectedPoolUser,
          status: "Alive",
        })}.
        Active Config: ${JSON.stringify({
          username: currPoolUser,
          status: currPoolStatus,
        })}.`),
      });
    });
  });
}

export async function switchBraiinsPool(
  params: SwitchPoolParams
): Promise<MinerCommandResolution> {
  return await removePool(params)
    .then(() => verifyNoSetPool(params))
    .then(() => addPool(params))
    .catch((e) => {
      const error = `${POOL_SWITCHING_FAILURE_PREFIX} 
        Failed trying to switch Braiins's Pool: ${JSON.stringify(params)}.
        Error msg: ${e}.`;

      return Promise.reject({
        minerErrorType: MinerErrorType.POOL_SWITCH_ERROR,
        stackTrace: error,
      });
    });
}

async function verifyNoSetPool(
  params: SwitchPoolParams
): Promise<MinerCommandResolution> {
  return new Promise((resolve, reject) => {
    const minerIP = params.hostedMiner.ipAddress;
    const getPoolsCommand = `echo '{"command":"pools"}' | nc ${minerIP} 4028 | jq .`;

    exec(getPoolsCommand, (error: any, stdout: any, stderr: any) => {
      const poolConfiguration = JSON.parse(stdout)["POOLS"];
      if (poolConfiguration.length == 0) {
        resolve("No Pool Is Set");
      }
      reject({
        minerErrorType: MinerErrorType.POOL_STATUS_ERROR,
        stackTrace: `A pool configuration is set: 
      ${JSON.stringify(poolConfiguration)}`,
      });
    });
  });
}

async function removePool(params: SwitchPoolParams) {
  return new Promise((resolve, reject) => {
    const minerIP = params.hostedMiner.ipAddress;
    const removePoolCommand = `echo '{"command":"removepool","parameter":0}' | nc ${minerIP} 4028 | jq .`;

    exec(removePoolCommand, (error: any, stdout: any, stderr: any) => {
      if (stdout) {
        resolve(stdout);
      }
      if (error || stderr) {
        reject({
          minerErrorType: MinerErrorType.POOL_STATUS_ERROR,
          stackTrace: Error(`Failed to remove pool. 
        Error: ${error}.
        Stderr: ${stderr}.`),
        });
      }
    });
  });
}

async function addPool(params: SwitchPoolParams) {
  return new Promise((resolve, reject) => {
    const minerIP = params.hostedMiner.ipAddress;
    const poolUrl = `${params.pool.protocol}://${params.pool.domain}`;
    const poolUsr = constructPoolUser(params);
    const addPoolCommand = `echo '{"command":"addpool","parameter":"${poolUrl},${poolUsr},"}' | nc ${minerIP} 4028 | jq .`;

    exec(addPoolCommand, (error: any, stdout: any, stderr: any) => {
      if (stdout) {
        resolve(stdout);
      }
      if (error || stderr) {
        reject({
          minerErrorType: MinerErrorType.POOL_STATUS_ERROR,
          stackTrace: Error(`Failed to remove pool. 
          Error: ${error}.
          Stderr: ${stderr}.`),
        });
      }
    });
  });
}

export async function rebootBraiinsMiner(params: SwitchPoolParams) {
  const minerIP = params.hostedMiner.ipAddress;
  const restartGraphQLQuery = {
    query:
      "mutation {\n  bosminer {\n    restart {\n      ... on BosminerError {\n        message\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
    variables: {},
  };
  return await axios(`http://${minerIP}/graphql`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: restartGraphQLQuery,
  });
}
