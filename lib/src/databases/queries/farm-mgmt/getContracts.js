"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContracts = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function getContracts({ env, query, }) {
    return (0, client_1.gql) `
  query {
    ${(0, environment_tables_1.getContractGraphSchemaName)(env, {
        forManyDocuments: true,
    })}(query: ${query}) {
        minerIntakeStage
        hostingContract
        poolActivity
    }
  }
`;
}
exports.getContracts = getContracts;
//# sourceMappingURL=getContracts.js.map