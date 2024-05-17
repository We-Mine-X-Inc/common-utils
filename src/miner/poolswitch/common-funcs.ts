import axios from "axios";
import { HostedMiner, HostedMinerHydrated, assertMiner } from "wemine-apis";

export async function isReachable(
  hostedMiner: HostedMinerHydrated | HostedMiner
) {
  return await axios(`http://${hostedMiner.ipAddress}`, {
    method: "get",
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      Accept: "text/html; charset=utf-8; application/json",
    },
  });
}

export function isHashRateWithinBounds(params: {
  hostedMiner: HostedMinerHydrated;
  actualHashRate: number;
}) {
  const miner = params.hostedMiner.miner;
  assertMiner(miner);

  const expectedHashRateRange = miner.operationDetails.expectedHashRateRange;
  return (
    !!expectedHashRateRange &&
    expectedHashRateRange.minimum <= params.actualHashRate &&
    params.actualHashRate <= expectedHashRateRange.maximum
  );
}

export function isFanSpeedWithinBounds(params: {
  hostedMiner: HostedMinerHydrated;
  actualFanSpeed: number;
}) {
  const miner = params.hostedMiner.miner;
  assertMiner(miner);

  const expectedFanSpeedRange = miner.operationDetails.expectedFanSpeedRange;
  return (
    !!expectedFanSpeedRange &&
    expectedFanSpeedRange.minimum <= params.actualFanSpeed &&
    params.actualFanSpeed <= expectedFanSpeedRange.maximum
  );
}

export function isInletTempWithinBounds(params: {
  hostedMiner: HostedMinerHydrated;
  actualTemperature: number;
}) {
  const miner = params.hostedMiner.miner;
  assertMiner(miner);

  const expectedInletTempRange = miner.operationDetails.expectedInletTempRange;
  return (
    !!expectedInletTempRange &&
    expectedInletTempRange.minimum <= params.actualTemperature &&
    params.actualTemperature <= expectedInletTempRange.maximum
  );
}

export function isOutletTempWithinBounds(params: {
  hostedMiner: HostedMinerHydrated;
  actualTemperature: number;
}) {
  const miner = params.hostedMiner.miner;
  assertMiner(miner);

  const expectedOutletTempRange =
    miner.operationDetails.expectedOutletTempRange;
  return (
    !!expectedOutletTempRange &&
    expectedOutletTempRange.minimum <= params.actualTemperature &&
    params.actualTemperature <= expectedOutletTempRange.maximum
  );
}
