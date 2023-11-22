import { gql } from "@apollo/client/core";

const MAX_NUM_OF_MINER_IDS = 600;

export const getAllMinersQuery = gql`
query GetAllMiners {
    miners(query: {}, limit: ${MAX_NUM_OF_MINER_IDS}) {
        API
        ipAddress
        friendlyMinerId
    }
  }`;
