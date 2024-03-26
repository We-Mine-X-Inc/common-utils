import { HostedMiner, HostedMinerHydrated, MinerErrorType, Pool } from "wemine-apis";
export type SwitchPoolParams = {
    hostedMiner: HostedMiner | HostedMinerHydrated;
    pool: Pool;
};
export type VerifyOperationsParams = {
    hostedMiner: HostedMinerHydrated;
    pool: Pool;
};
export type MinerCommandResolution = any | MinerErrorInfo;
export type MinerErrorInfo = {
    minerErrorType: MinerErrorType;
    stackTrace: string;
};
//# sourceMappingURL=common-types.d.ts.map