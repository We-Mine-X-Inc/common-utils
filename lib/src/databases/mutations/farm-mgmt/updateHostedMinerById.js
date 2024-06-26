"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHostedMinerById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
const utils_1 = require("../../../../utils");
function updateHostedMinerById({ env, query, updatedProperties, }) {
    const schemaName = (0, environment_tables_1.getHostedMinerGraphSchemaName)(env, {
        operationType: environment_tables_1.OperationType.UPDATE,
        embeddedInFunction: true,
    });
    const compatibleQuery = (0, json_manipulation_1.makeGraphQLInputCompatible)(query);
    const compatibleMutation = (0, json_manipulation_1.makeGraphQLInputCompatible)((0, utils_1.removeNestedNullUndefined)(updatedProperties));
    return (0, client_1.gql) `
  mutation {
    ${schemaName}(query: ${compatibleQuery}, set: ${compatibleMutation}) {
      API
      _id
      friendlyMinerId
      ipAddress
      macAddress
      status {
        lastOnlineDate
        networkStatus
        poolIsBeingSwitched
        isFarmManaged
        operatingError
        operatingErrors
      }
    }
  }
`;
}
exports.updateHostedMinerById = updateHostedMinerById;
//# sourceMappingURL=updateHostedMinerById.js.map