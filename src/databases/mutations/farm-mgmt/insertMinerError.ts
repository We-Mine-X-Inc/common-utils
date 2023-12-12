import { gql } from "@apollo/client";

export function insertMinerError({ data }: { data: any }) {
  return gql`
    mutation {
      insertOneMinererror(data: ${data}) {
        _id
        stackTrace
      }
    }
  `;
}
