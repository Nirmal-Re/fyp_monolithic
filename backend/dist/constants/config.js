"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_mysql = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
// export const DB_mongo:DB_Interface = {
//     host: "mongodb://localhost:27017",
//     user: "root",
//     // name: "test",
//     password: ""
// };
const { SQL_DB_HOST, SQL_DB_USER, SQL_DB_PASSWORD, SQL_DB_NAME } = process.env;
exports.DB_mysql = {
    host: SQL_DB_HOST || "localhost",
    user: SQL_DB_USER || "root",
    password: SQL_DB_PASSWORD || "password",
    database: SQL_DB_NAME || "cn_habit_tracker",
};
//# sourceMappingURL=config.js.map