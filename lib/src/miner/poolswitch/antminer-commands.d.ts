import { MinerCommandResolution, SwitchPoolParams, VerifyOperationsParams } from "./common-types";
import { HostedMinerHydrated } from "wemine-apis";
export declare function isAntminerReachable(ipAddress: string): Promise<MinerCommandResolution>;
export declare function rebootAntminerMiner(params: SwitchPoolParams): Promise<void>;
export declare function switchAntminerPool(params: SwitchPoolParams): Promise<MinerCommandResolution>;
export declare function verifyAntminerPool(params: VerifyOperationsParams): Promise<MinerCommandResolution>;
export declare function verifyAntminerHashRate(hostedMiner: HostedMinerHydrated): Promise<MinerCommandResolution>;
export declare function verifyAntminerFanSpeed(hostedMiner: HostedMinerHydrated): Promise<MinerCommandResolution>;
export declare function verifyAntminerTemperature(hostedMiner: HostedMinerHydrated): Promise<MinerCommandResolution>;
//# sourceMappingURL=antminer-commands.d.ts.map