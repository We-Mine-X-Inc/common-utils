import { HostedMiner, Pool } from "wemine-apis";

export type SwitchPoolParams = {
  hostedMiner: HostedMiner;
  pool: Pool;
};

export type VerifyOperationsParams = {
  hostedMiner: HostedMiner;
  pool: Pool;
};
