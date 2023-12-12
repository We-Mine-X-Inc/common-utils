import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getHostingContractGraphSchemaName } from "../../environment-tables";

export function getHostingContracts({
  env,
  query,
}: {
  env: Environment;
  query: Omit<any, "_id">;
}) {
  return gql`
  query {
    ${getHostingContractGraphSchemaName(env, {
      forManyDocuments: true,
    })}(query: ${query}) {
        minerIntakeStage
        hostingContract
        poolActivity
    }
  }
`;
}
