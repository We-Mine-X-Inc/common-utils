import { gql } from "@apollo/client";

export const updateMinerById = gql`
  query UpdateMinerById($minerId: ObjectId) {
    mutation(
      data: {
        
      }
    )
  }
`;
