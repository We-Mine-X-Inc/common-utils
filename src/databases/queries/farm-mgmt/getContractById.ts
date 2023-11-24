import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getContractGraphSchemaName } from "../../environment-tables";

export function getContractById(env: Environment) {
  return gql`
  query GetContractById($contractId: ObjectId) {
    ${getContractGraphSchemaName(env)}(query: { _id: $contractId }) {
      hostingContract
    }
  }
`;
}
