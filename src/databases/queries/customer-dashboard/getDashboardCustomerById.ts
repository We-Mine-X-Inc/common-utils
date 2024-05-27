import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getDashboardCustomerGraphSchemaName } from "../../environment-tables";
import { IdQuery } from "../id-query";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

export function getDashboardCustomerById({
  env,
  query,
}: {
  env: Environment;
  query: IdQuery;
}) {
  const schemaName = getDashboardCustomerGraphSchemaName(env);
  const compatibleQuery = makeGraphQLInputCompatible(query);
  return gql`
  query {
    ${schemaName}(query: ${compatibleQuery}) {
        _id
        notificationPreferences {
            minerStatusChangeNotifPreference {
                shouldReceiveEmail
            }
            poolChangeNotifPreference {
                shouldReceiveEmail
            }
            remainingTimeNotifPreference {
                shouldReceiveEmail
            }
        }
    }
  }
`;
}
