import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getContractGraphSchemaName } from "../../environment-tables";
import { IdQuery } from "../id-query";

export function getContractById({
  env,
  query,
}: {
  env: Environment;
  query: IdQuery;
}) {
  return gql`
  query {
    ${getContractGraphSchemaName(env)}(query: ${query}) {
      hostingContract
    }
  }
`;
}
