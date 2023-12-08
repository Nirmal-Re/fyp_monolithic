"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.delete("/delete", middlewares_1.isAuthenticated, users_1.deleteUser);
    router.post("/update", middlewares_1.isAuthenticated, users_1.updateUser);
    router.post("/change-password", middlewares_1.isAuthenticated, users_1.changePassword);
    return router;
};
//# sourceMappingURL=users.js.map