import { PoolType } from "apis";
import { MinerConfigParams } from "./miner-config-params";
import { getPoolWorker } from "./pool-workers";

export function constructPoolUser(params: MinerConfigParams) {
  return `${params.pool.username}${getPoolPaymentMethod(
    params
  )}.${getPoolWorker(params)}`;
}

function getPoolPaymentMethod(switchPoolInfo: MinerConfigParams) {
  switch (switchPoolInfo.pool.poolType) {
    case PoolType.POOL_MARS:
      return "+pps";
    case PoolType.SLUSH_POOL:
    case PoolType.DX_POOL:
      return "";
    default:
      return "";
  }
}
