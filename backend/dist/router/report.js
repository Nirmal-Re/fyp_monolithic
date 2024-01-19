"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const report_1 = require("../controllers/report");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get("/get-user-log-data", middlewares_1.isAuthenticated, report_1.getUserLogData);
};
//# sourceMappingURL=report.js.map