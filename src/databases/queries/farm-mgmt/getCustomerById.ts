import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getCustomerGraphSchemaName } from "../../environment-tables";
import { IdQuery } from "../id-query";

export function getCustomerById({
  env,
  query,
}: {
  env: Environment;
  query: IdQuery;
}) {
  return gql`
  query GetCustomerById($customerId: ObjectId) {
    ${getCustomerGraphSchemaName(env)}(query: ${JSON.stringify(query)}) {
      notificationPreferences
    }
  }
`;
}
