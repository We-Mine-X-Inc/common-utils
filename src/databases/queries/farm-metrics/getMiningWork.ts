import { gql } from "@apollo/client";
import { getMiningWorkGraphSchemaName } from "../../environment-tables";
import { Environment } from "wemine-apis";

/* 12 possible switches in a day * 32 max days in a month */
const MIN_LIMIT_OF_WORK_RECORDS = 12 * 32;

export function getMiningWorkByTimeSpanQuery({
  env,
  query,
}: {
  env: Environment;
  query: Omit<any, "_id">;
}) {
  return gql`
  query {
  ${getMiningWorkGraphSchemaName(env, {
    forManyDocuments: true,
  })}(query: ${JSON.stringify(
    query
  )}, limit: ${MIN_LIMIT_OF_WORK_RECORDS}, sortBy: TIME_ASC) {
        hashRate
		    minerByFriendlyId {
          _id
          ipAddress
        }
		    poolByFriendlyId {
          username
        }
		    time
		    totalEnergyConsumption
        isOnline
    }
  }`;
}
