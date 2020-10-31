"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_SECRET = exports.COOKIE_NAME = exports.REDIS_PORT = exports.LOCAL_REDIS_URL = exports.REDIS_URL = exports.CF_PUBLIC_URL = exports.CF_PRIVATE_URL = exports.CF_ACCESS = exports.CF_PRIVATE = exports.SERVER_PORT = exports.DB_PORT = exports.DB_PASSWORD = exports.DB_USER = exports.DB_NAME = exports.DB_HOST = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV == "prod";
exports.DB_HOST = typeof process.env.DB_HOST == "string" ? process.env.DB_HOST : "NULL";
exports.DB_NAME = typeof process.env.DB_NAME == "string" ? process.env.DB_NAME : "NULL";
exports.DB_USER = typeof process.env.DB_USER == "string" ? process.env.DB_USER : "NULL";
exports.DB_PASSWORD = typeof process.env.DB_PASSWORD == "string" ? process.env.DB_PASSWORD : "NULL";
exports.DB_PORT = typeof process.env.DB_PORT == "string" ? parseInt(process.env.DB_PORT) : -1;
exports.SERVER_PORT = typeof process.env.SERVER_PORT == "string"
    ? parseInt(process.env.SERVER_PORT)
    : -1;
exports.CF_PRIVATE = typeof process.env.CF_PRIVATE == "string"
    ? process.env.CF_PRIVATE.replace(/\\n/gm, "\n")
    : "NULL";
exports.CF_ACCESS = typeof process.env.CF_ACCESS == "string" ? process.env.CF_ACCESS : "NULL";
exports.CF_PRIVATE_URL = typeof process.env.CF_PRIVATE_URL == "string"
    ? process.env.CF_PRIVATE_URL
    : "NULL";
exports.CF_PUBLIC_URL = typeof process.env.CF_PUBLIC_URL == "string"
    ? process.env.CF_PUBLIC_URL
    : "NULL";
exports.REDIS_URL = typeof process.env.REDIS_URL == "string" ? process.env.REDIS_URL : "NULL";
exports.LOCAL_REDIS_URL = "127.0.0.1";
exports.REDIS_PORT = typeof process.env.REDIS_PORT == "string"
    ? parseInt(process.env.REDIS_PORT)
    : -1;
exports.COOKIE_NAME = "login_cookie";
exports.COOKIE_SECRET = typeof process.env.COOKIE_SECRET == "string"
    ? process.env.COOKIE_SECRET
    : "NULL";
//# sourceMappingURL=constants.js.map