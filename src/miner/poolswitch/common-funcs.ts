import { HostedMiner, assertMiner } from "wemine-apis";

export function isHashRateWithinBounds(params: {
  hostedMiner: HostedMiner;
  actualHashRate: number;
}) {
  const miner = params.hostedMiner.miner;
  assertMiner(miner);

  const expectedHashRateRange = miner.metadata?.expectedHashRateRange;
  return (
    !!expectedHashRateRange &&
    expectedHashRateRange.minimum <= params.actualHashRate &&
    params.actualHashRate <= expectedHashRateRange.maximum
  );
}

export function isFanSpeedWithinBounds(params: {
  hostedMiner: HostedMiner;
  actualFanSpeed: number;
}) {
  const miner = params.hostedMiner.miner;
  assertMiner(miner);

  const expectedFanSpeedRange = miner.metadata?.expectedFanSpeedRange;
  return (
    !!expectedFanSpeedRange &&
    expectedFanSpeedRange.minimum <= params.actualFanSpeed &&
    params.actualFanSpeed <= expectedFanSpeedRange.maximum
  );
}

export function isInletTempWithinBounds(params: {
  hostedMiner: HostedMiner;
  actualTemperature: number;
}) {
  const miner = params.hostedMiner.miner;
  assertMiner(miner);

  const expectedInletTempRange = miner.metadata?.expectedInletTempRange;
  return (
    !!expectedInletTempRange &&
    expectedInletTempRange.minimum <= params.actualTemperature &&
    params.actualTemperature <= expectedInletTempRange.maximum
  );
}

export function isOutletTempWithinBounds(params: {
  hostedMiner: HostedMiner;
  actualTemperature: number;
}) {
  const miner = params.hostedMiner.miner;
  assertMiner(miner);

  const expectedOutletTempRange = miner.metadata?.expectedOutletTempRange;
  return (
    !!expectedOutletTempRange &&
    expectedOutletTempRange.minimum <= params.actualTemperature &&
    params.actualTemperature <= expectedOutletTempRange.maximum
  );
}
