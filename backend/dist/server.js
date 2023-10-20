"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./model/db");
db_1.dbConnection;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("!");
});
app.post("/signup", (req, res) => {
    const { email, password } = req.body;
});
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/");
});
//# sourceMappingURL=server.js.map