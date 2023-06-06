"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
function sendNotification(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield (0, axios_1.default)(params.url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: { text: params.text },
        });
    });
}
exports.sendNotification = sendNotification;
//# sourceMappingURL=index.js.map