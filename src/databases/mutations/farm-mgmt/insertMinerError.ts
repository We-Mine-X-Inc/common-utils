import { gql } from "@apollo/client";
import { MinerError } from "wemine-apis";

export function insertMinerError(minerError: MinerError) {
  return gql`
  mutation InsertOneMiningWork {
    insertOneMinererror(
      data: ${{ ...minerError }}) {
        _id
        stackTrace
    }
  }`;
}
