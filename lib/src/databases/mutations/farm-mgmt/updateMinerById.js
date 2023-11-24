"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMinerById = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function updateMinerById(env, updatedProperties) {
    return (0, client_1.gql) `
  mutation UpdateMinerById($minerId: ObjectId) {
    updateOne${(0, environment_tables_1.getMinerGraphSchemaName)(env, {
        embeddedInFunction: true,
    })}(query: {_id: $minerId}, set: ${updatedProperties}) {
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
exports.updateMinerById = updateMinerById;
//# sourceMappingURL=updateMinerById.js.map