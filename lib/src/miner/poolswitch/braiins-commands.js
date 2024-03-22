"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rebootBraiinsMiner = exports.switchBraiinsPool = exports.verifyBraiinsPool = exports.verifyBraiinsTemperature = exports.verifyBraiinsFanSpeed = exports.verifyBraiinsHashRate = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const wemine_apis_1 = require("wemine-apis");
const common_funcs_1 = require("./common-funcs");
const constants_1 = require("./constants");
const pool_user_1 = require("../pool-user");
const { exec } = require("child_process");
function verifyBraiinsHashRate(hostedMiner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const minerIP = hostedMiner.ipAddress;
            const getSummaryCommand = `echo '{"command":"summary"}' | nc ${minerIP} 4028 | jq .`;
            exec(getSummaryCommand, (error, stdout, stderr) => {
                const minerStats = JSON.parse(stdout);
                const hashRate5Secs = minerStats["MHS 5s"];
                const hashRate15Mins = minerStats["MHS 15m"];
                const hashRateAvg = minerStats["MHS avg"];
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
                        stackTrace: Error(`${constants_1.MINER_HASHRATE_FAILURE_PREFIX}
          HashRate not within the expected bounds: 
            expectedHashRate for miner - ${JSON.stringify(hostedMiner.miner.operationDetails.expectedHashRateRange)}
            MHS 5s actualHashRate - ${hashRate5Secs}
            MHS 15m actualHashRate - ${hashRate15Mins}
            MHS avg actualHashRate - ${hashRateAvg}.
            Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`),
                    });
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
                const minerFanStats = JSON.parse(stdout)["FANS"];
                const malfunctioningFans = minerFanStats.filter((fanStats) => {
                    return !(0, common_funcs_1.isFanSpeedWithinBounds)({
                        hostedMiner: hostedMiner,
                        actualFanSpeed: parseInt(fanStats["RPM"]),
                    });
                });
                if (malfunctioningFans.length > 0) {
                    reject({
                        minerErrorType: wemine_apis_1.MinerErrorType.FAN_SPEED_ERROR,
                        stackTrace: Error(`${constants_1.MINER_FAN_SPEED_FAILURE_PREFIX}
      Fan speeds are concerning and not within the expected bounds: 
        expectedFansSpeeds for miner - ${JSON.stringify(hostedMiner.miner.operationDetails.expectedFanSpeedRange)}
        malfunctioning fan speeds: ${malfunctioningFans}. 
        Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`),
                    });
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
                const minerTempStats = JSON.parse(stdout)["TEMPS"];
                const tempMalfunctioningChips = minerTempStats.filter((tempStats) => {
                    return (0, common_funcs_1.isOutletTempWithinBounds)({
                        hostedMiner: hostedMiner,
                        actualTemperature: tempStats["Chip"],
                    });
                });
                if (tempMalfunctioningChips.length > 0) {
                    reject({
                        minerErrorType: wemine_apis_1.MinerErrorType.TEMPERATURE_ERROR,
                        stackTrace: Error(`${constants_1.MINER_TEMPERATURE_FAILURE_PREFIX}
      Temperatures are concerning and not within the expected bounds: 
        expectedInletTemp for miner - ${JSON.stringify(hostedMiner.miner.operationDetails.expectedInletTempRange)}
        expectedOutletTemp for miner - ${JSON.stringify(hostedMiner.miner.operationDetails.expectedOutletTempRange)}
        malfunctioning chip temperatures: ${JSON.stringify(tempMalfunctioningChips)}. 
        Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`),
                    });
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
                        stackTrace: Error(`${constants_1.POOL_VERIFICATION_FAILURE_PREFIX}
          Failed to verify the mining pool for Braiins.
          
          Error msg: ${error}.`),
                    });
                }
                const poolConfiguration = JSON.parse(stdout)["POOLS"][0];
                const currPoolUser = poolConfiguration["User"];
                const currPoolStatus = poolConfiguration["Status"];
                if (currPoolUser == params.pool.username && currPoolStatus == "Alive") {
                    resolve(constants_1.POOL_STATUS_HEALTHY_MSG);
                }
                reject({
                    minerErrorType: wemine_apis_1.MinerErrorType.POOL_STATUS_ERROR,
                    stackTrace: Error(`${constants_1.POOL_VERIFICATION_FAILURE_PREFIX} 
        Failed to verify the mining pool for Braiins.
        Expected: ${JSON.stringify({
                        username: params.pool.username,
                        status: "Alive",
                    })}.
        Active Config: ${JSON.stringify({
                        username: currPoolUser,
                        status: currPoolStatus,
                    })}.`),
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
                const poolConfiguration = JSON.parse(stdout)["POOLS"];
                if (poolConfiguration.length == 0) {
                    resolve("No Pool Is Set");
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
                        stackTrace: Error(`Failed to remove pool. 
        Error: ${error}.
        Stderr: ${stderr}.`),
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
                        stackTrace: Error(`Failed to remove pool. 
          Error: ${error}.
          Stderr: ${stderr}.`),
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