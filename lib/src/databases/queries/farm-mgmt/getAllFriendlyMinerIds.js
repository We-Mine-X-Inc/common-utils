"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMinersQuery = void 0;
const core_1 = require("@apollo/client/core");
const MAX_NUM_OF_MINER_IDS = 600;
exports.getAllMinersQuery = (0, core_1.gql) `
query GetAllMiners {
    miners(query: {}, limit: ${MAX_NUM_OF_MINER_IDS}) {
        API
        ipAddress
        friendlyMinerId
    }
  }`;
//# sourceMappingURL=getAllFriendlyMinerIds.js.map