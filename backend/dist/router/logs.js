"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logs_1 = require("../controllers/logs");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.post("/add-daily-log", middlewares_1.isAuthenticated, logs_1.addDailyLog);
    router.get("/fetch-all-habits", middlewares_1.isAuthenticated, logs_1.fetchAllHabits);
    router.post("/add-new-habits", middlewares_1.isAuthenticated, logs_1.addNewHabits);
    router.get("/get-daily-log", middlewares_1.isAuthenticated, logs_1.getDailyLog);
};
//# sourceMappingURL=logs.js.map