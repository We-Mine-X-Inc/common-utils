"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("../connection/mongoose");
const farmMgmtAppAuthsSchema = new mongoose_1.Schema({
    access_token: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    device_id: {
        type: String,
        required: true,
    },
});
const farmMgmtAppAuthsModel = mongoose_2.dbConnections.globalConfigsDb().models["FarmMgmtAppAuths"] ||
    mongoose_2.dbConnections
        .globalConfigsDb()
        .model("FarmMgmtAppAuths", farmMgmtAppAuthsSchema);
exports.default = farmMgmtAppAuthsModel;
//# sourceMappingURL=farm-mgmt-app-auths.js.map