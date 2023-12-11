"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secrets = exports.DB_mongo = exports.DB_mysql = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
// SQL DB values
const { SQL_DB_HOST, SQL_DB_USER, SQL_DB_PASSWORD, SQL_DB_NAME, JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } = process.env;
if (!SQL_DB_HOST || !SQL_DB_USER || !SQL_DB_PASSWORD || !SQL_DB_NAME) {
    throw new Error("SQL database connection values are not defined");
}
exports.DB_mysql = {
    host: SQL_DB_HOST,
    user: SQL_DB_USER,
    password: SQL_DB_PASSWORD,
    database: SQL_DB_NAME,
};
// Mongo DB values
const { MONGO_DB_HOST, MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_NAME } = process.env;
if (!MONGO_DB_HOST || !MONGO_DB_USER || !MONGO_DB_PASSWORD || !MONGO_DB_NAME) {
    throw new Error("Mongo database connection values are not defined");
}
exports.DB_mongo = {
    host: MONGO_DB_HOST,
    user: MONGO_DB_USER,
    password: MONGO_DB_PASSWORD,
    database: MONGO_DB_NAME,
};
// JWT secrets
if (!JWT_ACCESS_TOKEN_SECRET || !JWT_REFRESH_TOKEN_SECRET) {
    throw new Error("JWT secrets not defined");
}
exports.secrets = {
    JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_SECRET
};
//# sourceMappingURL=config.js.map