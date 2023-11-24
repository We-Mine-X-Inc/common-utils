"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function getCustomerById(env) {
    return (0, client_1.gql) `
  query GetCustomerById($customerId: ObjectId) {
    ${(0, environment_tables_1.getCustomerGraphSchemaName)(env)}(query: { _id: $customerId }) {
      notificationPreferences
    }
  }
`;
}
exports.getCustomerById = getCustomerById;
//# sourceMappingURL=getCustomerById.js.map