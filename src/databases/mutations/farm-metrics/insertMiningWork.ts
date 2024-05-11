import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import {
  OperationType,
  getMiningWorkGraphSchemaName,
} from "../../environment-tables";
import { UpdateDataObject as UpdateDataObject } from "../update-data-obj";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

export function insertMiningWork({
  env,
  data,
}: {
  env: Environment;
  data: UpdateDataObject;
}) {
  const schemaName = getMiningWorkGraphSchemaName(env, {
    operationType: OperationType.INSERT,
    embeddedInFunction: true,
  });
  const compatibleMutation = makeGraphQLInputCompatible(data);
  return gql`
    mutation {
      ${schemaName}(data: ${compatibleMutation}) {
        _id
      }
    }
  `;
}
