"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOutletTempWithinBounds = exports.isInletTempWithinBounds = exports.isFanSpeedWithinBounds = exports.isHashRateWithinBounds = exports.isReachable = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const wemine_apis_1 = require("wemine-apis");
function isReachable(hostedMiner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield (0, axios_1.default)(`http://${hostedMiner.ipAddress}`, {
            method: "get",
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                Accept: "text/html; charset=utf-8; application/json",
            },
        });
    });
}
exports.isReachable = isReachable;
function isHashRateWithinBounds(params) {
    const miner = params.hostedMiner.miner;
    (0, wemine_apis_1.assertMiner)(miner);
    const expectedHashRateRange = miner.operationDetails.expectedHashRateRange;
    return (!!expectedHashRateRange &&
        expectedHashRateRange.minimum <= params.actualHashRate &&
        params.actualHashRate <= expectedHashRateRange.maximum);
}
exports.isHashRateWithinBounds = isHashRateWithinBounds;
function isFanSpeedWithinBounds(params) {
    const miner = params.hostedMiner.miner;
    (0, wemine_apis_1.assertMiner)(miner);
    const expectedFanSpeedRange = miner.operationDetails.expectedFanSpeedRange;
    return (!!expectedFanSpeedRange &&
        expectedFanSpeedRange.minimum <= params.actualFanSpeed &&
        params.actualFanSpeed <= expectedFanSpeedRange.maximum);
}
exports.isFanSpeedWithinBounds = isFanSpeedWithinBounds;
function isInletTempWithinBounds(params) {
    const miner = params.hostedMiner.miner;
    (0, wemine_apis_1.assertMiner)(miner);
    const expectedInletTempRange = miner.operationDetails.expectedInletTempRange;
    return (!!expectedInletTempRange &&
        expectedInletTempRange.minimum <= params.actualTemperature &&
        params.actualTemperature <= expectedInletTempRange.maximum);
}
exports.isInletTempWithinBounds = isInletTempWithinBounds;
function isOutletTempWithinBounds(params) {
    const miner = params.hostedMiner.miner;
    (0, wemine_apis_1.assertMiner)(miner);
    const expectedOutletTempRange = miner.operationDetails.expectedOutletTempRange;
    return (!!expectedOutletTempRange &&
        expectedOutletTempRange.minimum <= params.actualTemperature &&
        params.actualTemperature <= expectedOutletTempRange.maximum);
}
exports.isOutletTempWithinBounds = isOutletTempWithinBounds;
//# sourceMappingURL=common-funcs.js.map