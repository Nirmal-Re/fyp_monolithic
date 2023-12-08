"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = require("lodash");
const config_1 = require("../constants/config");
const isAuthenticated = async (req, res, next) => {
    try {
        // get access_token from cookie
        const { access_token } = req.cookies;
        if (!access_token)
            return res.status(403).send({ error: "Not authenticated" });
        // verify access_token
        const { JWT_ACCESS_TOKEN_SECRET } = config_1.secrets;
        const { email, uid } = jsonwebtoken_1.default.verify(access_token, JWT_ACCESS_TOKEN_SECRET);
        if (!email || !uid)
            return res.status(403).send({ error: "Not authenticated" });
        (0, lodash_1.merge)(req.body, { uid });
        next();
    }
    catch (e) {
        console.log(e);
        res.status(403).send({ error: "Not authenticated" });
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map