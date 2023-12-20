import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getPoolGraphSchemaName } from "../../environment-tables";
import { IdQuery } from "../id-query";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

export function getPoolById({
  env,
  query,
}: {
  env: Environment;
  query: IdQuery;
}) {
  const schemaName = getPoolGraphSchemaName(env);
  const compatibleQuery = makeGraphQLInputCompatible(query);
  return gql`
  query {
    ${schemaName}(query: ${compatibleQuery}) {
      
    }
  }
`;
}
