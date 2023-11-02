"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
exports.default = (router) => {
    router.post("/register", authentication_1.register);
    router.post("/login", authentication_1.login);
};
//# sourceMappingURL=authentication.js.map