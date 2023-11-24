"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMinerById = void 0;
const client_1 = require("@apollo/client");
exports.updateMinerById = (0, client_1.gql) `
  query UpdateMinerById($minerId: ObjectId) {
    mutation(
      data: {
        
      }
    )
  }
`;
//# sourceMappingURL=updateMinerById.js.map