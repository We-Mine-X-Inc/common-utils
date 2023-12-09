"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostedMinerById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function getHostedMinerById(env) {
    return (0, client_1.gql) `
  query GetMinerById($minerId: ObjectId) {
    ${(0, environment_tables_1.getHostedMinerGraphSchemaName)(env)}(query: { _id: $minerId }) {
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
exports.getHostedMinerById = getHostedMinerById;
//# sourceMappingURL=getHostedMinerById.js.map