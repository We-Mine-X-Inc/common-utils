"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPERATURE_VERIFICATION_FUNCTION = exports.FAN_SPEED_VERIFICATION_FUNCTION = exports.HASHRATE_VERIFICATION_FUNCTION = exports.REBOOT_MINER_FUNCTION = exports.POOL_VERIFICATION_FUNCTION = exports.POOL_SWITCH_FUNCTION = void 0;
const tslib_1 = require("tslib");
const wemine_apis_1 = require("wemine-apis");
const antminer_commands_1 = require("./antminer-commands");
const goldshell_commands_1 = require("./goldshell-commands");
const pretty_format_1 = require("pretty-format");
const braiins_commands_1 = require("./braiins-commands");
exports.POOL_SWITCH_FUNCTION = {
    [wemine_apis_1.MinerApiType.UNKNOWN]: switchUnknownPool,
    [wemine_apis_1.MinerApiType.ANTMINER]: antminer_commands_1.switchAntminerPool,
    [wemine_apis_1.MinerApiType.BRAIINS]: braiins_commands_1.switchBraiinsPool,
    [wemine_apis_1.MinerApiType.GOLDSHELL]: goldshell_commands_1.switchGoldshellPool,
};
exports.POOL_VERIFICATION_FUNCTION = {
    [wemine_apis_1.MinerApiType.UNKNOWN]: verifyUnknownApiPool,
    [wemine_apis_1.MinerApiType.ANTMINER]: antminer_commands_1.verifyAntminerPool,
    [wemine_apis_1.MinerApiType.BRAIINS]: braiins_commands_1.verifyBraiinsPool,
    [wemine_apis_1.MinerApiType.GOLDSHELL]: goldshell_commands_1.verifyGoldshellPool,
};
exports.REBOOT_MINER_FUNCTION = {
    [wemine_apis_1.MinerApiType.UNKNOWN]: rebootUnknownMiner,
    [wemine_apis_1.MinerApiType.ANTMINER]: antminer_commands_1.rebootAntminerMiner,
    [wemine_apis_1.MinerApiType.BRAIINS]: braiins_commands_1.rebootBraiinsMiner,
    [wemine_apis_1.MinerApiType.GOLDSHELL]: goldshell_commands_1.rebootGoldshellMiner,
};
exports.HASHRATE_VERIFICATION_FUNCTION = {
    [wemine_apis_1.MinerApiType.UNKNOWN]: verifyUnknownMinerHashRate,
    [wemine_apis_1.MinerApiType.ANTMINER]: antminer_commands_1.verifyAntminerHashRate,
    [wemine_apis_1.MinerApiType.BRAIINS]: braiins_commands_1.verifyBraiinsHashRate,
    [wemine_apis_1.MinerApiType.GOLDSHELL]: goldshell_commands_1.verifyGoldshellHashRate,
};
exports.FAN_SPEED_VERIFICATION_FUNCTION = {
    [wemine_apis_1.MinerApiType.UNKNOWN]: verifyUnknownMinerFanSpeed,
    [wemine_apis_1.MinerApiType.ANTMINER]: antminer_commands_1.verifyAntminerFanSpeed,
    [wemine_apis_1.MinerApiType.BRAIINS]: braiins_commands_1.verifyBraiinsFanSpeed,
    [wemine_apis_1.MinerApiType.GOLDSHELL]: goldshell_commands_1.verifyGoldshellFanSpeed,
};
exports.TEMPERATURE_VERIFICATION_FUNCTION = {
    [wemine_apis_1.MinerApiType.UNKNOWN]: verifyUnknownMinerTemperature,
    [wemine_apis_1.MinerApiType.ANTMINER]: antminer_commands_1.verifyAntminerTemperature,
    [wemine_apis_1.MinerApiType.BRAIINS]: braiins_commands_1.verifyBraiinsTemperature,
    [wemine_apis_1.MinerApiType.GOLDSHELL]: goldshell_commands_1.verifyGoldshellTemperature,
};
function switchUnknownPool(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw Error(`Invalid Miner API supplied. Params: ${(0, pretty_format_1.format)(params)}`);
    });
}
function verifyUnknownApiPool(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw Error(`Invalid Miner API supplied. Params: ${(0, pretty_format_1.format)(params)}`);
    });
}
function rebootUnknownMiner(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw Error(`Invalid Miner API supplied. Params: ${(0, pretty_format_1.format)(params)}`);
    });
}
function verifyUnknownMinerHashRate(miner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw Error(`Invalid Miner API supplied. Params: ${(0, pretty_format_1.format)(miner)}`);
    });
}
function verifyUnknownMinerFanSpeed(miner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw Error(`Invalid Miner API supplied. Params: ${(0, pretty_format_1.format)(miner)}`);
    });
}
function verifyUnknownMinerTemperature(miner) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        throw Error(`Invalid Miner API supplied. Params: ${(0, pretty_format_1.format)(miner)}`);
    });
}
//# sourceMappingURL=maps-of-miner-commands.js.map