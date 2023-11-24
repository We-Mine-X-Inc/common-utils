import { gql } from "@apollo/client";

export const insertMiningWork = gql`
  query InsertMiningWork(
    $hashrate: Int
    $isOnline: Boolean
    $friendlyMinerId: String
    $friendlyPoolId: String
    $timeISOString: DateTime
    $totalEnergyConsumption: Int
  ) {
    mutation(
      data: {
        hashRate: $hashrate
        isOnline: $isOnline
        minerByFriendlyId: { link: $friendlyMinerId }
        poolByFriendlyId: { link: $friendlyPoolId }
        time: $timeISOString
        totalEnergyConsumption: $totalEnergyConsumption
      }
    )
  }
`;
