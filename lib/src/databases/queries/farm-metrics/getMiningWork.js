"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMiningWorkByTimeSpanQuery = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
/* 12 possible switches in a day * 32 max days in a month */
const MIN_LIMIT_OF_WORK_RECORDS = 12 * 32;
function getMiningWorkByTimeSpanQuery({ env, query, }) {
    const schemaName = (0, environment_tables_1.getMiningWorkGraphSchemaName)(env, {
        operationType: environment_tables_1.OperationType.FETCH,
        forManyDocuments: true,
    });
    const compatibleQuery = (0, json_manipulation_1.makeGraphQLInputCompatible)(query);
    return (0, client_1.gql) `
  query {
  ${schemaName}(query: ${compatibleQuery}, limit: ${MIN_LIMIT_OF_WORK_RECORDS}, sortBy: TIME_ASC) {
        hashRate
        time
		    totalEnergyConsumption
        isOperational
		    hostedMinerByFriendlyId {
          _id
          friendlyMinerId
          ipAddress
          owner {
            email
          }
          miner {
            marketDetails {
              coin {
                coinType
              }
            }
          }
        }
		    poolByFriendlyId {
          username
        }
    }
  }`;
}
exports.getMiningWorkByTimeSpanQuery = getMiningWorkByTimeSpanQuery;
//# sourceMappingURL=getMiningWork.js.map