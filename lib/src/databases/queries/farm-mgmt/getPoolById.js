"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoolById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function getPoolById({ env, query, }) {
    return (0, client_1.gql) `
  query {
    ${(0, environment_tables_1.getPoolGraphSchemaName)(env)}(query: ${query}) {
      
    }
  }
`;
}
exports.getPoolById = getPoolById;
//# sourceMappingURL=getPoolById.js.map