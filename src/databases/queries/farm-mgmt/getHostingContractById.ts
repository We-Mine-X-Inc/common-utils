import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getHostingContractGraphSchemaName } from "../../environment-tables";
import { IdQuery } from "../id-query";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

export function getContractById({
  env,
  query,
}: {
  env: Environment;
  query: IdQuery;
}) {
  const schemaName = getHostingContractGraphSchemaName(env);
  const compatibleQuery = makeGraphQLInputCompatible(query);
  return gql`
  query {
    ${schemaName}(query: ${compatibleQuery}) {
      minerIntakeStage
      poolActivity {
        expectedActivePoolIndex
      }
      poolMiningOptions {
        pool {
          protocol
          domain
          username
          poolType
          coinType
          apiToken
          purpose
          friendlyPoolId
        }
      }
    }
  }
`;
}
