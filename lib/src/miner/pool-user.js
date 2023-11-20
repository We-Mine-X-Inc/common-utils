"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructPoolUser = void 0;
const apis_1 = require("apis");
const pool_workers_1 = require("./pool-workers");
function constructPoolUser(params) {
    return `${params.pool.username}${getPoolPaymentMethod(params)}.${(0, pool_workers_1.getPoolWorker)(params)}`;
}
exports.constructPoolUser = constructPoolUser;
function getPoolPaymentMethod(switchPoolInfo) {
    switch (switchPoolInfo.pool.poolType) {
        case apis_1.PoolType.POOL_MARS:
            return "+pps";
        case apis_1.PoolType.SLUSH_POOL:
        case apis_1.PoolType.DX_POOL:
            return "";
        default:
            return "";
    }
}
//# sourceMappingURL=pool-user.js.map