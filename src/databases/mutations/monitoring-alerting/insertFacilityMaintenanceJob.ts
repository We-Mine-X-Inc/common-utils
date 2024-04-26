import { gql } from "@apollo/client";
import { UpdateDataObject } from "../update-data-obj";
import { getFacilityMaintenanceJobGraphSchemaName } from "../../environment-tables";
import { Environment } from "wemine-apis";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

export function insertFacilityMaintenanceJob({
  env,
  data,
}: {
  env: Environment;
  data: UpdateDataObject;
}) {
  const schemaName = getFacilityMaintenanceJobGraphSchemaName(env, {
    embeddedInFunction: true,
  });
  const compatibleMutation = makeGraphQLInputCompatible(data);
  return gql`
    mutation {
      insertOne${schemaName}(data: ${compatibleMutation}) {
        _id
        startTime
        endTime
        durationBetweenInquiryPrompt
      }
    }
  `;
}
