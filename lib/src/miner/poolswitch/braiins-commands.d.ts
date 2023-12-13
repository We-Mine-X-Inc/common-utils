import { HostedMiner } from "wemine-apis";
import { SwitchPoolParams, VerifyOperationsParams } from "./common-types";
export declare function verifyBraiinsHashRate(hostedMiner: HostedMiner): Promise<void>;
export declare function verifyBraiinsFanSpeed(hostedMiner: HostedMiner): Promise<void>;
export declare function verifyBraiinsTemperature(hostedMiner: HostedMiner): Promise<void>;
export declare function verifyBraiinsPool(params: VerifyOperationsParams): Promise<void>;
export declare function switchBraiinsPool(params: SwitchPoolParams): Promise<any>;
export declare function rebootBraiinsMiner(params: SwitchPoolParams): Promise<import("axios").AxiosResponse<any, any>>;
//# sourceMappingURL=braiins-commands.d.ts.map