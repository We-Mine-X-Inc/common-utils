"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoolById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
function getPoolById({ env, query, }) {
    const schemaName = (0, environment_tables_1.getPoolGraphSchemaName)(env);
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
exports.getPoolById = getPoolById;
//# sourceMappingURL=getPoolById.js.map