"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNotification = exports.deletePastNotifications = void 0;
const mongoDB_1 = require("./mongoDB");
// export const addNotification = async (log: any) => {
//   return await m_insertOne("coll_logs", log);
// };
const deletePastNotifications = async () => {
    return await (0, mongoDB_1.m_deleteMany)("coll_notifications", {});
};
exports.deletePastNotifications = deletePastNotifications;
const addNotification = async (notification) => {
    return await (0, mongoDB_1.m_updateOne)("coll_notifications", { uid: notification.uid }, { $push: { notifications: notification.msg } }, { upsert: true });
};
exports.addNotification = addNotification;
//# sourceMappingURL=notification.js.map