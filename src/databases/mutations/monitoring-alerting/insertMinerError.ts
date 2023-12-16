import { gql } from "@apollo/client";
import { UpdateDataObject } from "../update-data-obj";

export function insertMinerError({ data }: { data: UpdateDataObject }) {
  return gql`
    mutation {
      insertOneMinererror(data: ${JSON.stringify(data)}) {
        _id
        stackTrace
      }
    }
  `;
}
