"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMinersQuery = void 0;
const core_1 = require("@apollo/client/core");
const environment_tables_1 = require("../../environment-tables");
const MAX_NUM_OF_MINER_IDS = 600;
function getAllMinersQuery(env) {
    return (0, core_1.gql) `
  query GetAllMiners {
    ${(0, environment_tables_1.getMinerGraphSchemaName)(env, {
        forManyDocuments: true,
    })}(query: {}, limit: ${MAX_NUM_OF_MINER_IDS}) {
        API
        ipAddress
        friendlyMinerId
    }
  }`;
}
exports.getAllMinersQuery = getAllMinersQuery;
//# sourceMappingURL=getAllFriendlyMinerIds.js.map