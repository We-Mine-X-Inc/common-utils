"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostingContracts = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
function getHostingContracts({ env, query, }) {
    const schemaName = (0, environment_tables_1.getHostingContractGraphSchemaName)(env, {
        operationType: environment_tables_1.OperationType.FETCH,
        forManyDocuments: true,
    });
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
exports.getHostingContracts = getHostingContracts;
//# sourceMappingURL=getHostingContracts.js.map