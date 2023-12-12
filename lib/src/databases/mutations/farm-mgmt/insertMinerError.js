"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMinerError = void 0;
const client_1 = require("@apollo/client");
function insertMinerError({ data }) {
    return (0, client_1.gql) `
    mutation {
      insertOneMinererror(data: ${data}) {
        _id
        stackTrace
      }
    }
  `;
}
exports.insertMinerError = insertMinerError;
//# sourceMappingURL=insertMinerError.js.map