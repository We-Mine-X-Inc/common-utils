import { gql } from "@apollo/client";
import { Environment, Miner } from "wemine-apis";
import { getHostedMinerGraphSchemaName } from "../../environment-tables";

export function updateHostedMinerById(
  env: Environment,
  updatedProperties: Miner
) {
  return gql`
  mutation UpdateHostedMinerById($minerId: ObjectId) {
    updateOne${getHostedMinerGraphSchemaName(env, {
      embeddedInFunction: true,
    })}(query: {_id: $minerId}, set: ${updatedProperties}) {
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
  }
`;
}
