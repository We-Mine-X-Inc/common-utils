"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMiningWork = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function insertMiningWork(env) {
    return (0, client_1.gql) `
  mutation InsertOneMiningWork(
    $hashrate: Int
    $isOnline: Boolean
    $friendlyMinerId: String
    $friendlyPoolId: String
    $timeISOString: DateTime
    $totalEnergyConsumption: Int
  ) {
    insertOne${(0, environment_tables_1.getMiningWorkGraphSchemaName)(env, {
        embeddedInFunction: true,
    })}(
      data: {
        hashRate: $hashrate
        isOnline: $isOnline
        minerByFriendlyId: { link: $friendlyMinerId }
        poolByFriendlyId: { link: $friendlyPoolId }
        time: $timeISOString
        totalEnergyConsumption: $totalEnergyConsumption
      }) {
        _id
    }
  }`;
}
exports.insertMiningWork = insertMiningWork;
//# sourceMappingURL=insertMiningWork.js.map