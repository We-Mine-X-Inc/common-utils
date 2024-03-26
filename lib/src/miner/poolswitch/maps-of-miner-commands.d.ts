import { HostedMinerHydrated, MinerApiType } from "wemine-apis";
import { MinerCommandResolution, SwitchPoolParams, VerifyOperationsParams } from "./common-types";
export declare const POOL_SWITCH_FUNCTION: Record<MinerApiType, (p: SwitchPoolParams) => Promise<MinerCommandResolution>>;
export declare const POOL_VERIFICATION_FUNCTION: Record<MinerApiType, (p: VerifyOperationsParams) => Promise<MinerCommandResolution>>;
export declare const REBOOT_MINER_FUNCTION: Record<MinerApiType, (p: SwitchPoolParams) => Promise<MinerCommandResolution>>;
export declare const HASHRATE_VERIFICATION_FUNCTION: Record<MinerApiType, (hostedMiner: HostedMinerHydrated) => Promise<MinerCommandResolution>>;
export declare const FAN_SPEED_VERIFICATION_FUNCTION: Record<MinerApiType, (hostedMiner: HostedMinerHydrated) => Promise<MinerCommandResolution>>;
export declare const TEMPERATURE_VERIFICATION_FUNCTION: Record<MinerApiType, (hostedMiner: HostedMinerHydrated) => Promise<MinerCommandResolution>>;
//# sourceMappingURL=maps-of-miner-commands.d.ts.map