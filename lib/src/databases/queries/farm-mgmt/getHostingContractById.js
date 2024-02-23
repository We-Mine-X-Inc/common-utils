"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostingContractById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
function getHostingContractById({ env, query, }) {
    const schemaName = (0, environment_tables_1.getHostingContractGraphSchemaName)(env);
    const compatibleQuery = (0, json_manipulation_1.makeGraphQLInputCompatible)(query);
    return (0, client_1.gql) `
  query {
    ${schemaName}(query: ${compatibleQuery}) {
      minerIntakeStage
      poolActivity {
        expectedActivePoolIndex
      }
      poolMiningOptions {
        poolId
      }
    }
  }
`;
}
exports.getHostingContractById = getHostingContractById;
//# sourceMappingURL=getHostingContractById.js.map