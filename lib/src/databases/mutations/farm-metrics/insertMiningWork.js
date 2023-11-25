"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMiningWork = void 0;
const client_1 = require("@apollo/client");
const environment_tables_1 = require("../../environment-tables");
function insertMiningWork(env, miningWork) {
    const newMiningWork = Object.assign(Object.assign({}, miningWork), { _id: undefined });
    return (0, client_1.gql) `
  mutation InsertOneMiningWork {
    insertOne${(0, environment_tables_1.getMiningWorkGraphSchemaName)(env, {
        embeddedInFunction: true,
    })}(
      data: ${Object.assign({}, newMiningWork)}) {
        _id
    }
  }`;
}
exports.insertMiningWork = insertMiningWork;
//# sourceMappingURL=insertMiningWork.js.map