"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGraphQLInputCompatible = void 0;
function makeGraphQLInputCompatible(obj) {
    const json = JSON.stringify(obj);
    return json.replace(/"([^"\\]+)":/g, "$1:");
}
exports.makeGraphQLInputCompatible = makeGraphQLInputCompatible;
//# sourceMappingURL=json-manipulation.js.map