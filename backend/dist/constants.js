"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCAL_REDIS_URL = exports.REDIS_URL = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV == "prod";
exports.REDIS_URL = typeof process.env.REDIS_URL == "string" ? process.env.REDIS_URL : "NULL";
exports.LOCAL_REDIS_URL = "127.0.0.1";
//# sourceMappingURL=constants.js.map