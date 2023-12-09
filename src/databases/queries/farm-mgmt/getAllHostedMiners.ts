import { gql } from "@apollo/client/core";
import { getHostedMinerGraphSchemaName } from "../../environment-tables";
import { Environment } from "wemine-apis";

const MAX_NUM_OF_MINER_IDS = 600;

export function getAllHostedMinersQuery(env: Environment) {
  return gql`
  query GetAllHostedMiners {
    ${getHostedMinerGraphSchemaName(env, {
      forManyDocuments: true,
    })}(query: {}, limit: ${MAX_NUM_OF_MINER_IDS}) {
        API
        ipAddress
        friendlyMinerId
    }
  }`;
}
