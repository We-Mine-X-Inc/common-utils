"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructPoolUser = void 0;
const wemine_apis_1 = require("wemine-apis");
const pool_workers_1 = require("./pool-workers");
function constructPoolUser(params) {
    return `${params.pool.username}${getPoolPaymentMethod(params)}.${(0, pool_workers_1.getPoolWorker)(params)}`;
}
exports.constructPoolUser = constructPoolUser;
function getPoolPaymentMethod(switchPoolInfo) {
    switch (switchPoolInfo.pool.poolType) {
        case wemine_apis_1.PoolType.POOL_MARS:
            return "+pps";
        case wemine_apis_1.PoolType.SLUSH_POOL:
        case wemine_apis_1.PoolType.DX_POOL:
            return "";
        case wemine_apis_1.PoolType.ANT_POOL:
            return "";
        default:
            return "";
    }
}
//# sourceMappingURL=pool-user.js.map