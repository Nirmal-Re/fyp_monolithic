"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./constants/config");
const router_1 = __importDefault(require("./router"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../.env") });
const conn = mysql2_1.default.createConnection({ ...config_1.DB_mysql });
// conn.ping((err) => {console.log("Error with connection",err)})
conn.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + conn.threadId);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true
}));
app.use(express_1.default.json());
app.use("/auth", (0, router_1.default)());
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/");
});
//    "dev": "concurrently \"tsc -w\" \"nodemon dist/server.js\""
//# sourceMappingURL=server.js.map