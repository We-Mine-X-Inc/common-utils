import { gql } from "@apollo/client";
import { UpdateDataObj } from "../update-data-obj";

export function insertMinerError({ data }: { data: UpdateDataObj }) {
  return gql`
    mutation {
      insertOneMinererror(data: ${data}) {
        _id
        stackTrace
      }
    }
  `;
}
