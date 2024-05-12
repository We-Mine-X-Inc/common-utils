import { gql } from "@apollo/client";
import { UpdateDataObject } from "../update-data-obj";
import {
  OperationType,
  getFacilityMaintenanceJobGraphSchemaName,
} from "../../environment-tables";
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
    operationType: OperationType.INSERT,
    embeddedInFunction: true,
  });
  const compatibleMutation = makeGraphQLInputCompatible(data);
  return gql`
    mutation {
      ${schemaName}(data: ${compatibleMutation}) {
        _id
        facilityInfo {
          _id
        }
        startTime
        endTime
        durationBetweenInquiryPrompt
      }
    }
  `;
}
