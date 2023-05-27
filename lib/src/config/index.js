"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLACK_POOL_SWITCHING_ERROR_URL = exports.SLACK_POOL_SWITCHING_INFO_URL = exports.AGENDA_MAX_SINGLE_JOB_CONCURRENCY = exports.AGENDA_MAX_OVERALL_CONCURRENCY = exports.ORIGIN = exports.LOG_DIR = exports.LOG_FORMAT = exports.SECRET_KEY = exports.DB_CLUSTER = exports.DB_PASSWORD = exports.DB_IS_SRV = exports.DB_DATABASE = exports.DB_PORT = exports.DB_HOST = exports.PORT = exports.NODE_ENV = exports.CREDENTIALS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env["NODE_ENV"] || "dev"}.local` });
exports.CREDENTIALS = process.env["CREDENTIALS"] === "true";
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.PORT = _a.PORT, exports.DB_HOST = _a.DB_HOST, exports.DB_PORT = _a.DB_PORT, exports.DB_DATABASE = _a.DB_DATABASE, exports.DB_IS_SRV = _a.DB_IS_SRV, exports.DB_PASSWORD = _a.DB_PASSWORD, exports.DB_CLUSTER = _a.DB_CLUSTER, exports.SECRET_KEY = _a.SECRET_KEY, exports.LOG_FORMAT = _a.LOG_FORMAT, exports.LOG_DIR = _a.LOG_DIR, exports.ORIGIN = _a.ORIGIN, exports.AGENDA_MAX_OVERALL_CONCURRENCY = _a.AGENDA_MAX_OVERALL_CONCURRENCY, exports.AGENDA_MAX_SINGLE_JOB_CONCURRENCY = _a.AGENDA_MAX_SINGLE_JOB_CONCURRENCY, exports.SLACK_POOL_SWITCHING_INFO_URL = _a.SLACK_POOL_SWITCHING_INFO_URL, exports.SLACK_POOL_SWITCHING_ERROR_URL = _a.SLACK_POOL_SWITCHING_ERROR_URL;
//# sourceMappingURL=index.js.map