"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function getContractById({ env, query, }) {
    return (0, client_1.gql) `
  query {
    ${(0, environment_tables_1.getContractGraphSchemaName)(env)}(query: ${query}) {
      hostingContract
    }
  }
`;
}
exports.getContractById = getContractById;
//# sourceMappingURL=getContractById.js.map