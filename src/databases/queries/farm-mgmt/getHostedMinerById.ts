import { gql } from "@apollo/client/core";
import { getHostedMinerGraphSchemaName } from "../../environment-tables";
import { Environment } from "wemine-apis";
import { IdQuery } from "../id-query";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

const MAX_NUM_OF_MINER_IDS = 600;

export function getHostedMinerById({
  env,
  query,
}: {
  env: Environment;
  query: IdQuery;
}) {
  const schemaName = getHostedMinerGraphSchemaName(env);
  const compatibleQuery = makeGraphQLInputCompatible(query);
  return gql`
  query {
    ${schemaName}(query: ${compatibleQuery}, limit: ${MAX_NUM_OF_MINER_IDS}) {
      _id
      API
      ipAddress
      friendlyMinerId
      status {
        networkStatus
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
