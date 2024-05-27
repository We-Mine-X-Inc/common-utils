"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacilityMaintenanceJobGraphSchemaName = exports.getFacilityInfoGraphSchemaName = exports.getMinerErrorGraphSchemaName = exports.getMiningWorkGraphSchemaName = exports.getPoolGraphSchemaName = exports.getHostedMinerGraphSchemaName = exports.getDashboardCustomerGraphSchemaName = exports.getCustomerGraphSchemaName = exports.getHostingContractGraphSchemaName = exports.OperationType = void 0;
const wemine_apis_1 = require("wemine-apis");
var OperationType;
(function (OperationType) {
    OperationType[OperationType["UNKNOWN"] = 0] = "UNKNOWN";
    OperationType[OperationType["FETCH"] = 1] = "FETCH";
    OperationType[OperationType["UPDATE"] = 2] = "UPDATE";
    OperationType[OperationType["INSERT"] = 3] = "INSERT";
    OperationType[OperationType["DELETE"] = 4] = "DELETE";
})(OperationType = exports.OperationType || (exports.OperationType = {}));
function getHostingContractGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tableName: "hostingcontract",
        env,
        schemaOptions,
    });
}
exports.getHostingContractGraphSchemaName = getHostingContractGraphSchemaName;
function getCustomerGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tableName: "customer",
        env,
        schemaOptions,
    });
}
exports.getCustomerGraphSchemaName = getCustomerGraphSchemaName;
function getDashboardCustomerGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tableName: "dashboardcustomer",
        env,
        schemaOptions,
    });
}
exports.getDashboardCustomerGraphSchemaName = getDashboardCustomerGraphSchemaName;
function getHostedMinerGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tableName: "hostedminer",
        env,
        schemaOptions,
    });
}
exports.getHostedMinerGraphSchemaName = getHostedMinerGraphSchemaName;
function getPoolGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({ tableName: "pool", env, schemaOptions });
}
exports.getPoolGraphSchemaName = getPoolGraphSchemaName;
function getMiningWorkGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tableName: "miningwork",
        env,
        schemaOptions,
    });
}
exports.getMiningWorkGraphSchemaName = getMiningWorkGraphSchemaName;
function getMinerErrorGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tableName: "minererror",
        env,
        schemaOptions,
    });
}
exports.getMinerErrorGraphSchemaName = getMinerErrorGraphSchemaName;
function getFacilityInfoGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tableName: "facilityinfo",
        env,
        schemaOptions,
    });
}
exports.getFacilityInfoGraphSchemaName = getFacilityInfoGraphSchemaName;
function getFacilityMaintenanceJobGraphSchemaName(env, schemaOptions) {
    return getTableGraphSchemaName({
        tableName: "facilitymaintenancejob",
        env,
        schemaOptions,
    });
}
exports.getFacilityMaintenanceJobGraphSchemaName = getFacilityMaintenanceJobGraphSchemaName;
function getTableGraphSchemaName({ tableName: tablePrefix, env, schemaOptions, }) {
    const commandName = schemaOptions ? getCommandName(schemaOptions) : "";
    const modelName = (schemaOptions === null || schemaOptions === void 0 ? void 0 : schemaOptions.embeddedInFunction)
        ? tablePrefix.charAt(0).toUpperCase() + tablePrefix.slice(1)
        : tablePrefix;
    const suffix = (schemaOptions === null || schemaOptions === void 0 ? void 0 : schemaOptions.forManyDocuments) ? "s" : "";
    switch (env) {
        case wemine_apis_1.Environment.TEST:
            return `${commandName}${modelName}Test${suffix}`;
        case wemine_apis_1.Environment.DEV:
            return `${commandName}${modelName}Dev${suffix}`;
        case wemine_apis_1.Environment.PROD:
            return `${commandName}${modelName}Prod${suffix}`;
        default:
            return `${commandName}${modelName}Dev${suffix}`;
    }
}
function getCommandName(schemaOptions) {
    switch (schemaOptions.operationType) {
        case OperationType.FETCH:
            return "";
        case OperationType.INSERT:
            return schemaOptions.forManyDocuments ? "insertMany" : "insertOne";
        case OperationType.UPDATE:
            return schemaOptions.forManyDocuments ? "updateMany" : "updateOne";
        case OperationType.DELETE:
            return schemaOptions.forManyDocuments ? "deleteMany" : "deleteOne";
        default:
            return "";
    }
}
//# sourceMappingURL=environment-tables.js.map