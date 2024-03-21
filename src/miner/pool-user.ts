import { PoolType } from "wemine-apis";
import { HostedMinerConfigParams } from "./miner-config-params";
import { getPoolWorker } from "./pool-workers";

export function constructPoolUser(params: HostedMinerConfigParams) {
  return `${params.pool.username}${getPoolPaymentMethod(
    params
  )}.${getPoolWorker(params)}`;
}

function getPoolPaymentMethod(switchPoolInfo: HostedMinerConfigParams) {
  switch (switchPoolInfo.pool.poolType) {
    case PoolType.POOL_MARS:
      return "+pps";
    case PoolType.SLUSH_POOL:
    case PoolType.DX_POOL:
      return "";
    case PoolType.ANT_POOL:
      return "";
    default:
      return "";
  }
}
