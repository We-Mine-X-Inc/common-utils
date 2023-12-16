"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHostedMinerById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function updateHostedMinerById({ env, query, updatedProperties, }) {
    return (0, client_1.gql) `
  mutation {
    updateOne${(0, environment_tables_1.getHostedMinerGraphSchemaName)(env, {
        embeddedInFunction: true,
    })}(query: ${JSON.stringify(query)}, set: ${JSON.stringify(updatedProperties)}) {
      API
      _id
      friendlyMinerId
      ipAddress
      macAddress
      owner
      serialNumber
      status {
        lastOnlineDate
        networkStatus
        poolIsBeingSwitched
      }
    }
  }
`;
}
exports.updateHostedMinerById = updateHostedMinerById;
//# sourceMappingURL=updateHostedMinerById.js.map