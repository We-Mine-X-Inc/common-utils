"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPools = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
function getPools({ env, query, }) {
    const schemaName = (0, environment_tables_1.getPoolGraphSchemaName)(env, {
        operationType: environment_tables_1.OperationType.FETCH,
        forManyDocuments: true,
    });
    const compatibleQuery = (0, json_manipulation_1.makeGraphQLInputCompatible)(query);
    return (0, client_1.gql) `
  query {
    ${schemaName}(query: ${compatibleQuery}) {
      friendlyPoolId
      domain
      protocol
      username
      poolType
      purpose
    }
  }
`;
}
exports.getPools = getPools;
//# sourceMappingURL=getPools.js.map