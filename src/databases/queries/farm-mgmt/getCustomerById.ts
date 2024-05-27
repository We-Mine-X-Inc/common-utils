import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getCustomerGraphSchemaName } from "../../environment-tables";
import { IdQuery } from "../id-query";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

export function getCustomerById({
  env,
  query,
}: {
  env: Environment;
  query: IdQuery;
}) {
  const schemaName = getCustomerGraphSchemaName(env);
  const compatibleQuery = makeGraphQLInputCompatible(query);
  return gql`
  query {
    ${schemaName}(query: ${compatibleQuery}) {
      _id
    }
  }
`;
}
