"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacilityMaintenanceJobs = void 0;
const core_1 = require("@apollo/client/core");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
const MAX_NUM_OF_FACILITY_IDS = 600;
function getFacilityMaintenanceJobs({ env, query, }) {
    const schemaName = (0, environment_tables_1.getFacilityMaintenanceJobGraphSchemaName)(env, {
        operationType: environment_tables_1.OperationType.FETCH,
        forManyDocuments: true,
    });
    const compatibleQuery = (0, json_manipulation_1.makeGraphQLInputCompatible)(query);
    return (0, core_1.gql) `
  query {
    ${schemaName}(query: ${compatibleQuery}, limit: ${MAX_NUM_OF_FACILITY_IDS}) {
      _id  
      startTime
      endTime
      durationBetweenInquiryPrompt
    }
  }`;
}
exports.getFacilityMaintenanceJobs = getFacilityMaintenanceJobs;
//# sourceMappingURL=getFacilityMaintenanceJobs.js.map