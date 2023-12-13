import { HostedMiner, MinerApiType } from "wemine-apis";
import { SwitchPoolParams, VerifyOperationsParams } from "./common-types";
export declare const POOL_SWITCH_FUNCTION: Record<MinerApiType, (p: SwitchPoolParams) => Promise<any>>;
export declare const POOL_VERIFICATION_FUNCTION: Record<MinerApiType, (p: VerifyOperationsParams) => Promise<any>>;
export declare const REBOOT_MINER_FUNCTION: Record<MinerApiType, (p: SwitchPoolParams) => Promise<any>>;
export declare const HASHRATE_VERIFICATION_FUNCTION: Record<MinerApiType, (hostedMiner: HostedMiner) => Promise<any>>;
export declare const FAN_SPEED_VERIFICATION_FUNCTION: Record<MinerApiType, (hostedMiner: HostedMiner) => Promise<any>>;
export declare const TEMPERATURE_VERIFICATION_FUNCTION: Record<MinerApiType, (hostedMiner: HostedMiner) => Promise<any>>;
//# sourceMappingURL=maps-of-miner-commands.d.ts.map