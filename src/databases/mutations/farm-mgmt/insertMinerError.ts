import { gql } from "@apollo/client";
import { MinerError } from "wemine-apis";

export function insertMinerError(minerError: MinerError) {
  const newMinerError = { ...minerError, _id: undefined };
  return gql`
  mutation InsertOneMinerError {
    insertOneMinererror(
      data: ${{ ...newMinerError }}) {
        _id
        stackTrace
    }
  }`;
}
