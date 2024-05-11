import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import {
  OperationType,
  getHostingContractGraphSchemaName,
} from "../../environment-tables";
import { IdQuery } from "../../queries/id-query";
import { UpdateDataObject } from "../update-data-obj";
import { makeGraphQLInputCompatible } from "../../json-manipulation";
import { removeNestedNullUndefined } from "@/utils";

export function updateHostingContractById({
  env,
  query,
  updatedProperties,
}: {
  env: Environment;
  query: IdQuery;
  updatedProperties: UpdateDataObject;
}) {
  const schemaName = getHostingContractGraphSchemaName(env, {
    operationType: OperationType.UPDATE,
    embeddedInFunction: true,
  });
  const compatibleQuery = makeGraphQLInputCompatible(query);
  const compatibleMutation = makeGraphQLInputCompatible(
    removeNestedNullUndefined(updatedProperties)
  );
  return gql`
  mutation {
    ${schemaName}(query: ${compatibleQuery}, set: ${compatibleMutation}) {
      _id
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
