"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoolById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function getPoolById(env) {
    return (0, client_1.gql) `
  query GetPoolById($poolId: String) {
    ${(0, environment_tables_1.getPoolGraphSchemaName)(env)}(query: { _id: $poolId }) {
      
    }
  }
`;
}
exports.getPoolById = getPoolById;
//# sourceMappingURL=getPoolById.js.map