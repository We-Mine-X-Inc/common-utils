import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getPoolGraphSchemaName } from "../../environment-tables";

export function getPoolById(env: Environment) {
  return gql`
  query GetPoolById($poolId: String) {
    ${getPoolGraphSchemaName(env)}(query: { _id: $poolId }) {
      
    }
  }
`;
}
