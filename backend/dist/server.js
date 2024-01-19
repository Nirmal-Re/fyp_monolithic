"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/auth", (0, router_1.default)());
app.use("/user", (0, router_1.default)());
app.use("/logs", (0, router_1.default)());
app.use("/report", (0, router_1.default)());
app.listen(3000, () => {
    console.log("Server is running on http://localhost:4000/");
});
//    "dev": "concurrently \"tsc -w\" \"nodemon dist/server.js\""
//# sourceMappingURL=server.js.map