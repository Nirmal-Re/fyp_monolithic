"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.post("/register", authentication_1.register);
    router.post("/login", authentication_1.login);
    router.post("/logout", middlewares_1.isAuthenticated, authentication_1.logout);
};
//# sourceMappingURL=authentication.js.map