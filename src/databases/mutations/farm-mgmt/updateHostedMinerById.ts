import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import {
  OperationType,
  getHostedMinerGraphSchemaName,
} from "../../environment-tables";
import { IdQuery } from "../../queries/id-query";
import { UpdateDataObject } from "../update-data-obj";
import { makeGraphQLInputCompatible } from "../../json-manipulation";
import { removeNestedNullUndefined } from "@/utils";

export function updateHostedMinerById({
  env,
  query,
  updatedProperties,
}: {
  env: Environment;
  query: IdQuery;
  updatedProperties: UpdateDataObject;
}) {
  const schemaName = getHostedMinerGraphSchemaName(env, {
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
      API
      _id
      friendlyMinerId
      ipAddress
      macAddress
      status {
        lastOnlineDate
        networkStatus
        poolIsBeingSwitched
        isFarmManaged
        operatingError
      }
    }
  }
`;
}
