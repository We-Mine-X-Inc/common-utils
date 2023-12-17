"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMinerError = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function insertMinerError({ env, data, }) {
    return (0, client_1.gql) `
    mutation {
      insertOne${(0, environment_tables_1.getMinerErrorGraphSchemaName)(env, {
        embeddedInFunction: true,
    })}(data: ${JSON.stringify(data)}) {
        _id
        stackTrace
      }
    }
  `;
}
exports.insertMinerError = insertMinerError;
//# sourceMappingURL=insertMinerError.js.map