import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getMiningWorkGraphSchemaName } from "../../environment-tables";

export function insertMiningWork(env: Environment) {
  return gql`
  mutation InsertOneMiningWork(
    $hashrate: Int
    $isOnline: Boolean
    $friendlyMinerId: String
    $friendlyPoolId: String
    $timeISOString: DateTime
    $totalEnergyConsumption: Int
  ) {
    insertOne${getMiningWorkGraphSchemaName(env, {
      embeddedInFunction: true,
    })}(
      data: {
        hashRate: $hashrate
        isOnline: $isOnline
        minerByFriendlyId: { link: $friendlyMinerId }
        poolByFriendlyId: { link: $friendlyPoolId }
        time: $timeISOString
        totalEnergyConsumption: $totalEnergyConsumption
      }) {
        _id
    }
  }`;
}
