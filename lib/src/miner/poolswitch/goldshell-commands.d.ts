import { MinerCommandResolution, SwitchPoolParams, VerifyOperationsParams } from "./common-types";
import { HostedMinerHydrated } from "wemine-apis";
export declare function isGoldshellReachable(ipAddress: string): Promise<MinerCommandResolution>;
export declare function rebootGoldshellMiner(params: SwitchPoolParams): Promise<import("axios").AxiosResponse<any, any>>;
export declare function switchGoldshellPool(params: SwitchPoolParams): Promise<MinerCommandResolution>;
export declare function verifyGoldshellPool(params: VerifyOperationsParams): Promise<MinerCommandResolution>;
export declare function verifyGoldshellHashRate(hostedMiner: HostedMinerHydrated): Promise<MinerCommandResolution>;
export declare function verifyGoldshellFanSpeed(hostedMiner: HostedMinerHydrated): Promise<MinerCommandResolution>;
export declare function verifyGoldshellTemperature(hostedMiner: HostedMinerHydrated): Promise<MinerCommandResolution>;
//# sourceMappingURL=goldshell-commands.d.ts.map