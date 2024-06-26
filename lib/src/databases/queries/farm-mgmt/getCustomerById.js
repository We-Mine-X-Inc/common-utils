"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
function getCustomerById({ env, query, }) {
    const schemaName = (0, environment_tables_1.getCustomerGraphSchemaName)(env);
    const compatibleQuery = (0, json_manipulation_1.makeGraphQLInputCompatible)(query);
    return (0, client_1.gql) `
  query {
    ${schemaName}(query: ${compatibleQuery}) {
      _id
    }
  }
`;
}
exports.getCustomerById = getCustomerById;
//# sourceMappingURL=getCustomerById.js.map