import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getCustomerGraphSchemaName } from "../../environment-tables";

export function getCustomerById(env: Environment) {
  return gql`
  query GetCustomerById($customerId: String) {
    ${getCustomerGraphSchemaName(env)}(query: { _id: $customerId }) {
      notificationPreferences
    }
  }
`;
}
