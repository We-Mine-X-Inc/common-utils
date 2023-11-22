"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMiningWorkByTimeSpanQuery = void 0;
const client_1 = require("@apollo/client");
/* 12 possible switches in a day * 32 max days in a month */
const MIN_LIMIT_OF_WORK_RECORDS = 12 * 32;
exports.getMiningWorkByTimeSpanQuery = (0, client_1.gql) `
query GetMiningWorkByTimeSpan($startTimeISOString: DateTime, $endTimeISOString: DateTime, $limit: Int = ${MIN_LIMIT_OF_WORK_RECORDS}) {
    miningworks(query: {time_gte: $startTimeISOString, time_lt: $endTimeISOString}, limit: $limit, sortBy: TIME_ASC) {
        hashRate
		    minerByFriendlyId {
          _id
          ipAddress
        }
		    poolByFriendlyId {
          username
        }
		    time
		    totalEnergyConsumption
        isOnline
    }
  }`;
//# sourceMappingURL=getMiningWork.js.map