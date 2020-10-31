export const __prod__ = process.env.NODE_ENV == "prod";
export const DB_HOST =
  typeof process.env.DB_HOST == "string" ? process.env.DB_HOST : "NULL";
export const DB_NAME =
  typeof process.env.DB_NAME == "string" ? process.env.DB_NAME : "NULL";
export const DB_USER =
  typeof process.env.DB_USER == "string" ? process.env.DB_USER : "NULL";
export const DB_PASSWORD =
  typeof process.env.DB_PASSWORD == "string" ? process.env.DB_PASSWORD : "NULL";
export const DB_PORT =
  typeof process.env.DB_PORT == "string" ? parseInt(process.env.DB_PORT) : -1;
export const SERVER_PORT =
  typeof process.env.SERVER_PORT == "string"
    ? parseInt(process.env.SERVER_PORT)
    : -1;
export const CF_PRIVATE =
  typeof process.env.CF_PRIVATE == "string"
    ? process.env.CF_PRIVATE.replace(/\\n/gm, "\n")
    : "NULL";
export const CF_ACCESS =
  typeof process.env.CF_ACCESS == "string" ? process.env.CF_ACCESS : "NULL";
export const CF_PRIVATE_URL =
  typeof process.env.CF_PRIVATE_URL == "string"
    ? process.env.CF_PRIVATE_URL
    : "NULL";
export const CF_PUBLIC_URL =
  typeof process.env.CF_PUBLIC_URL == "string"
    ? process.env.CF_PUBLIC_URL
    : "NULL";
export const REDIS_URL =
  typeof process.env.REDIS_URL == "string" ? process.env.REDIS_URL : "NULL";
export const LOCAL_REDIS_URL = "127.0.0.1";
export const REDIS_PORT =
  typeof process.env.REDIS_PORT == "string"
    ? parseInt(process.env.REDIS_PORT)
    : -1;
export const COOKIE_NAME = "login_cookie"
export const COOKIE_SECRET =
  typeof process.env.COOKIE_SECRET == "string"
    ? process.env.COOKIE_SECRET
    : "NULL";
