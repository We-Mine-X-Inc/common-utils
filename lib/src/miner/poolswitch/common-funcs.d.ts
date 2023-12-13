import { HostedMiner } from "wemine-apis";
export declare function isHashRateWithinBounds(params: {
    hostedMiner: HostedMiner;
    actualHashRate: number;
}): boolean;
export declare function isFanSpeedWithinBounds(params: {
    hostedMiner: HostedMiner;
    actualFanSpeed: number;
}): boolean;
export declare function isInletTempWithinBounds(params: {
    hostedMiner: HostedMiner;
    actualTemperature: number;
}): boolean;
export declare function isOutletTempWithinBounds(params: {
    hostedMiner: HostedMiner;
    actualTemperature: number;
}): boolean;
//# sourceMappingURL=common-funcs.d.ts.map