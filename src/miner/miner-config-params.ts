import { HostedMiner, HostedMinerHydrated, Pool } from "wemine-apis";

export type HostedMinerConfigParams = {
  hostedMiner: HostedMiner | HostedMinerHydrated;
  pool: Pool;
};
