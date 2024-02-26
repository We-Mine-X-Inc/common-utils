import { HostedMiner, HostedMinerInflated, Pool } from "wemine-apis";

export type HostedMinerConfigParams = {
  hostedMiner: HostedMiner | HostedMinerInflated;
  pool: Pool;
};
