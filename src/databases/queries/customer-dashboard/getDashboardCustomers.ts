import { gql } from "@apollo/client/core";
import {
  OperationType,
  getDashboardCustomerGraphSchemaName,
} from "../../environment-tables";
import { Environment } from "wemine-apis";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

const MAX_NUM_OF_CUSTOMER_IDS = 100;

export function getDashboardCustomers({
  env,
  query,
}: {
  env: Environment;
  query: Omit<any, "_id">;
}) {
  const schemaName = getDashboardCustomerGraphSchemaName(env, {
    operationType: OperationType.FETCH,
    forManyDocuments: true,
  });
  const compatibleQuery = makeGraphQLInputCompatible(query);
  return gql`
  query {
    ${schemaName}(query: ${compatibleQuery}, limit: ${MAX_NUM_OF_CUSTOMER_IDS}) {
        _id
        farmProfile {
            _id
            email
            firstName
            lastName
            phoneNumber
            address
            isCompanyCustomer
        }
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
        hasSubmittedSignUpInfo
    }
  }`;
}
