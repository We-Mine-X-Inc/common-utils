"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMiningWork = void 0;
const client_1 = require("@apollo/client");
exports.insertMiningWork = (0, client_1.gql) `
  query InsertMiningWork(
    $hashrate: Int
    $isOnline: Boolean
    $friendlyMinerId: String
    $friendlyPoolId: String
    $timeISOString: DateTime
    $totalEnergyConsumption: Int
  ) {
    mutation(
      data: {
        hashRate: $hashrate
        isOnline: $isOnline
        minerByFriendlyId: { link: $friendlyMinerId }
        poolByFriendlyId: { link: $friendlyPoolId }
        time: $timeISOString
        totalEnergyConsumption: $totalEnergyConsumption
      }
    )
  }
`;
//# sourceMappingURL=insertMiningWork.js.map