"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardCustomerById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
function getDashboardCustomerById({ env, query, }) {
    const schemaName = (0, environment_tables_1.getDashboardCustomerGraphSchemaName)(env);
    const compatibleQuery = (0, json_manipulation_1.makeGraphQLInputCompatible)(query);
    return (0, client_1.gql) `
  query {
    ${schemaName}(query: ${compatibleQuery}) {
        _id
        farmProfile {
            _id
            email
            firstName
            lastName
            phoneNumber
            address
            isCompanyCustomer
        }
        notificationPreferences {
            minerStatusChangeNotifPreference {
                shouldReceiveEmail
            }
            poolChangeNotifPreference {
                shouldReceiveEmail
            }
            remainingTimeNotifPreference {
                shouldReceiveEmail
            }
        }
    }
  }
`;
}
exports.getDashboardCustomerById = getDashboardCustomerById;
//# sourceMappingURL=getDashboardCustomerById.js.map