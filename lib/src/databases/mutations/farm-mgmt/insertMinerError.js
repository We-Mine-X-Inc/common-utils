"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMinerError = void 0;
const client_1 = require("@apollo/client");
function insertMinerError() {
    return (0, client_1.gql) `
  mutation InsertOneMinerError(
    type: Int
    $environmentConfigId: ObjectId
    $poolSwitchErrorInfo: PoolSwitchErrorInfo
    $stackTrace: String
  ) {
    insertOneMinererror(
      data: {
        type: $type
        environmentConfigId: $environmentConfigId
        poolSwitchErrorInfo: $poolSwitchErrorInfo
        stackTrace: $stackTrace
      }) {
        _id
        stackTrace
    }
  }`;
}
exports.insertMinerError = insertMinerError;
//# sourceMappingURL=insertMinerError.js.map