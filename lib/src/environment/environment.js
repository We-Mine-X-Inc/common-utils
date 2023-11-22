"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringToEnum = void 0;
const wemine_apis_1 = require("wemine-apis");
function convertStringToEnum(envString) {
    switch (envString) {
        case "test":
            return wemine_apis_1.Environment.TEST;
        case "development":
            return wemine_apis_1.Environment.DEV;
        case "production":
            return wemine_apis_1.Environment.PROD;
        default:
            return wemine_apis_1.Environment.UNKNOWN_ENVIRONMENT;
    }
}
exports.convertStringToEnum = convertStringToEnum;
//# sourceMappingURL=environment.js.map