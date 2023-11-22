"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMinerGraphSchemaName = exports.getCustomerGraphSchemaName = void 0;
const wemine_apis_1 = require("wemine-apis");
function getCustomerGraphSchemaName(env) {
    switch (env) {
        case wemine_apis_1.Environment.TEST:
            return "customerTest";
        case wemine_apis_1.Environment.DEV:
            return "customerDev";
        case wemine_apis_1.Environment.PROD:
            return "customerProd";
        default:
            return "customerDev";
    }
}
exports.getCustomerGraphSchemaName = getCustomerGraphSchemaName;
function getMinerGraphSchemaName(env) {
    switch (env) {
        case wemine_apis_1.Environment.TEST:
            return "minerTest";
        case wemine_apis_1.Environment.DEV:
            return "minerDev";
        case wemine_apis_1.Environment.PROD:
            return "minerProd";
        default:
            return "minerDev";
    }
}
exports.getMinerGraphSchemaName = getMinerGraphSchemaName;
//# sourceMappingURL=environment-tables.js.map