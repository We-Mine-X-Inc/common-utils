import { gql } from "@apollo/client";
import { UpdateDataObject } from "../update-data-obj";

export function insertMinerError({ data }: { data: UpdateDataObject }) {
  return gql`
    mutation {
      insertOneMinererror(data: ${data}) {
        _id
        stackTrace
      }
    }
  `;
}
