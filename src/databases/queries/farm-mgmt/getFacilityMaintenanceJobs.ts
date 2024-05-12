import { gql } from "@apollo/client/core";
import {
  OperationType,
  getFacilityMaintenanceJobGraphSchemaName,
} from "../../environment-tables";
import { Environment } from "wemine-apis";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

const MAX_NUM_OF_FACILITY_IDS = 600;

export function getFacilityMaintenanceJobs({
  env,
  query,
}: {
  env: Environment;
  query: Omit<any, "_id">;
}) {
  const schemaName = getFacilityMaintenanceJobGraphSchemaName(env, {
    operationType: OperationType.FETCH,
    forManyDocuments: true,
  });
  const compatibleQuery = makeGraphQLInputCompatible(query);
  return gql`
  query {
    ${schemaName}(query: ${compatibleQuery}, limit: ${MAX_NUM_OF_FACILITY_IDS}) {
      _id  
      facilityInfo
      startTime
      endTime
      durationBetweenInquiryPrompt
    }
  }`;
}
