import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getHostedMinerGraphSchemaName } from "../../environment-tables";
import { IdQuery } from "../../queries/id-query";
import { UpdateDataObj } from "../update-data-obj";

export function updateHostedMinerById({
  env,
  query,
  updatedProperties,
}: {
  env: Environment;
  query: IdQuery;
  updatedProperties: UpdateDataObj;
}) {
  return gql`
    updateOne${getHostedMinerGraphSchemaName(env, {
      embeddedInFunction: true,
    })}(query: ${query}, set: ${updatedProperties}) {
      API
      _id
      friendlyMinerId
      ipAddress
      macAddress
      owner
      serialNumber
      status {
        lastOnlineDate
        networkStatus
        poolIsBeingSwitched
      }
    }
`;
}
