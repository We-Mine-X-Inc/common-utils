import { MinerCommandResolution, SwitchPoolParams, VerifyOperationsParams } from "./common-types";
import { HostedMiner } from "wemine-apis";
export declare function rebootAntminerMiner(params: SwitchPoolParams): Promise<void>;
export declare function switchAntminerPool(params: SwitchPoolParams): Promise<MinerCommandResolution>;
export declare function verifyAntminerPool(params: VerifyOperationsParams): Promise<MinerCommandResolution>;
export declare function verifyAntminerHashRate(hostedMiner: HostedMiner): Promise<MinerCommandResolution>;
export declare function verifyAntminerFanSpeed(hostedMiner: HostedMiner): Promise<MinerCommandResolution>;
export declare function verifyAntminerTemperature(hostedMiner: HostedMiner): Promise<MinerCommandResolution>;
//# sourceMappingURL=antminer-commands.d.ts.map