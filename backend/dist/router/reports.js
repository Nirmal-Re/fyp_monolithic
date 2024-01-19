"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reports_1 = require("../controllers/reports");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get("/get-user-log-data", middlewares_1.isAuthenticated, reports_1.getUserLogData);
};
//# sourceMappingURL=reports.js.map