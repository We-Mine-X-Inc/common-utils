import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getFacilityMaintenanceJobGraphSchemaName } from "../../environment-tables";
import { IdQuery } from "../../queries/id-query";
import { UpdateDataObject } from "../update-data-obj";
import { makeGraphQLInputCompatible } from "../../json-manipulation";
import { removeNestedNullUndefined } from "@/utils";

export function updateFacilityMaintenanceJobById({
  env,
  query,
  updatedProperties,
}: {
  env: Environment;
  query: IdQuery;
  updatedProperties: UpdateDataObject;
}) {
  const schemaName = getFacilityMaintenanceJobGraphSchemaName(env, {
    embeddedInFunction: true,
  });
  const compatibleQuery = makeGraphQLInputCompatible(query);
  const compatibleMutation = makeGraphQLInputCompatible(
    removeNestedNullUndefined(updatedProperties)
  );
  return gql`
  mutation {
    updateOne${schemaName}(query: ${compatibleQuery}, set: ${compatibleMutation}) {
        _id
        startTime
        endTime
        durationBetweenInquiryPrompt
    }
  }
`;
}
