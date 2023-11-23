"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTableGraphSchemaName = exports.getMinerGraphSchemaName = exports.getCustomerGraphSchemaName = exports.getContractGraphSchemaName = void 0;
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
exports.getTableGraphSchemaName = getTableGraphSchemaName;
//# sourceMappingURL=environment-tables.js.map