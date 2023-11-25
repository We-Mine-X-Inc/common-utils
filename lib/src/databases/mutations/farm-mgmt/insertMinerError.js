"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMinerError = void 0;
const client_1 = require("@apollo/client");
function insertMinerError(minerError) {
    return (0, client_1.gql) `
  mutation InsertOneMiningWork {
    insertOneMinererror(
      data: ${Object.assign({}, minerError)}) {
        _id
        stackTrace
    }
  }`;
}
exports.insertMinerError = insertMinerError;
//# sourceMappingURL=insertMinerError.js.map