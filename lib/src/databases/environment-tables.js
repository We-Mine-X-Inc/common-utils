"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMiningWorkGraphSchemaName = exports.getPoolGraphSchemaName = exports.getMinerGraphSchemaName = exports.getCustomerGraphSchemaName = exports.getContractGraphSchemaName = void 0;
const wemine_apis_1 = require("wemine-apis");
function getContractGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tablePrefix: "contract",
        env,
        schemaOptions,
    });
}
exports.getContractGraphSchemaName = getContractGraphSchemaName;
function getCustomerGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tablePrefix: "customer",
        env,
        schemaOptions,
    });
}
exports.getCustomerGraphSchemaName = getCustomerGraphSchemaName;
function getMinerGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({ tablePrefix: "miner", env, schemaOptions });
}
exports.getMinerGraphSchemaName = getMinerGraphSchemaName;
function getPoolGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({ tablePrefix: "pool", env, schemaOptions });
}
exports.getPoolGraphSchemaName = getPoolGraphSchemaName;
function getMiningWorkGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tablePrefix: "miningWork",
        env,
        schemaOptions,
    });
}
exports.getMiningWorkGraphSchemaName = getMiningWorkGraphSchemaName;
function getTableGraphSchemaName({ tablePrefix, env, schemaOptions, }) {
    const prefix = (schemaOptions === null || schemaOptions === void 0 ? void 0 : schemaOptions.embeddedInFunction)
        ? tablePrefix.charAt(0).toUpperCase() + tablePrefix.slice(1)
        : tablePrefix;
    const suffix = (schemaOptions === null || schemaOptions === void 0 ? void 0 : schemaOptions.forManyDocuments) ? "s" : "";
    switch (env) {
        case wemine_apis_1.Environment.TEST:
            return `${prefix}Test${suffix}`;
        case wemine_apis_1.Environment.DEV:
            return `${prefix}Dev${suffix}`;
        case wemine_apis_1.Environment.PROD:
            return `${prefix}Prod${suffix}`;
        default:
            return `${prefix}Dev${suffix}`;
    }
}
//# sourceMappingURL=environment-tables.js.map