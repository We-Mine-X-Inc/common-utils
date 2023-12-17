"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostedMiners = void 0;
const core_1 = require("@apollo/client/core");
const environment_tables_1 = require("../../environment-tables");
const MAX_NUM_OF_MINER_IDS = 600;
function getHostedMiners({ env, query, }) {
    return (0, core_1.gql) `
  query {
    ${(0, environment_tables_1.getHostedMinerGraphSchemaName)(env, {
        forManyDocuments: true,
    })}(query: ${JSON.stringify(query)}, limit: ${MAX_NUM_OF_MINER_IDS}) {
        API
        ipAddress
        friendlyMinerId
        miner {
          marketDetails {
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
exports.getHostedMiners = getHostedMiners;
//# sourceMappingURL=getHostedMiners.js.map