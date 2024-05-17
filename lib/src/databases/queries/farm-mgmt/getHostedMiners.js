"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostedMiners = void 0;
const core_1 = require("@apollo/client/core");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
const MAX_NUM_OF_MINER_IDS = 600;
function getHostedMiners({ env, query, }) {
    const schemaName = (0, environment_tables_1.getHostedMinerGraphSchemaName)(env, {
        operationType: environment_tables_1.OperationType.FETCH,
        forManyDocuments: true,
    });
    const compatibleQuery = (0, json_manipulation_1.makeGraphQLInputCompatible)(query);
    return (0, core_1.gql) `
  query {
    ${schemaName}(query: ${compatibleQuery}, limit: ${MAX_NUM_OF_MINER_IDS}, sortBy: FRIENDLYMINERID_ASC) {
      _id
      API
      ipAddress
      friendlyMinerId
      macAddress
      status {
        lastOnlineDate
        networkStatus
        poolIsBeingSwitched
        isFarmManaged
        operatingError
        operatingErrors
      }
      miner {
        marketDetails {
          model
          description
          efficiency
          wattage
          expectedHashrate
          coin {
            symbol
          }
        }
        operationDetails {
          expectedHashRateRange {
            minimum
            maximum
          }
          expectedFanSpeedRange {
            minimum
            maximum
          }
          expectedInletTempRange {
            minimum
            maximum
          }
          expectedOutletTempRange {
            minimum
            maximum
          }
        }
      }
      powerController {
        managementMetadata {
          friendlyPowerControllerId
        }
      }
    }
  }`;
}
exports.getHostedMiners = getHostedMiners;
//# sourceMappingURL=getHostedMiners.js.map