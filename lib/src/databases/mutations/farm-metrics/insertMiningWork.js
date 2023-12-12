"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMiningWork = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function insertMiningWork({ env, data, }) {
    return (0, client_1.gql) `
  mutation {
    insertOne${(0, environment_tables_1.getMiningWorkGraphSchemaName)(env, {
        embeddedInFunction: true,
    })}(data: ${data}) {
        _id
    }
  }`;
}
exports.insertMiningWork = insertMiningWork;
//# sourceMappingURL=insertMiningWork.js.map