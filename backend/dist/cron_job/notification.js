"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const logs_1 = require("../model/logs");
const notification_1 = require("../model/notification");
// Run once a day at 23:59
node_cron_1.default.schedule("55 23 * * *", async () => {
    (0, notification_1.deletePastNotifications)();
});
node_cron_1.default.schedule("59 * * * * *", async () => {
    console.log("Generating notifications...");
    // Get all users
    const users = await (0, logs_1.getTodaysUids)();
    // Generate a notification for each user
    for (const user of users) {
        const notification = {
            uid: user,
            msg: "This is your hourly notification",
        };
        (0, notification_1.addNotification)(notification);
    }
});
//# sourceMappingURL=notification.js.map