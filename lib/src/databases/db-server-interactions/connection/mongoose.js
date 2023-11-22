"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildConnections = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
function buildConnections({ defaultDatabaseUrl, databaseNames, }) {
    mongoose_1.default.connect(defaultDatabaseUrl);
    const databaseConigs = {};
    databaseNames.forEach((dbName) => {
        databaseConigs[dbName] = () => {
            return mongoose_1.default.connection.useDb(dbName);
        };
    });
    return databaseConigs;
}
exports.buildConnections = buildConnections;
//# sourceMappingURL=mongoose.js.map