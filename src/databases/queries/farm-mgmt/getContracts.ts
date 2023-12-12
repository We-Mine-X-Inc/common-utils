import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getContractGraphSchemaName } from "../../environment-tables";

export function getContracts({
  env,
  query,
}: {
  env: Environment;
  query: Omit<any, "_id">;
}) {
  return gql`
  query {
    ${getContractGraphSchemaName(env, {
      forManyDocuments: true,
    })}(query: ${query}) {
        minerIntakeStage
        hostingContract
        poolActivity
    }
  }
`;
}
