import { SwitchPoolParams, VerifyOperationsParams } from "./common-types";
import { HostedMiner } from "wemine-apis";
export declare function rebootGoldshellMiner(params: SwitchPoolParams): Promise<import("axios").AxiosResponse<any, any>>;
export declare function switchGoldshellPool(params: SwitchPoolParams): Promise<any>;
export declare function verifyGoldshellPool(params: VerifyOperationsParams): Promise<any>;
export declare function verifyGoldshellHashRate(hostedMiner: HostedMiner): Promise<void>;
export declare function verifyGoldshellFanSpeed(hostedMiner: HostedMiner): Promise<void>;
export declare function verifyGoldshellTemperature(hostedMiner: HostedMiner): Promise<void>;
//# sourceMappingURL=goldshell-commands.d.ts.map