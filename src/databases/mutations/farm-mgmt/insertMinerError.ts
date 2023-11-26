import { gql } from "@apollo/client";

export function insertMinerError() {
  return gql`
  mutation InsertOneMinerError(
    type: Int
    $environmentConfigId: ObjectId
    $poolSwitchErrorInfo: PoolSwitchErrorInfo
    $stackTrace: String
  ) {
    insertOneMinererror(
      data: {
        type: $type
        environmentConfigId: $environmentConfigId
        poolSwitchErrorInfo: $poolSwitchErrorInfo
        stackTrace: $stackTrace
      }) {
        _id
        stackTrace
    }
  }`;
}
