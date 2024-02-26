import { HostedMinerInflated, assertMiner } from "wemine-apis";

export function isHashRateWithinBounds(params: {
  hostedMiner: HostedMinerInflated;
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
  hostedMiner: HostedMinerInflated;
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
  hostedMiner: HostedMinerInflated;
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
  hostedMiner: HostedMinerInflated;
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
