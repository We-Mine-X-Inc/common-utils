"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNestedNullUndefined = exports.removeKeys = void 0;
function removeKeys(obj, keys) {
    const objCopy = Object.assign({}, obj);
    function innerRemoveKeys(obj, keys) {
        return obj !== Object(obj)
            ? obj
            : Array.isArray(obj)
                ? obj.map((item) => innerRemoveKeys(item, keys))
                : Object.keys(obj)
                    .filter((k) => !keys.includes(k))
                    .reduce((acc, x) => Object.assign(acc, { [x]: innerRemoveKeys(obj[x], keys) }), {});
    }
    return innerRemoveKeys(objCopy, keys);
}
exports.removeKeys = removeKeys;
function removeNestedNullUndefined(obj) {
    const objCopy = Object.assign({}, obj);
    function innerRemoveNestedNullUnfedined(obj) {
        for (const key in obj) {
            if (obj[key] === null || obj[key] === undefined) {
                delete obj[key];
            }
            else if (typeof obj[key] === "object") {
                innerRemoveNestedNullUnfedined(obj[key]);
            }
        }
    }
    innerRemoveNestedNullUnfedined(objCopy);
    return objCopy;
}
exports.removeNestedNullUndefined = removeNestedNullUndefined;
//# sourceMappingURL=remove-keys.js.map