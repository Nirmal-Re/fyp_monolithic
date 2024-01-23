"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../controllers/dashboard");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get("/get-user-report-data", middlewares_1.isAuthenticated, dashboard_1.getUserLogData);
};
//# sourceMappingURL=dashboard.js.map