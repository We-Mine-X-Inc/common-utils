"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMinerError = void 0;
const client_1 = require("@apollo/client");
function insertMinerError(minerError) {
    const newMinerError = Object.assign(Object.assign({}, minerError), { _id: undefined });
    return (0, client_1.gql) `
  mutation InsertOneMiningWork {
    insertOneMinererror(
      data: ${Object.assign({}, newMinerError)}) {
        _id
        stackTrace
    }
  }`;
}
exports.insertMinerError = insertMinerError;
//# sourceMappingURL=insertMinerError.js.map