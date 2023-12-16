import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getPoolGraphSchemaName } from "../../environment-tables";
import { IdQuery } from "../id-query";

export function getPoolById({
  env,
  query,
}: {
  env: Environment;
  query: IdQuery;
}) {
  return gql`
  query {
    ${getPoolGraphSchemaName(env)}(query: ${JSON.stringify(query)}) {
      
    }
  }
`;
}
