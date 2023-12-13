"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOutletTempWithinBounds = exports.isInletTempWithinBounds = exports.isFanSpeedWithinBounds = exports.isHashRateWithinBounds = void 0;
const wemine_apis_1 = require("wemine-apis");
function isHashRateWithinBounds(params) {
    var _a;
    const miner = params.hostedMiner.miner;
    (0, wemine_apis_1.assertMiner)(miner);
    const expectedHashRateRange = (_a = miner.metadata) === null || _a === void 0 ? void 0 : _a.expectedHashRateRange;
    return (!!expectedHashRateRange &&
        expectedHashRateRange.minimum <= params.actualHashRate &&
        params.actualHashRate <= expectedHashRateRange.maximum);
}
exports.isHashRateWithinBounds = isHashRateWithinBounds;
function isFanSpeedWithinBounds(params) {
    var _a;
    const miner = params.hostedMiner.miner;
    (0, wemine_apis_1.assertMiner)(miner);
    const expectedFanSpeedRange = (_a = miner.metadata) === null || _a === void 0 ? void 0 : _a.expectedFanSpeedRange;
    return (!!expectedFanSpeedRange &&
        expectedFanSpeedRange.minimum <= params.actualFanSpeed &&
        params.actualFanSpeed <= expectedFanSpeedRange.maximum);
}
exports.isFanSpeedWithinBounds = isFanSpeedWithinBounds;
function isInletTempWithinBounds(params) {
    var _a;
    const miner = params.hostedMiner.miner;
    (0, wemine_apis_1.assertMiner)(miner);
    const expectedInletTempRange = (_a = miner.metadata) === null || _a === void 0 ? void 0 : _a.expectedInletTempRange;
    return (!!expectedInletTempRange &&
        expectedInletTempRange.minimum <= params.actualTemperature &&
        params.actualTemperature <= expectedInletTempRange.maximum);
}
exports.isInletTempWithinBounds = isInletTempWithinBounds;
function isOutletTempWithinBounds(params) {
    var _a;
    const miner = params.hostedMiner.miner;
    (0, wemine_apis_1.assertMiner)(miner);
    const expectedOutletTempRange = (_a = miner.metadata) === null || _a === void 0 ? void 0 : _a.expectedOutletTempRange;
    return (!!expectedOutletTempRange &&
        expectedOutletTempRange.minimum <= params.actualTemperature &&
        params.actualTemperature <= expectedOutletTempRange.maximum);
}
exports.isOutletTempWithinBounds = isOutletTempWithinBounds;
//# sourceMappingURL=common-funcs.js.map