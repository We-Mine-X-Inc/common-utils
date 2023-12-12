"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostedMinerByIdQuery = void 0;
const core_1 = require("@apollo/client/core");
const environment_tables_1 = require("../../environment-tables");
const MAX_NUM_OF_MINER_IDS = 600;
function getHostedMinerByIdQuery(env, query) {
    return (0, core_1.gql) `
  query {
    ${(0, environment_tables_1.getHostedMinerGraphSchemaName)(env)}(query: ${query}, limit: ${MAX_NUM_OF_MINER_IDS}) {
        API
        ipAddress
        friendlyMinerId
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
  }`;
}
exports.getHostedMinerByIdQuery = getHostedMinerByIdQuery;
//# sourceMappingURL=getHostedMinerById.js.map