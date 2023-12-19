import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getHostingContractGraphSchemaName } from "../../environment-tables";
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
    ${getHostingContractGraphSchemaName(env)}(query: ${JSON.stringify(query)}) {
      poolMiningOptions
    }
  }
`;
}
