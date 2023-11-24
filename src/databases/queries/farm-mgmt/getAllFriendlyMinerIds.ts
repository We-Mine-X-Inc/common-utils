import { gql } from "@apollo/client/core";
import { getMinerGraphSchemaName } from "../../environment-tables";
import { Environment } from "wemine-apis";

const MAX_NUM_OF_MINER_IDS = 600;

export function getAllMinersQuery(env: Environment) {
  return gql`
  query GetAllMiners {
    ${getMinerGraphSchemaName(env, {
      forManyDocuments: true,
    })}(query: {}, limit: ${MAX_NUM_OF_MINER_IDS}) {
        API
        ipAddress
        friendlyMinerId
    }
  }`;
}
