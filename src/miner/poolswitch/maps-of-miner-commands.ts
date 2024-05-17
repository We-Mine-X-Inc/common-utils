import { HostedMinerHydrated, MinerApiType } from "wemine-apis";
import {
  isAntminerReachable,
  rebootAntminerMiner,
  switchAntminerPool,
  verifyAntminerFanSpeed,
  verifyAntminerHashRate,
  verifyAntminerPool,
  verifyAntminerTemperature,
} from "./antminer-commands";
import {
  MinerCommandResolution,
  SwitchPoolParams,
  VerifyOperationsParams,
} from "./common-types";
import {
  isGoldshellReachable,
  rebootGoldshellMiner,
  switchGoldshellPool,
  verifyGoldshellFanSpeed,
  verifyGoldshellHashRate,
  verifyGoldshellPool,
  verifyGoldshellTemperature,
} from "./goldshell-commands";
import { format as prettyFormat } from "pretty-format";
import {
  isBraiinsReachable,
  rebootBraiinsMiner,
  switchBraiinsPool,
  verifyBraiinsFanSpeed,
  verifyBraiinsHashRate,
  verifyBraiinsPool,
  verifyBraiinsTemperature,
} from "./braiins-commands";

export const IS_REACHABLE_FUNCTION: Record<
  MinerApiType,
  (ipAddress: string) => Promise<MinerCommandResolution>
> = {
  [MinerApiType.UNKNOWN]: isUknownMinerReachable,
  [MinerApiType.ANTMINER]: isAntminerReachable,
  [MinerApiType.BRAIINS]: isBraiinsReachable,
  [MinerApiType.GOLDSHELL]: isGoldshellReachable,
};

export const POOL_SWITCH_FUNCTION: Record<
  MinerApiType,
  (p: SwitchPoolParams) => Promise<MinerCommandResolution>
> = {
  [MinerApiType.UNKNOWN]: switchUnknownPool,
  [MinerApiType.ANTMINER]: switchAntminerPool,
  [MinerApiType.BRAIINS]: switchBraiinsPool,
  [MinerApiType.GOLDSHELL]: switchGoldshellPool,
};

export const POOL_VERIFICATION_FUNCTION: Record<
  MinerApiType,
  (p: VerifyOperationsParams) => Promise<MinerCommandResolution>
> = {
  [MinerApiType.UNKNOWN]: verifyUnknownApiPool,
  [MinerApiType.ANTMINER]: verifyAntminerPool,
  [MinerApiType.BRAIINS]: verifyBraiinsPool,
  [MinerApiType.GOLDSHELL]: verifyGoldshellPool,
};

export const REBOOT_MINER_FUNCTION: Record<
  MinerApiType,
  (p: SwitchPoolParams) => Promise<MinerCommandResolution>
> = {
  [MinerApiType.UNKNOWN]: rebootUnknownMiner,
  [MinerApiType.ANTMINER]: rebootAntminerMiner,
  [MinerApiType.BRAIINS]: rebootBraiinsMiner,
  [MinerApiType.GOLDSHELL]: rebootGoldshellMiner,
};

export const HASHRATE_VERIFICATION_FUNCTION: Record<
  MinerApiType,
  (hostedMiner: HostedMinerHydrated) => Promise<MinerCommandResolution>
> = {
  [MinerApiType.UNKNOWN]: verifyUnknownMinerHashRate,
  [MinerApiType.ANTMINER]: verifyAntminerHashRate,
  [MinerApiType.BRAIINS]: verifyBraiinsHashRate,
  [MinerApiType.GOLDSHELL]: verifyGoldshellHashRate,
};

export const FAN_SPEED_VERIFICATION_FUNCTION: Record<
  MinerApiType,
  (hostedMiner: HostedMinerHydrated) => Promise<MinerCommandResolution>
> = {
  [MinerApiType.UNKNOWN]: verifyUnknownMinerFanSpeed,
  [MinerApiType.ANTMINER]: verifyAntminerFanSpeed,
  [MinerApiType.BRAIINS]: verifyBraiinsFanSpeed,
  [MinerApiType.GOLDSHELL]: verifyGoldshellFanSpeed,
};

export const TEMPERATURE_VERIFICATION_FUNCTION: Record<
  MinerApiType,
  (hostedMiner: HostedMinerHydrated) => Promise<MinerCommandResolution>
> = {
  [MinerApiType.UNKNOWN]: verifyUnknownMinerTemperature,
  [MinerApiType.ANTMINER]: verifyAntminerTemperature,
  [MinerApiType.BRAIINS]: verifyBraiinsTemperature,
  [MinerApiType.GOLDSHELL]: verifyGoldshellTemperature,
};

async function isUknownMinerReachable(ipAddress: string) {
  throw Error(`Invalid Miner API supplied. Params: ${ipAddress}`);
}

async function switchUnknownPool(
  params: SwitchPoolParams
): Promise<MinerCommandResolution> {
  throw Error(`Invalid Miner API supplied. Params: ${prettyFormat(params)}`);
}

async function verifyUnknownApiPool(
  params: VerifyOperationsParams
): Promise<MinerCommandResolution> {
  throw Error(`Invalid Miner API supplied. Params: ${prettyFormat(params)}`);
}

async function rebootUnknownMiner(
  params: SwitchPoolParams
): Promise<MinerCommandResolution> {
  throw Error(`Invalid Miner API supplied. Params: ${prettyFormat(params)}`);
}

async function verifyUnknownMinerHashRate(
  miner: HostedMinerHydrated
): Promise<MinerCommandResolution> {
  throw Error(`Invalid Miner API supplied. Params: ${prettyFormat(miner)}`);
}

async function verifyUnknownMinerFanSpeed(
  miner: HostedMinerHydrated
): Promise<MinerCommandResolution> {
  throw Error(`Invalid Miner API supplied. Params: ${prettyFormat(miner)}`);
}

async function verifyUnknownMinerTemperature(
  miner: HostedMinerHydrated
): Promise<MinerCommandResolution> {
  throw Error(`Invalid Miner API supplied. Params: ${prettyFormat(miner)}`);
}
