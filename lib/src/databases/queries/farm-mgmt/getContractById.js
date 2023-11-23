"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function getContractById(env) {
    return (0, client_1.gql) `
  query GetContractById($contractId: String) {
    ${(0, environment_tables_1.getContractGraphSchemaName)(env)}(query: { _id: $contractId }) {
      hostingContract
    }
  }
`;
}
exports.getContractById = getContractById;
//# sourceMappingURL=getContractById.js.map