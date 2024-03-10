"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNestedNullUndefined = exports.removeKeys = void 0;
function removeKeys(obj, keys) {
    return (obj, keys) => obj !== Object(obj)
        ? obj
        : Array.isArray(obj)
            ? obj.map((item) => removeKeys(item, keys))
            : Object.keys(obj)
                .filter((k) => !keys.includes(k))
                .reduce((acc, x) => Object.assign(acc, { [x]: removeKeys(obj[x], keys) }), {});
}
exports.removeKeys = removeKeys;
function removeNestedNullUndefined(obj) {
    for (const key in obj) {
        if (obj[key] === null || obj[key] === undefined) {
            delete obj[key];
        }
        else if (typeof obj[key] === "object") {
            removeNestedNullUndefined(obj[key]);
        }
    }
}
exports.removeNestedNullUndefined = removeNestedNullUndefined;
//# sourceMappingURL=remove-keys.js.map