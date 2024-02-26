"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
function updateCustomerById({ env, query, updatedProperties, }) {
    const schemaName = (0, environment_tables_1.getCustomerGraphSchemaName)(env, {
        embeddedInFunction: true,
    });
    const compatibleQuery = (0, json_manipulation_1.makeGraphQLInputCompatible)(query);
    const compatibleMutation = (0, json_manipulation_1.makeGraphQLInputCompatible)(updatedProperties);
    return (0, client_1.gql) `
  mutation {
    updateOne${schemaName}(query: ${compatibleQuery}, set: ${compatibleMutation}) {
        notificationPreferences
    }
  }
`;
}
exports.updateCustomerById = updateCustomerById;
//# sourceMappingURL=updateCustomerById.js.map