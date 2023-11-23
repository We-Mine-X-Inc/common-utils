"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoolGraphSchemaName = exports.getMinerGraphSchemaName = exports.getCustomerGraphSchemaName = exports.getContractGraphSchemaName = void 0;
const wemine_apis_1 = require("wemine-apis");
getContractGraphSchemaName;
function getContractGraphSchemaName(env) {
    return getTableGraphSchemaName({ tablePrefix: "contract", env });
}
exports.getContractGraphSchemaName = getContractGraphSchemaName;
function getCustomerGraphSchemaName(env) {
    return getTableGraphSchemaName({ tablePrefix: "customer", env });
}
exports.getCustomerGraphSchemaName = getCustomerGraphSchemaName;
function getMinerGraphSchemaName(env) {
    return getTableGraphSchemaName({ tablePrefix: "miner", env });
}
exports.getMinerGraphSchemaName = getMinerGraphSchemaName;
function getPoolGraphSchemaName(env) {
    return getTableGraphSchemaName({ tablePrefix: "pool", env });
}
exports.getPoolGraphSchemaName = getPoolGraphSchemaName;
function getTableGraphSchemaName({ tablePrefix, env, }) {
    switch (env) {
        case wemine_apis_1.Environment.TEST:
            return `${tablePrefix}Test`;
        case wemine_apis_1.Environment.DEV:
            return `${tablePrefix}Dev`;
        case wemine_apis_1.Environment.PROD:
            return `${tablePrefix}Prod`;
        default:
            return `${tablePrefix}Dev`;
    }
}
//# sourceMappingURL=environment-tables.js.map