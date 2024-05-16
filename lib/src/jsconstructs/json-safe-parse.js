"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonSafeParse = void 0;
function jsonSafeParse(jsonString) {
    try {
        return JSON.parse(jsonString);
    }
    catch (error) {
        return {};
    }
}
exports.jsonSafeParse = jsonSafeParse;
//# sourceMappingURL=json-safe-parse.js.map