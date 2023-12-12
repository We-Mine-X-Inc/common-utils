import { gql } from "@apollo/client/core";
import { getHostedMinerGraphSchemaName } from "../../environment-tables";
import { Environment } from "wemine-apis";

const MAX_NUM_OF_MINER_IDS = 600;

export function getAllHostedMinersQuery(
  env: Environment,
  query: Omit<any, "_id">
) {
  return gql`
  query {
    ${getHostedMinerGraphSchemaName(env, {
      forManyDocuments: true,
    })}(query: ${query}, limit: ${MAX_NUM_OF_MINER_IDS}) {
        API
        ipAddress
        friendlyMinerId
        miner {
          details {
            model
            description
            efficiency
            wattage
            expectedHashrate
            coin {
              symbol
            }
          }
      }
    }
  }`;
}
