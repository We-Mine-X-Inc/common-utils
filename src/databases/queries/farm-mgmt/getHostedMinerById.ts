import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getHostedMinerGraphSchemaName } from "../../environment-tables";

export function getHostedMinerById(env: Environment) {
  return gql`
  query GetMinerById($minerId: ObjectId) {
    ${getHostedMinerGraphSchemaName(env)}(query: { _id: $minerId }) {
        miner {
            details {
              model
              description
              efficiency
              wattage
              expectedHashrate
              coin {
                symbol
              }
            }
        }
    }
  }
`;
}
