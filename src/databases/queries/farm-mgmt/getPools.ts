import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import {
  OperationType,
  getPoolGraphSchemaName,
} from "../../environment-tables";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

export function getPools({
  env,
  query,
}: {
  env: Environment;
  query: Omit<any, "_id">;
}) {
  const schemaName = getPoolGraphSchemaName(env, {
    operationType: OperationType.FETCH,
    forManyDocuments: true,
  });
  const compatibleQuery = makeGraphQLInputCompatible(query);
  return gql`
  query {
    ${schemaName}(query: ${compatibleQuery}) {
      friendlyPoolId
      domain
      protocol
      username
      poolType
      purpose
    }
  }
`;
}
