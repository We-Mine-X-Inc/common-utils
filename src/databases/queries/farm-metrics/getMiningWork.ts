import { gql } from "@apollo/client";
import { getMiningWorkGraphSchemaName } from "../../environment-tables";
import { Environment } from "wemine-apis";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

/* 12 possible switches in a day * 32 max days in a month */
const MIN_LIMIT_OF_WORK_RECORDS = 12 * 32;

export function getMiningWorkByTimeSpanQuery({
  env,
  query,
}: {
  env: Environment;
  query: Omit<any, "_id">;
}) {
  const schemaName = getMiningWorkGraphSchemaName(env, {
    forManyDocuments: true,
  });
  const compatibleQuery = makeGraphQLInputCompatible(query);
  return gql`
  query {
  ${schemaName}(query: ${compatibleQuery}, limit: ${MIN_LIMIT_OF_WORK_RECORDS}, sortBy: TIME_ASC) {
        hashRate
        time
		    totalEnergyConsumption
        isOperational
		    hostedMinerByFriendlyId {
          _id
          friendlyMinerId
          ipAddress
          owner {
            email
          }
          miner {
            marketDetails {
              coin {
                coinType
              }
            }
          }
        }
		    poolByFriendlyId {
          username
        }
    }
  }`;
}
