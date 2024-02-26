"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoldshellTemperature = exports.verifyGoldshellFanSpeed = exports.verifyGoldshellHashRate = exports.verifyGoldshellPool = exports.switchGoldshellPool = exports.rebootGoldshellMiner = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const wemine_apis_1 = require("wemine-apis");
const common_funcs_1 = require("./common-funcs");
const wemine_apis_2 = require("wemine-apis");
const constants_1 = require("./constants");
const pool_user_1 = require("../pool-user");
const NUMBERS_ONLY_REGEX = /\d+/g;
const GOLDSHELL_DEFAULTS = {
    POOL_PWD: "123",
    MINER_USERNAME: "admin",
    MINER_PWD: "123456789",
};
function loginToMiner(ipAddress) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield (0, axios_1.default)({
            method: "get",
            url: `http://${ipAddress}/user/login?username=${GOLDSHELL_DEFAULTS.MINER_USERNAME}&password=${GOLDSHELL_DEFAULTS.MINER_PWD}`,
        }).then((res) => {
            return { ipAddress: ipAddress, authToken: res.data["JWT Token"] };
        });
    });
}
function getSettings(sessionInfo) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield (0, axios_1.default)({
            method: "get",
            url: `http://${sessionInfo.ipAddress}/mcb/setting`,
            headers: getRequestHeaders(sessionInfo.authToken),
        }).then((res) => {
            return {
                sessionInfo: sessionInfo,
                macAddress: res.data.name,
            };
        });
    });
}
function verifyMinerIsForClient(params) {
    return (validationInfo) => {
        if (validationInfo.macAddress != params.hostedMiner.macAddress) {
            throw Error("Miner mismatch. The MAC does not match the expected IP.");
        }
        return validationInfo.sessionInfo;
    };
}
function getPools(sessionInfo) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield (0, axios_1.default)({
            method: "get",
            url: `http://${sessionInfo.ipAddress}/mcb/pools`,
            headers: getRequestHeaders(sessionInfo.authToken),
        }).then((res) => {
            return {
                sessionInfo: sessionInfo,
                pools: res.data,
            };
        });
    });
}
function deletePools(poolSwitchInfo) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const sessionInfo = poolSwitchInfo.sessionInfo;
        if (poolSwitchInfo.pools.length <= 0) {
            return new Promise((resolve) => {
                resolve(sessionInfo);
            });
        }
        return Promise.all(poolSwitchInfo.pools.map((pool) => {
            return (0, axios_1.default)({
                method: "put",
                url: `http://${sessionInfo.ipAddress}/mcb/delpool`,
                headers: getRequestHeaders(sessionInfo.authToken),
                data: pool,
            });
        })).then(() => {
            return sessionInfo;
        });
    });
}
function addPool(switchPoolParams) {
    return (sessionInfo) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield (0, axios_1.default)({
            method: "put",
            url: `http://${sessionInfo.ipAddress}/mcb/newpool`,
            headers: getRequestHeaders(sessionInfo.authToken),
            data: buildNewPool(switchPoolParams),
        }).then(() => {
            return sessionInfo;
        });
    });
}
function rebootGoldshellMiner(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const sessionInfo = yield loginToMiner(params.hostedMiner.ipAddress);
        return yield (0, axios_1.default)({
            method: "get",
            url: `http://${sessionInfo.ipAddress}/mcb/restart`,
            headers: getRequestHeaders(sessionInfo.authToken),
        });
    });
}
exports.rebootGoldshellMiner = rebootGoldshellMiner;
function buildNewPool(switchPoolParams) {
    return {
        legal: true,
        url: constructPoolUrl(switchPoolParams.pool),
        user: (0, pool_user_1.constructPoolUser)(switchPoolParams),
        pass: GOLDSHELL_DEFAULTS.POOL_PWD,
        dragid: 0,
        active: false,
        "pool-priority": 0,
    };
}
function constructPoolUrl(pool) {
    return `${pool.protocol}://${pool.domain}`;
}
function switchGoldshellPool(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield loginToMiner(params.hostedMiner.ipAddress)
            .then(getSettings)
            .then(verifyMinerIsForClient(params))
            .then(getPools)
            .then(deletePools)
            .then(addPool(params))
            .catch((e) => {
            const error = `${constants_1.POOL_SWITCHING_FAILURE_PREFIX} 
        Failed trying to switch Goldshell's Pool: ${JSON.stringify(params)}.
        Error msg: ${e}.`;
            return Promise.reject({
                minerErrorType: wemine_apis_1.MinerErrorType.POOL_SWITCH_ERROR,
                stackTrace: error,
            });
        });
    });
}
exports.switchGoldshellPool = switchGoldshellPool;
function verifyGoldshellPool(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield loginToMiner(params.hostedMiner.ipAddress)
            .then(getSettings)
            .then(verifyMinerIsForClient(params))
            .then(verifyLivePoolStatus(params))
            .then(() => verifyGoldshellHashRate(params.hostedMiner))
            .catch((e) => {
            const error = `${constants_1.POOL_VERIFICATION_FAILURE_PREFIX} 
        Failed to verify the mining pool for an Goldshell: ${JSON.stringify(params)}.
        Error msg: ${e}.`;
            return Promise.reject({
                minerErrorType: wemine_apis_1.MinerErrorType.POOL_STATUS_ERROR,
                stackTrace: error,
            });
        });
    });
}
exports.verifyGoldshellPool = verifyGoldshellPool;
function verifyLivePoolStatus(verifyPoolParams) {
    return (sessionInfo) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield (0, axios_1.default)({
            method: "get",
            url: `http://${sessionInfo.ipAddress}/mcb/pools`,
            headers: getRequestHeaders(sessionInfo.authToken),
        }).then((res) => {
            const currentPoolInfo = res.data[0];
            if (!(currentPoolInfo.url == constructPoolUrl(verifyPoolParams.pool) &&
                currentPoolInfo.user == (0, pool_user_1.constructPoolUser)(verifyPoolParams) &&
                currentPoolInfo.active &&
                currentPoolInfo["pool-priority"] == 0)) {
                return Promise.reject({
                    minerErrorType: wemine_apis_1.MinerErrorType.POOL_STATUS_ERROR,
                    stackTrace: Error(`Goldshell miner pool update has not taken effect.
        Please check miner: ${JSON.stringify(verifyPoolParams)}`),
                });
            }
            return constants_1.POOL_STATUS_HEALTHY_MSG;
        });
    });
}
function verifyGoldshellHashRate(hostedMiner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { ipAddress, authToken } = yield loginToMiner(hostedMiner.ipAddress);
        return yield (0, axios_1.default)({
            method: "get",
            url: `http://${ipAddress}/mcb/cgminer?cgminercmd=devs`,
            headers: getRequestHeaders(authToken),
        }).then((res) => {
            const chipStats = res.data["data"];
            const chipHashRates = chipStats.map((chipStat) => chipStat["hashrate"]);
            const actualHashRate = chipHashRates.reduce((partialSum, a) => partialSum + a, 0);
            if (!(0, common_funcs_1.isHashRateWithinBounds)({
                hostedMiner: hostedMiner,
                actualHashRate,
            })) {
                const miner = hostedMiner.miner;
                (0, wemine_apis_2.assertMiner)(miner);
                const expectedHashRateRange = miner.operationDetails.expectedHashRateRange;
                return Promise.reject({
                    minerErrorType: wemine_apis_1.MinerErrorType.HASH_RATE_ERROR,
                    stackTrace: Error(`${constants_1.MINER_HASHRATE_FAILURE_PREFIX} 
          HashRate not within the expected bounds: 
            miner --> ${hostedMiner}
            expectedHashRate --> ${expectedHashRateRange}
            actualHashRate -> ${actualHashRate}.
            Please check miner: ${JSON.stringify(ipAddress)}`),
                });
            }
            return constants_1.MINER_HASHRATE_HEALTHY_MSG;
        });
    });
}
exports.verifyGoldshellHashRate = verifyGoldshellHashRate;
function verifyGoldshellFanSpeed(hostedMiner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { ipAddress, authToken } = yield loginToMiner(hostedMiner.ipAddress);
        return yield (0, axios_1.default)({
            method: "get",
            url: `http://${ipAddress}/mcb/cgminer?cgminercmd=devs`,
            headers: getRequestHeaders(authToken),
        }).then((res) => {
            const chipStats = res.data["data"];
            const minerFanSpeeds = chipStats.flatMap((chipStat) => chipStat["fanspeed"].match(NUMBERS_ONLY_REGEX));
            const malfunctioningFans = minerFanSpeeds.filter((fanSpeed) => {
                return !(0, common_funcs_1.isFanSpeedWithinBounds)({
                    hostedMiner: hostedMiner,
                    actualFanSpeed: fanSpeed,
                });
            });
            if (malfunctioningFans.length > 0) {
                return Promise.reject({
                    minerErrorType: wemine_apis_1.MinerErrorType.FAN_SPEED_ERROR,
                    stackTrace: Error(`${constants_1.MINER_FAN_SPEED_FAILURE_PREFIX}
          Fan speeds are concerning and not within the expected bounds: 
            expectedTemperature within miner - ${hostedMiner}
            malfunctioning fan speeds: ${malfunctioningFans}. 
            Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`),
                });
            }
            return constants_1.MINER_FAN_SPEED_HEALTHY_MSG;
        });
    });
}
exports.verifyGoldshellFanSpeed = verifyGoldshellFanSpeed;
function verifyGoldshellTemperature(hostedMiner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { ipAddress, authToken } = yield loginToMiner(hostedMiner.ipAddress);
        return yield (0, axios_1.default)({
            method: "get",
            url: `http://${ipAddress}/mcb/cgminer?cgminercmd=devs`,
            headers: getRequestHeaders(authToken),
        }).then((res) => {
            const chipStats = res.data["data"];
            const chipTemps = chipStats.map((chipStats) => chipStats["temp"].match(NUMBERS_ONLY_REGEX));
            const tempMalfunctioningChips = chipTemps.filter((chipTemp) => {
                return !(0, common_funcs_1.isOutletTempWithinBounds)({
                    hostedMiner: hostedMiner,
                    actualTemperature: chipTemp,
                });
            });
            if (tempMalfunctioningChips.length > 0) {
                return Promise.reject({
                    minerErrorType: wemine_apis_1.MinerErrorType.POOL_STATUS_ERROR,
                    stackTrace: Error(`${constants_1.MINER_TEMPERATURE_FAILURE_PREFIX}
          Temperatures are concerning and not within the expected bounds: 
            expectedTemperature within miner - ${hostedMiner}
            malfunctioning chip temperatures: ${tempMalfunctioningChips}. 
            Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`),
                });
            }
            return constants_1.MINER_TEMPERATURE_HEALTHY_MSG;
        });
    });
}
exports.verifyGoldshellTemperature = verifyGoldshellTemperature;
function getRequestHeaders(authToken) {
    return {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        Connection: "keep-alive",
    };
}
//# sourceMappingURL=goldshell-commands.js.map