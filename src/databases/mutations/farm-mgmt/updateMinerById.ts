import { gql } from "@apollo/client";
import { Environment, Miner } from "wemine-apis";
import { getMinerGraphSchemaName } from "../../environment-tables";

export function updateMinerById(env: Environment, updatedProperties: Miner) {
  return gql`
  mutation UpdateMinerById($minerId: ObjectId) {
    updateOne${getMinerGraphSchemaName(env, {
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
