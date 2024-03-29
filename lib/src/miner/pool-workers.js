"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoolWorker = exports.COMPANY_FULL_TIME_WORKER_PREFIX = exports.COMPANY_FEE_WORKER_PREFIX = exports.CLIENT_WORKER_PREFIX = void 0;
const wemine_apis_1 = require("wemine-apis");
exports.CLIENT_WORKER_PREFIX = "cl";
exports.COMPANY_FEE_WORKER_PREFIX = "co-fee";
exports.COMPANY_FULL_TIME_WORKER_PREFIX = "co";
function getPoolWorker(switchPoolInfo) {
    const purpose = switchPoolInfo.pool.purpose;
    const friendlyMinerId = switchPoolInfo.hostedMiner.friendlyMinerId;
    const friendlyPoolId = switchPoolInfo.pool.friendlyPoolId;
    return `${getPoolWorkerPrefix(purpose)}-${friendlyPoolId}-${friendlyMinerId}`;
}
exports.getPoolWorker = getPoolWorker;
function getPoolWorkerPrefix(purpose) {
    switch (purpose) {
        case wemine_apis_1.PoolPurposeType.CLIENT_REVENUE:
            return exports.CLIENT_WORKER_PREFIX;
        case wemine_apis_1.PoolPurposeType.MINING_FEE:
            return exports.COMPANY_FEE_WORKER_PREFIX;
        case wemine_apis_1.PoolPurposeType.PURE_COMPANY_REVENUE:
            return exports.COMPANY_FULL_TIME_WORKER_PREFIX;
        default:
            return "";
    }
}
//# sourceMappingURL=pool-workers.js.map