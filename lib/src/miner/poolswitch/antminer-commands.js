"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAntminerTemperature = exports.verifyAntminerFanSpeed = exports.verifyAntminerHashRate = exports.verifyAntminerPool = exports.switchAntminerPool = exports.rebootAntminerMiner = void 0;
const tslib_1 = require("tslib");
const axios_digest_auth_1 = tslib_1.__importDefault(require("@mhoc/axios-digest-auth"));
// import { format as prettyFormat } from "pretty-format";
const wemine_apis_1 = require("wemine-apis");
const common_funcs_1 = require("./common-funcs");
const constants_1 = require("./constants");
const pool_user_1 = require("../pool-user");
const ANTMINER_DEFAULTS = {
    MINER_USERNAME: "root",
    MINER_PWD: "root",
};
const ANTMINER_DIGESTAUTH = new axios_digest_auth_1.default({
    username: ANTMINER_DEFAULTS.MINER_USERNAME,
    password: ANTMINER_DEFAULTS.MINER_PWD,
});
const EMPTY_POOL_CONFIG = {
    url: "",
    user: "",
    pass: "",
};
function getSytemInfo(ipAddress) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield ANTMINER_DIGESTAUTH.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `http://${ipAddress}/cgi-bin/get_system_info.cgi`,
        }).then((res) => {
            return { macAddress: res.data["macaddr"] };
        });
    });
}
function verifyMinerIsForClient(params) {
    return (validationInfo) => {
        if (validationInfo.macAddress != params.hostedMiner.macAddress) {
            throw Error("Miner mismatch. The MAC does not match the expected IP.");
        }
        return params;
    };
}
function getMinerConfig(params) {
    return () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield ANTMINER_DIGESTAUTH.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `http://${params.hostedMiner.ipAddress}/cgi-bin/stats.cgi`,
        }).then((res) => {
            const minerConfig = res.data;
            const pools = minerConfig["pools"];
            return {
                "bitmain-fan-ctrl": minerConfig["bitmain-fan-ctrl"],
                "bitmain-fan-pwm": minerConfig["bitmain-fan-pwm"],
                "freq-level": minerConfig["bitmain-freq-level"],
                "miner-mode": parseInt(minerConfig["bitmain-work-mode"]),
                pools: pools,
            };
        });
    });
}
function updateMinerConfig(switchPoolParams) {
    return (poolConfig) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const data = buildNewMinerConfig(switchPoolParams, poolConfig);
        return yield ANTMINER_DIGESTAUTH.request({
            headers: { Accept: "application/json" },
            method: "POST",
            url: `http://${switchPoolParams.hostedMiner.ipAddress}/cgi-bin/set_miner_conf.cgi`,
            data: data,
        });
    });
}
function verifyLivePoolStatus(verifyPoolParams) {
    return () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield ANTMINER_DIGESTAUTH.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `http://${verifyPoolParams.hostedMiner.ipAddress}/cgi-bin/pools.cgi`,
        }).then((resp) => {
            const currentPoolInfo = resp.data["POOLS"][0];
            const expectedUrl = constructPoolUrl(verifyPoolParams.pool);
            const expectedUser = (0, pool_user_1.constructPoolUser)(verifyPoolParams);
            if (!(currentPoolInfo.url == expectedUrl &&
                currentPoolInfo.user == expectedUser &&
                currentPoolInfo.status == "Alive" &&
                currentPoolInfo.priority == 0)) {
                throw Error(`Bitmain miner pool does not match expectations.
          Actual v. Expected:
            ${currentPoolInfo.url} - ${expectedUrl}
            ${currentPoolInfo.user} - ${expectedUser}
            ${currentPoolInfo.status} - Alive
            ${currentPoolInfo.priority} - 0
          Please check miner:
            ${verifyPoolParams.hostedMiner.ipAddress}
            ${verifyPoolParams.hostedMiner.friendlyMinerId} `);
            }
        });
    });
}
function rebootAntminerMiner(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield ANTMINER_DIGESTAUTH.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `http://${params.hostedMiner.ipAddress}/cgi-bin/reboot.cgi`,
        });
    });
}
exports.rebootAntminerMiner = rebootAntminerMiner;
function buildNewMinerConfig(switchPoolInfo, poolConfig) {
    const newPoolConfig = Object.assign({}, poolConfig);
    newPoolConfig.pools = [
        {
            url: constructPoolUrl(switchPoolInfo.pool),
            user: (0, pool_user_1.constructPoolUser)(switchPoolInfo),
            pass: "",
        },
        EMPTY_POOL_CONFIG,
        EMPTY_POOL_CONFIG,
    ];
    return newPoolConfig;
}
function constructPoolUrl(pool) {
    return `${pool.protocol}://${pool.domain}`;
}
function switchAntminerPool(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield getSytemInfo(params.hostedMiner.ipAddress)
            .then(verifyMinerIsForClient(params))
            .then(getMinerConfig(params))
            .then(updateMinerConfig(params))
            .catch((e) => {
            const error = `${constants_1.POOL_SWITCHING_FAILURE_PREFIX}
        Failed trying to switch Antminer's Pool: ${JSON.stringify(params)}.
        Error msg: ${e}.`;
            return Promise.reject({
                minerErrorType: wemine_apis_1.MinerErrorType.POOL_SWITCH_ERROR,
                stackTrace: error,
            });
        });
    });
}
exports.switchAntminerPool = switchAntminerPool;
function verifyAntminerPool(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield getSytemInfo(params.hostedMiner.ipAddress)
            .then(verifyMinerIsForClient(params))
            .then(getMinerConfig(params))
            .then(verifyLivePoolStatus(params))
            .then(() => constants_1.POOL_STATUS_HEALTHY_MSG)
            .catch((e) => {
            const error = `${constants_1.POOL_VERIFICATION_FAILURE_PREFIX} 
        Failed to verify the mining pool for an Antminer: ${JSON.stringify(params)}.
        Error msg: ${e}.`;
            return Promise.reject({
                minerErrorType: wemine_apis_1.MinerErrorType.POOL_STATUS_ERROR,
                stackTrace: error,
            });
        });
    });
}
exports.verifyAntminerPool = verifyAntminerPool;
function verifyAntminerHashRate(hostedMiner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield ANTMINER_DIGESTAUTH.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `http://${hostedMiner.ipAddress}/cgi-bin/stats.cgi`,
        }).then((res) => {
            const minerStats = res.data["STATS"][0];
            if (!((0, common_funcs_1.isHashRateWithinBounds)({
                hostedMiner: hostedMiner,
                actualHashRate: minerStats["rate_5s"],
            }) &&
                (0, common_funcs_1.isHashRateWithinBounds)({
                    hostedMiner: hostedMiner,
                    actualHashRate: minerStats["rate_30m"],
                }) &&
                (0, common_funcs_1.isHashRateWithinBounds)({
                    hostedMiner: hostedMiner,
                    actualHashRate: minerStats["rate_avg"],
                }))) {
                return Promise.reject({
                    minerErrorType: wemine_apis_1.MinerErrorType.HASH_RATE_ERROR,
                    stackTrace: Error(`${constants_1.MINER_HASHRATE_FAILURE_PREFIX}
      HashRate not within the expected bounds: 
        expectedHashRate for miner - ${JSON.stringify(hostedMiner.miner.operationDetails.expectedHashRateRange)}
        rate_5s actualHashRate - ${minerStats["rate_5s"]}
        rate_30m actualHashRate - ${minerStats["rate_30m"]}
        rate_avg actualHashRate - ${minerStats["rate_avg"]}.
        Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`),
                });
            }
            return constants_1.MINER_HASHRATE_HEALTHY_MSG;
        });
    });
}
exports.verifyAntminerHashRate = verifyAntminerHashRate;
function verifyAntminerFanSpeed(hostedMiner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield ANTMINER_DIGESTAUTH.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `http://${hostedMiner.ipAddress}/cgi-bin/stats.cgi`,
        }).then((res) => {
            const minerFanSpeeds = res.data["STATS"][0];
            const malfunctioningFans = minerFanSpeeds.fan.filter((fanSpeed) => {
                return (0, common_funcs_1.isFanSpeedWithinBounds)({
                    hostedMiner: hostedMiner,
                    actualFanSpeed: fanSpeed,
                });
            });
            if (malfunctioningFans.length > 0) {
                return Promise.reject({
                    minerErrorType: wemine_apis_1.MinerErrorType.FAN_SPEED_ERROR,
                    stackTrace: Error(`${constants_1.MINER_FAN_SPEED_FAILURE_PREFIX}
      Fan speeds are concerning and not within the expected bounds: 
        expectedFansSpeeds for miner - ${JSON.stringify(hostedMiner.miner.operationDetails.expectedFanSpeedRange)}
        malfunctioning fan speeds: ${malfunctioningFans}. 
        Please check miner: ${JSON.stringify(hostedMiner.ipAddress)}`),
                });
            }
            return constants_1.MINER_FAN_SPEED_HEALTHY_MSG;
        });
    });
}
exports.verifyAntminerFanSpeed = verifyAntminerFanSpeed;
function verifyAntminerTemperature(hostedMiner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield ANTMINER_DIGESTAUTH.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: `http://${hostedMiner.ipAddress}/cgi-bin/stats.cgi`,
        }).then((res) => {
            const minerChains = res.data["STATS"][0]["chain"];
            const tempMalfunctioningChips = minerChains.filter((chainStats) => {
                const [inlet1, inlet2, outlet1, outlet2] = chainStats.temp_chip;
                return !((0, common_funcs_1.isInletTempWithinBounds)({
                    hostedMiner: hostedMiner,
                    actualTemperature: inlet1,
                }) &&
                    (0, common_funcs_1.isInletTempWithinBounds)({
                        hostedMiner: hostedMiner,
                        actualTemperature: inlet2,
                    }) &&
                    (0, common_funcs_1.isOutletTempWithinBounds)({
                        hostedMiner: hostedMiner,
                        actualTemperature: outlet1,
                    }) &&
                    (0, common_funcs_1.isOutletTempWithinBounds)({
                        hostedMiner: hostedMiner,
                        actualTemperature: outlet2,
                    }));
            });
            if (tempMalfunctioningChips.length > 0) {
                return Promise.reject({
                    minerErrorType: wemine_apis_1.MinerErrorType.TEMPERATURE_ERROR,
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
exports.verifyAntminerTemperature = verifyAntminerTemperature;
//# sourceMappingURL=antminer-commands.js.map