"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertFacilityMaintenanceJob = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
function insertFacilityMaintenanceJob({ env, data, }) {
    const schemaName = (0, environment_tables_1.getFacilityMaintenanceJobGraphSchemaName)(env, {
        embeddedInFunction: true,
    });
    const compatibleMutation = (0, json_manipulation_1.makeGraphQLInputCompatible)(data);
    return (0, client_1.gql) `
    mutation {
      insertOne${schemaName}(data: ${compatibleMutation}) {
        _id
        startTime
        endTime
        durationBetweenInquiryPrompt
      }
    }
  `;
}
exports.insertFacilityMaintenanceJob = insertFacilityMaintenanceJob;
//# sourceMappingURL=insertFacilityMaintenanceJob.js.map