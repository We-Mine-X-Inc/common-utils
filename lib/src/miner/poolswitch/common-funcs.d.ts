import { HostedMinerInflated } from "wemine-apis";
export declare function isHashRateWithinBounds(params: {
    hostedMiner: HostedMinerInflated;
    actualHashRate: number;
}): boolean;
export declare function isFanSpeedWithinBounds(params: {
    hostedMiner: HostedMinerInflated;
    actualFanSpeed: number;
}): boolean;
export declare function isInletTempWithinBounds(params: {
    hostedMiner: HostedMinerInflated;
    actualTemperature: number;
}): boolean;
export declare function isOutletTempWithinBounds(params: {
    hostedMiner: HostedMinerInflated;
    actualTemperature: number;
}): boolean;
//# sourceMappingURL=common-funcs.d.ts.map