"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHostedMinersQuery = void 0;
const core_1 = require("@apollo/client/core");
const environment_tables_1 = require("../../environment-tables");
const MAX_NUM_OF_MINER_IDS = 600;
function getAllHostedMinersQuery(env, query) {
    return (0, core_1.gql) `
  query {
    ${(0, environment_tables_1.getHostedMinerGraphSchemaName)(env, {
        forManyDocuments: true,
    })}(query: ${query}, limit: ${MAX_NUM_OF_MINER_IDS}) {
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
exports.getAllHostedMinersQuery = getAllHostedMinersQuery;
//# sourceMappingURL=getHostedMiners.js.map