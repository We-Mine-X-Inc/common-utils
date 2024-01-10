"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeKeys = void 0;
const removeKeys = (obj, keys) => obj !== Object(obj)
    ? obj
    : Array.isArray(obj)
        ? obj.map((item) => (0, exports.removeKeys)(item, keys))
        : Object.keys(obj)
            .filter((k) => !keys.includes(k))
            .reduce((acc, x) => Object.assign(acc, { [x]: (0, exports.removeKeys)(obj[x], keys) }), {});
exports.removeKeys = removeKeys;
//# sourceMappingURL=remove-keys.js.map