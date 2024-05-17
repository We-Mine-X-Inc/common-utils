import { HostedMinerHydrated, MinerErrorType } from "wemine-apis";
export declare function getUnfulfilledCommandError(relatedMinerErrorType: MinerErrorType): {
    minerErrorType: MinerErrorType;
    stackTrace: string;
};
export declare function isHashRateWithinBounds(params: {
    hostedMiner: HostedMinerHydrated;
    actualHashRate: number;
}): boolean;
export declare function isFanSpeedWithinBounds(params: {
    hostedMiner: HostedMinerHydrated;
    actualFanSpeed: number;
}): boolean;
export declare function isInletTempWithinBounds(params: {
    hostedMiner: HostedMinerHydrated;
    actualTemperature: number;
}): boolean;
export declare function isOutletTempWithinBounds(params: {
    hostedMiner: HostedMinerHydrated;
    actualTemperature: number;
}): boolean;
//# sourceMappingURL=common-funcs.d.ts.map