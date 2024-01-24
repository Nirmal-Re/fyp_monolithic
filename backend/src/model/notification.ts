import { ObjectId } from "mongodb";
import { m_deleteMany, m_updateOne } from "./mongoDB";

// export const addNotification = async (log: any) => {
//   return await m_insertOne("coll_logs", log);
// };

export const deletePastNotifications = async () => {
  return await m_deleteMany("coll_notifications", {});
};

export const addNotification = async (notification: any) => {
  return await m_updateOne(
    "coll_notifications",
    { uid: notification.uid },
    { $push: { notifications: notification.msg } },
    { upsert: true }
  );
};
