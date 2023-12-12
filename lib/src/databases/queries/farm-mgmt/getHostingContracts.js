"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostingContracts = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function getHostingContracts({ env, query, }) {
    return (0, client_1.gql) `
  query {
    ${(0, environment_tables_1.getHostingContractGraphSchemaName)(env, {
        forManyDocuments: true,
    })}(query: ${query}) {
        minerIntakeStage
        hostingContract
        poolActivity
    }
  }
`;
}
exports.getHostingContracts = getHostingContracts;
//# sourceMappingURL=getHostingContracts.js.map