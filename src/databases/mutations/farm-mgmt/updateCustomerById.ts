import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import {
  OperationType,
  getCustomerGraphSchemaName,
} from "../../environment-tables";
import { IdQuery } from "../../queries/id-query";
import { UpdateDataObject } from "../update-data-obj";
import { makeGraphQLInputCompatible } from "../../json-manipulation";
import { removeNestedNullUndefined } from "@/utils";

export function updateCustomerById({
  env,
  query,
  updatedProperties,
}: {
  env: Environment;
  query: IdQuery;
  updatedProperties: UpdateDataObject;
}) {
  const schemaName = getCustomerGraphSchemaName(env, {
    operationType: OperationType.UPDATE,
    embeddedInFunction: true,
  });
  const compatibleQuery = makeGraphQLInputCompatible(query);
  const compatibleMutation = makeGraphQLInputCompatible(
    removeNestedNullUndefined(updatedProperties)
  );
  return gql`
  mutation {
    ${schemaName}(query: ${compatibleQuery}, set: ${compatibleMutation}) {
        notificationPreferences {
          minerStatusChangeNotifPreference: {
            shouldReceiveEmail
          }
          poolChangeNotifPreference: {
            shouldReceiveEmail
          }
          remainingTimeNotifPreference: {
            shouldReceiveEmail
          }
        }
    }
  }
`;
}
