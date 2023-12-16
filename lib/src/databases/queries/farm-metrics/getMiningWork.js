"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMiningWorkByTimeSpanQuery = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
/* 12 possible switches in a day * 32 max days in a month */
const MIN_LIMIT_OF_WORK_RECORDS = 12 * 32;
function getMiningWorkByTimeSpanQuery({ env, query, }) {
    return (0, client_1.gql) `
  query {
  ${(0, environment_tables_1.getMiningWorkGraphSchemaName)(env, {
        forManyDocuments: true,
    })}(query: ${JSON.stringify(query)}, limit: ${MIN_LIMIT_OF_WORK_RECORDS}, sortBy: TIME_ASC) {
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
}
exports.getMiningWorkByTimeSpanQuery = getMiningWorkByTimeSpanQuery;
//# sourceMappingURL=getMiningWork.js.map