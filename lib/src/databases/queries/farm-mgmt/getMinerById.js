"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMinerById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../environment-tables");
function getMinerById(env) {
    return (0, client_1.gql) `
  query GetMinerById($minerId: ObjectId) {
    ${(0, environment_tables_1.getMinerGraphSchemaName)(env)}(query: { _id: $minerId }) {
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
exports.getMinerById = getMinerById;
//# sourceMappingURL=getMinerById.js.map