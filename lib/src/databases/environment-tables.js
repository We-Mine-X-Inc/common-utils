"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacilityInfoGraphSchemaName = exports.getMinerErrorGraphSchemaName = exports.getMiningWorkGraphSchemaName = exports.getPoolGraphSchemaName = exports.getHostedMinerGraphSchemaName = exports.getCustomerGraphSchemaName = exports.getHostingContractGraphSchemaName = void 0;
const wemine_apis_1 = require("wemine-apis");
function getHostingContractGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tablePrefix: "hostingcontract",
        env,
        schemaOptions,
    });
}
exports.getHostingContractGraphSchemaName = getHostingContractGraphSchemaName;
function getCustomerGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tablePrefix: "customer",
        env,
        schemaOptions,
    });
}
exports.getCustomerGraphSchemaName = getCustomerGraphSchemaName;
function getHostedMinerGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tablePrefix: "hostedminer",
        env,
        schemaOptions,
    });
}
exports.getHostedMinerGraphSchemaName = getHostedMinerGraphSchemaName;
function getPoolGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({ tablePrefix: "pool", env, schemaOptions });
}
exports.getPoolGraphSchemaName = getPoolGraphSchemaName;
function getMiningWorkGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tablePrefix: "miningwork",
        env,
        schemaOptions,
    });
}
exports.getMiningWorkGraphSchemaName = getMiningWorkGraphSchemaName;
function getMinerErrorGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tablePrefix: "minererror",
        env,
        schemaOptions,
    });
}
exports.getMinerErrorGraphSchemaName = getMinerErrorGraphSchemaName;
function getFacilityInfoGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tablePrefix: "facilityinfo",
        env,
        schemaOptions,
    });
}
exports.getFacilityInfoGraphSchemaName = getFacilityInfoGraphSchemaName;
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