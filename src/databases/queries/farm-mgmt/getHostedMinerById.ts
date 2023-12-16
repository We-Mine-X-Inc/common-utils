import { gql } from "@apollo/client/core";
import { getHostedMinerGraphSchemaName } from "../../environment-tables";
import { Environment } from "wemine-apis";
import { IdQuery } from "../id-query";

const MAX_NUM_OF_MINER_IDS = 600;

export function getHostedMinerById({
  env,
  query,
}: {
  env: Environment;
  query: IdQuery;
}) {
  return gql`
  query {
    ${getHostedMinerGraphSchemaName(env)}(query: ${JSON.stringify(
    query
  )}, limit: ${MAX_NUM_OF_MINER_IDS}) {
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
