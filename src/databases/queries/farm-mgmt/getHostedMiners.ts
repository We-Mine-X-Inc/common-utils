import { gql } from "@apollo/client/core";
import { getHostedMinerGraphSchemaName } from "../../environment-tables";
import { Environment } from "wemine-apis";

const MAX_NUM_OF_MINER_IDS = 600;

export function getHostedMiners({
  env,
  query,
}: {
  env: Environment;
  query: Omit<any, "_id">;
}) {
  return gql`
  query {
    ${getHostedMinerGraphSchemaName(env, {
      forManyDocuments: true,
    })}(query: ${JSON.stringify(query)}, limit: ${MAX_NUM_OF_MINER_IDS}) {
        API
        ipAddress
        friendlyMinerId
        status {
          poolIsBeingSwitched
        }
        miner {
          marketDetails {
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
