import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getFacilityMaintenanceJobGraphSchemaName } from "../../environment-tables";
import { IdQuery } from "../id-query";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

export function getFacilityMaintenanceJobById({
  env,
  query,
}: {
  env: Environment;
  query: IdQuery;
}) {
  const schemaName = getFacilityMaintenanceJobGraphSchemaName(env);
  const compatibleQuery = makeGraphQLInputCompatible(query);
  return gql`
  query {
    ${schemaName}(query: ${compatibleQuery}) {
      _id
      facilityInfo
      startTime
      endTime
      durationBetweenInquiryPrompt
    }
  }
`;
}
