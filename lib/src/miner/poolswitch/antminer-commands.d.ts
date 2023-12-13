import { SwitchPoolParams, VerifyOperationsParams } from "./common-types";
import { HostedMiner } from "wemine-apis";
export declare function rebootAntminerMiner(params: SwitchPoolParams): Promise<void>;
export declare function switchAntminerPool(params: SwitchPoolParams): Promise<any>;
export declare function verifyAntminerPool(params: VerifyOperationsParams): Promise<any>;
export declare function verifyAntminerHashRate(hostedMiner: HostedMiner): Promise<string>;
export declare function verifyAntminerFanSpeed(hostedMiner: HostedMiner): Promise<string>;
export declare function verifyAntminerTemperature(hostedMiner: HostedMiner): Promise<string>;
//# sourceMappingURL=antminer-commands.d.ts.map