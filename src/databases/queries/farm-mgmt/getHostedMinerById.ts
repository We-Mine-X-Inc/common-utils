import { gql } from "@apollo/client/core";
import { getHostedMinerGraphSchemaName } from "../../environment-tables";
import { Environment } from "wemine-apis";
import { IdQuery } from "../id-query";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

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
    ${schemaName}(query: ${compatibleQuery}) {
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
