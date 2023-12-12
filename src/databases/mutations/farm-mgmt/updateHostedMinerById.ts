import { gql } from "@apollo/client";
import { Environment, Miner } from "wemine-apis";
import { getHostedMinerGraphSchemaName } from "../../environment-tables";
import { IdQuery } from "../../queries/id-query";

export function updateHostedMinerById({
  env,
  query,
  updatedProperties,
}: {
  env: Environment;
  query: IdQuery;
  updatedProperties: Miner;
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
