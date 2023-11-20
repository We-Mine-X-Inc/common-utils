"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("../connection/mongoose");
const farmMetricsAppAuthsSchema = new mongoose_1.Schema({
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
const farmMetricsAppAuthsModel = mongoose_2.dbConnections.farmMetricsDb().models["FarmMetricsAppAuths"] ||
    mongoose_2.dbConnections
        .farmMetricsDb()
        .model("FarmMetricsAppAuths", farmMetricsAppAuthsSchema);
exports.default = farmMetricsAppAuthsModel;
//# sourceMappingURL=farm-metrics-app-auths.js.map