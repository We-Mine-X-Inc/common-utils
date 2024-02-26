import { MinerCommandResolution, SwitchPoolParams, VerifyOperationsParams } from "./common-types";
import { HostedMinerInflated } from "wemine-apis";
export declare function rebootAntminerMiner(params: SwitchPoolParams): Promise<void>;
export declare function switchAntminerPool(params: SwitchPoolParams): Promise<MinerCommandResolution>;
export declare function verifyAntminerPool(params: VerifyOperationsParams): Promise<MinerCommandResolution>;
export declare function verifyAntminerHashRate(hostedMiner: HostedMinerInflated): Promise<MinerCommandResolution>;
export declare function verifyAntminerFanSpeed(hostedMiner: HostedMinerInflated): Promise<MinerCommandResolution>;
export declare function verifyAntminerTemperature(hostedMiner: HostedMinerInflated): Promise<MinerCommandResolution>;
//# sourceMappingURL=antminer-commands.d.ts.map