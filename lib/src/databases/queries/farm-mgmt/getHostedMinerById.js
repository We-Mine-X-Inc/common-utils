"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostedMinerById = void 0;
const core_1 = require("@apollo/client/core");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
function getHostedMinerById({ env, query, }) {
    const schemaName = (0, environment_tables_1.getHostedMinerGraphSchemaName)(env);
    const compatibleQuery = (0, json_manipulation_1.makeGraphQLInputCompatible)(query);
    return (0, core_1.gql) `
  query {
    ${schemaName}(query: ${compatibleQuery}) {
      _id
      API
      ipAddress
      macAddress
      friendlyMinerId
      status {
        lastOnlineDate
        networkStatus
        poolIsBeingSwitched
        isFarmManaged
      }
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
exports.getHostedMinerById = getHostedMinerById;
//# sourceMappingURL=getHostedMinerById.js.map