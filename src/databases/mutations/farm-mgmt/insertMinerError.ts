import { gql } from "@apollo/client";
import { MinerError } from "wemine-apis";

export function insertMinerError(minerError: MinerError) {
  const newMinerError = { ...minerError, _id: undefined };
  return gql`
  mutation InsertOneMiningWork {
    insertOneMinererror(
      data: ${{ ...newMinerError }}) {
        _id
        stackTrace
    }
  }`;
}
