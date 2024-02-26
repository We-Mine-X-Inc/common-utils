import { MinerCommandResolution, SwitchPoolParams, VerifyOperationsParams } from "./common-types";
import { HostedMinerInflated } from "wemine-apis";
export declare function rebootGoldshellMiner(params: SwitchPoolParams): Promise<import("axios").AxiosResponse<any, any>>;
export declare function switchGoldshellPool(params: SwitchPoolParams): Promise<MinerCommandResolution>;
export declare function verifyGoldshellPool(params: VerifyOperationsParams): Promise<MinerCommandResolution>;
export declare function verifyGoldshellHashRate(hostedMiner: HostedMinerInflated): Promise<MinerCommandResolution>;
export declare function verifyGoldshellFanSpeed(hostedMiner: HostedMinerInflated): Promise<MinerCommandResolution>;
export declare function verifyGoldshellTemperature(hostedMiner: HostedMinerInflated): Promise<MinerCommandResolution>;
//# sourceMappingURL=goldshell-commands.d.ts.map