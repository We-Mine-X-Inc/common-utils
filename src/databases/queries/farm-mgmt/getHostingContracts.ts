import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import {
  OperationType,
  getHostingContractGraphSchemaName,
} from "../../environment-tables";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

export function getHostingContracts({
  env,
  query,
}: {
  env: Environment;
  query: Omit<any, "_id">;
}) {
  const schemaName = getHostingContractGraphSchemaName(env, {
    operationType: OperationType.FETCH,
    forManyDocuments: true,
  });
  const compatibleQuery = makeGraphQLInputCompatible(query);
  return gql`
  query {
    ${schemaName}(query: ${compatibleQuery}) {
        minerIntakeStage
        poolActivity {
          expectedActivePoolIndex
        }
        poolMiningOptions {
          poolId
        }
    }
  }
`;
}
