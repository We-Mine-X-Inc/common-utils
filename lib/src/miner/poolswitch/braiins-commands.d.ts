import { HostedMinerInflated } from "wemine-apis";
import { MinerCommandResolution, SwitchPoolParams, VerifyOperationsParams } from "./common-types";
export declare function verifyBraiinsHashRate(hostedMiner: HostedMinerInflated): Promise<MinerCommandResolution>;
export declare function verifyBraiinsFanSpeed(hostedMiner: HostedMinerInflated): Promise<MinerCommandResolution>;
export declare function verifyBraiinsTemperature(hostedMiner: HostedMinerInflated): Promise<MinerCommandResolution>;
export declare function verifyBraiinsPool(params: VerifyOperationsParams): Promise<MinerCommandResolution>;
export declare function switchBraiinsPool(params: SwitchPoolParams): Promise<MinerCommandResolution>;
export declare function rebootBraiinsMiner(params: SwitchPoolParams): Promise<import("axios").AxiosResponse<any, any>>;
//# sourceMappingURL=braiins-commands.d.ts.map