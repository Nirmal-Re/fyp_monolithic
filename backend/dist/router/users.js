"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.post("/delete", middlewares_1.isAuthenticated, middlewares_1.isOwner, users_1.deleteUser);
    router.post("/update", middlewares_1.isAuthenticated, middlewares_1.isOwner, users_1.updateUser);
    return router;
};
//# sourceMappingURL=users.js.map