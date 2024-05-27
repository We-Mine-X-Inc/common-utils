"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardCustomers = void 0;
const core_1 = require("@apollo/client/core");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
const MAX_NUM_OF_CUSTOMER_IDS = 100;
function getDashboardCustomers({ env, query, }) {
    const schemaName = (0, environment_tables_1.getDashboardCustomerGraphSchemaName)(env, {
        operationType: environment_tables_1.OperationType.FETCH,
        forManyDocuments: true,
    });
    const compatibleQuery = (0, json_manipulation_1.makeGraphQLInputCompatible)(query);
    return (0, core_1.gql) `
  query {
    ${schemaName}(query: ${compatibleQuery}, limit: ${MAX_NUM_OF_CUSTOMER_IDS}) {
        _id
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
  }`;
}
exports.getDashboardCustomers = getDashboardCustomers;
//# sourceMappingURL=getDashboardCustomers.js.map