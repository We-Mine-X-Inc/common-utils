"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHostedMinersQuery = void 0;
const core_1 = require("@apollo/client/core");
const environment_tables_1 = require("../../environment-tables");
const MAX_NUM_OF_MINER_IDS = 600;
function getAllHostedMinersQuery(env) {
    return (0, core_1.gql) `
  query GetAllHostedMiners {
    ${(0, environment_tables_1.getHostedMinerGraphSchemaName)(env, {
        forManyDocuments: true,
    })}(query: {}, limit: ${MAX_NUM_OF_MINER_IDS}) {
        API
        ipAddress
        friendlyMinerId
    }
  }`;
}
exports.getAllHostedMinersQuery = getAllHostedMinersQuery;
//# sourceMappingURL=getAllHostedMiners.js.map