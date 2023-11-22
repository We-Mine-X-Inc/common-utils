import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getMinerGraphSchemaName } from "../environment-tables";

export function getMinerById(env: Environment) {
  return gql`
  query GetMinerById($minerId: ObjectId) {
    ${getMinerGraphSchemaName(env)}(query: { _id: $minerId }) {
        inventoryItem {
            operationalMetadata {
              minerMetadata {
                minerDetails {
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
    }
  }
`;
}
