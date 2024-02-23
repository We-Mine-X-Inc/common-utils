import { MinerCommandResolution, SwitchPoolParams, VerifyOperationsParams } from "./common-types";
import { HostedMiner } from "wemine-apis";
export declare function rebootGoldshellMiner(params: SwitchPoolParams): Promise<import("axios").AxiosResponse<any, any>>;
export declare function switchGoldshellPool(params: SwitchPoolParams): Promise<MinerCommandResolution>;
export declare function verifyGoldshellPool(params: VerifyOperationsParams): Promise<MinerCommandResolution>;
export declare function verifyGoldshellHashRate(hostedMiner: HostedMiner): Promise<MinerCommandResolution>;
export declare function verifyGoldshellFanSpeed(hostedMiner: HostedMiner): Promise<MinerCommandResolution>;
export declare function verifyGoldshellTemperature(hostedMiner: HostedMiner): Promise<MinerCommandResolution>;
//# sourceMappingURL=goldshell-commands.d.ts.map