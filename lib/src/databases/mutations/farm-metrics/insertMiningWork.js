"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMiningWork = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
const json_manipulation_1 = require("../../json-manipulation");
function insertMiningWork({ env, data, }) {
    const schemaName = (0, environment_tables_1.getMiningWorkGraphSchemaName)(env, {
        operationType: environment_tables_1.OperationType.INSERT,
        embeddedInFunction: true,
    });
    const compatibleMutation = (0, json_manipulation_1.makeGraphQLInputCompatible)(data);
    return (0, client_1.gql) `
    mutation {
      ${schemaName}(data: ${compatibleMutation}) {
        _id
      }
    }
  `;
}
exports.insertMiningWork = insertMiningWork;
//# sourceMappingURL=insertMiningWork.js.map