"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOutletTempWithinBounds = exports.isInletTempWithinBounds = exports.isFanSpeedWithinBounds = exports.isHashRateWithinBounds = void 0;
const wemine_apis_1 = require("wemine-apis");
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