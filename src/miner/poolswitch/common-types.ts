import { HostedMiner, MinerErrorType, Pool } from "wemine-apis";

export type SwitchPoolParams = {
  hostedMiner: HostedMiner;
  pool: Pool;
};

export type VerifyOperationsParams = {
  hostedMiner: HostedMiner;
  pool: Pool;
};

export type MinerCommandResolution = any | MinerErrorInfo;

export type MinerErrorInfo = {
  minerErrorType: MinerErrorType;
  stackTrace: string;
};
