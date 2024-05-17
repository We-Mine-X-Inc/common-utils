"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rebootBraiinsMiner = exports.switchBraiinsPool = exports.verifyBraiinsPool = exports.verifyBraiinsTemperature = exports.verifyBraiinsFanSpeed = exports.verifyBraiinsHashRate = exports.isBraiinsReachable = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const wemine_apis_1 = require("wemine-apis");
const common_funcs_1 = require("./common-funcs");
const constants_1 = require("./constants");
const pool_user_1 = require("../pool-user");
const jsconstructs_1 = require("../../jsconstructs");
const { exec } = require("child_process");
const SUMMARY_FIELD = "SUMMARY";
const MEGA_HASH_WITHIN_5_SECS = "MHS 5s";
const MEGA_HASH_WITHIN_15_MINS = "MHS 15m";
const MEGA_HASH_AVG = "MHS av";
function isBraiinsReachable(ipAddress) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const minerIP = ipAddress;
            const getSummaryCommand = `echo '{"command":"summary"}' | nc ${minerIP} 4028 | jq .`;
            exec(getSummaryCommand, (error, stdout, stderr) => {
                const parsedStats = (0, jsconstructs_1.jsonSafeParse)(stdout)[SUMMARY_FIELD];
                if (!parsedStats) {
                    reject({
                        minerErrorType: wemine_apis_1.MinerErrorType.OFFLINE_ERROR,
                        stackTrace: `
          Miner is unreachable.
          Please check miner: ${JSON.stringify(ipAddress)}`,
                    });
                    return;
                }
                resolve(constants_1.MINER_ONLINE_HEALTHY_MSG);
            });
        });
    });
}
exports.isBraiinsReachable = isBraiinsReachable;
function verifyBraiinsHashRate(hostedMiner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const minerIP = hostedMiner.ipAddress;
            const getSummaryCommand = `echo '{"command":"summary"}' | nc ${minerIP} 4028 | jq .`;
            exec(getSummaryCommand, (error, stdout, stderr) => {
                const parsedStats = (0, jsconstructs_1.jsonSafeParse)(stdout)[SUMMARY_FIELD];
                if (!parsedStats) {
                    reject({
                        minerErrorType: wemine_apis_1.MinerErrorType.HASH_RATE_ERROR,
                        stackTrace: `${constants_1.MINER_HASHRATE_FAILURE_PREFIX}
    No miner stats available.
      Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`,
                    });
                    return;
                }
                const minerStats = (0, jsconstructs_1.jsonSafeParse)(stdout)[SUMMARY_FIELD][0];
                const hashRate5Secs = minerStats[MEGA_HASH_WITHIN_5_SECS];
                const hashRate15Mins = minerStats[MEGA_HASH_WITHIN_15_MINS];
                const hashRateAvg = minerStats[MEGA_HASH_AVG];
                if (!((0, common_funcs_1.isHashRateWithinBounds)({
                    hostedMiner: hostedMiner,
                    actualHashRate: hashRate5Secs,
                }) &&
                    (0, common_funcs_1.isHashRateWithinBounds)({
                        hostedMiner: hostedMiner,
                        actualHashRate: hashRate15Mins,
                    }) &&
                    (0, common_funcs_1.isHashRateWithinBounds)({
                        hostedMiner: hostedMiner,
                        actualHashRate: hashRateAvg,
                    }))) {
                    reject({
                        minerErrorType: wemine_apis_1.MinerErrorType.HASH_RATE_ERROR,
                        stackTrace: `${constants_1.MINER_HASHRATE_FAILURE_PREFIX}
          HashRate not within the expected bounds: 
            expectedHashRate for miner - ${JSON.stringify(hostedMiner.miner.operationDetails.expectedHashRateRange)}
            MHS 5s actualHashRate - ${hashRate5Secs}
            MHS 15m actualHashRate - ${hashRate15Mins}
            MHS avg actualHashRate - ${hashRateAvg}.
            Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`,
                    });
                    return;
                }
                resolve(constants_1.MINER_HASHRATE_HEALTHY_MSG);
            });
        });
    });
}
exports.verifyBraiinsHashRate = verifyBraiinsHashRate;
function verifyBraiinsFanSpeed(hostedMiner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const minerIP = hostedMiner.ipAddress;
            const getFanStatsCommand = `echo '{"command":"fans"}' | nc ${minerIP} 4028 | jq .`;
            exec(getFanStatsCommand, (error, stdout, stderr) => {
                const minerFanStats = (0, jsconstructs_1.jsonSafeParse)(stdout)["FANS"] || [];
                const malfunctioningFans = minerFanStats.filter((fanStats) => {
                    return !(0, common_funcs_1.isFanSpeedWithinBounds)({
                        hostedMiner: hostedMiner,
                        actualFanSpeed: parseInt(fanStats["RPM"]),
                    });
                });
                if (malfunctioningFans.length > 0) {
                    reject({
                        minerErrorType: wemine_apis_1.MinerErrorType.FAN_SPEED_ERROR,
                        stackTrace: `${constants_1.MINER_FAN_SPEED_FAILURE_PREFIX}
      Fan speeds are concerning and not within the expected bounds: 
        expectedFansSpeeds for miner - ${JSON.stringify(hostedMiner.miner.operationDetails.expectedFanSpeedRange)}
        malfunctioning fan speeds: ${malfunctioningFans}. If empty, then no stats were available.
        Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`,
                    });
                    return;
                }
                resolve(constants_1.MINER_FAN_SPEED_HEALTHY_MSG);
            });
        });
    });
}
exports.verifyBraiinsFanSpeed = verifyBraiinsFanSpeed;
function verifyBraiinsTemperature(hostedMiner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const minerIP = hostedMiner.ipAddress;
            const getTempStatsCommand = `echo '{"command":"temps"}' | nc ${minerIP} 4028 | jq .`;
            exec(getTempStatsCommand, (error, stdout, stderr) => {
                const minerTempStats = (0, jsconstructs_1.jsonSafeParse)(stdout)["TEMPS"] || [];
                const tempMalfunctioningBoards = minerTempStats.filter((tempStats) => {
                    return !(0, common_funcs_1.isOutletTempWithinBounds)({
                        hostedMiner: hostedMiner,
                        actualTemperature: tempStats["Board"],
                    });
                });
                if (tempMalfunctioningBoards.length > 0) {
                    reject({
                        minerErrorType: wemine_apis_1.MinerErrorType.TEMPERATURE_ERROR,
                        stackTrace: `${constants_1.MINER_TEMPERATURE_FAILURE_PREFIX}
      Temperatures are concerning and not within the expected bounds: 
        expectedOutletTemp (Board) for miner - ${JSON.stringify(hostedMiner.miner.operationDetails.expectedOutletTempRange)}
        malfunctioning board temperatures: ${JSON.stringify(tempMalfunctioningBoards)}. If empty, then no stats were available.
        Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`,
                    });
                    return;
                }
                resolve(constants_1.MINER_TEMPERATURE_HEALTHY_MSG);
            });
        });
    });
}
exports.verifyBraiinsTemperature = verifyBraiinsTemperature;
function verifyBraiinsPool(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const minerIP = params.hostedMiner.ipAddress;
            const getPoolsCommand = `echo '{"command":"pools"}' | nc ${minerIP} 4028 | jq .`;
            exec(getPoolsCommand, (error, stdout, stderr) => {
                if (error) {
                    reject({
                        minerErrorType: wemine_apis_1.MinerErrorType.POOL_STATUS_ERROR,
                        stackTrace: `${constants_1.POOL_VERIFICATION_FAILURE_PREFIX}
          Failed to verify the mining pool for Braiins.
          
          Error msg: ${error}.`,
                    });
                    return;
                }
                const poolConfigurations = (0, jsconstructs_1.jsonSafeParse)(stdout)["POOLS"];
                if (!poolConfigurations) {
                    reject({
                        minerErrorType: wemine_apis_1.MinerErrorType.POOL_STATUS_ERROR,
                        stackTrace: `${constants_1.POOL_VERIFICATION_FAILURE_PREFIX}
          Failed to verify the mining pool for Braiins.
          Pool configurations were unsuccessfully fetched.`,
                    });
                    return;
                }
                const poolConfiguration = poolConfigurations[0];
                const currPoolUser = poolConfiguration["User"];
                const currPoolStatus = poolConfiguration["Status"];
                const expectedPoolUser = (0, pool_user_1.constructPoolUser)(params);
                if (currPoolUser == expectedPoolUser && currPoolStatus == "Alive") {
                    resolve(constants_1.POOL_STATUS_HEALTHY_MSG);
                    return;
                }
                reject({
                    minerErrorType: wemine_apis_1.MinerErrorType.POOL_STATUS_ERROR,
                    stackTrace: `${constants_1.POOL_VERIFICATION_FAILURE_PREFIX} 
        Failed to verify the mining pool for Braiins.
        Expected: ${JSON.stringify({
                        username: expectedPoolUser,
                        status: "Alive",
                    })}.
        Active Config: ${JSON.stringify({
                        username: currPoolUser,
                        status: currPoolStatus,
                    })}.`,
                });
            });
        });
    });
}
exports.verifyBraiinsPool = verifyBraiinsPool;
function switchBraiinsPool(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield removePool(params)
            .then(() => verifyNoSetPool(params))
            .then(() => addPool(params))
            .catch((e) => {
            const error = `${constants_1.POOL_SWITCHING_FAILURE_PREFIX} 
        Failed trying to switch Braiins's Pool: ${JSON.stringify(params)}.
        Error msg: ${e}.`;
            return Promise.reject({
                minerErrorType: wemine_apis_1.MinerErrorType.POOL_SWITCH_ERROR,
                stackTrace: error,
            });
        });
    });
}
exports.switchBraiinsPool = switchBraiinsPool;
function verifyNoSetPool(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const minerIP = params.hostedMiner.ipAddress;
            const getPoolsCommand = `echo '{"command":"pools"}' | nc ${minerIP} 4028 | jq .`;
            exec(getPoolsCommand, (error, stdout, stderr) => {
                const poolConfiguration = (0, jsconstructs_1.jsonSafeParse)(stdout)["POOLS"] || [];
                if (poolConfiguration.length == 0) {
                    resolve("No Pool Is Set");
                    return;
                }
                reject({
                    minerErrorType: wemine_apis_1.MinerErrorType.POOL_STATUS_ERROR,
                    stackTrace: `A pool configuration is set: 
      ${JSON.stringify(poolConfiguration)}`,
                });
            });
        });
    });
}
function removePool(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const minerIP = params.hostedMiner.ipAddress;
            const removePoolCommand = `echo '{"command":"removepool","parameter":0}' | nc ${minerIP} 4028 | jq .`;
            exec(removePoolCommand, (error, stdout, stderr) => {
                if (stdout) {
                    resolve(stdout);
                }
                if (error || stderr) {
                    reject({
                        minerErrorType: wemine_apis_1.MinerErrorType.POOL_STATUS_ERROR,
                        stackTrace: `Failed to remove pool. 
            Error: ${error}.
            Stderr: ${stderr}.`,
                    });
                }
            });
        });
    });
}
function addPool(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const minerIP = params.hostedMiner.ipAddress;
            const poolUrl = `${params.pool.protocol}://${params.pool.domain}`;
            const poolUsr = (0, pool_user_1.constructPoolUser)(params);
            const addPoolCommand = `echo '{"command":"addpool","parameter":"${poolUrl},${poolUsr},"}' | nc ${minerIP} 4028 | jq .`;
            exec(addPoolCommand, (error, stdout, stderr) => {
                if (stdout) {
                    resolve(stdout);
                }
                if (error || stderr) {
                    reject({
                        minerErrorType: wemine_apis_1.MinerErrorType.POOL_STATUS_ERROR,
                        stackTrace: `Failed to remove pool. 
            Error: ${error}.
            Stderr: ${stderr}.`,
                    });
                }
            });
        });
    });
}
function rebootBraiinsMiner(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const minerIP = params.hostedMiner.ipAddress;
        const restartGraphQLQuery = {
            query: "mutation {\n  bosminer {\n    restart {\n      ... on BosminerError {\n        message\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
            variables: {},
        };
        return yield (0, axios_1.default)(`http://${minerIP}/graphql`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: restartGraphQLQuery,
        });
    });
}
exports.rebootBraiinsMiner = rebootBraiinsMiner;
//# sourceMappingURL=braiins-commands.js.map