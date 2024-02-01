import { ObjectId } from "mongodb";
import { m_deleteMany, m_getOne, m_updateOne } from "./mongoDB";

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

export const getAllNotifications = async (uid: number) => {
  return await m_getOne("coll_notifications", { uid: uid });
};

export const deleteNotification = async (uid: number, nid: number) => {
  await m_updateOne(
    "coll_notifications",
    { uid: uid },
    { $unset: { [`notifications.${nid}`]: 1 } }
  );
  // Remove all null values from the array
  await m_updateOne(
    "coll_notifications",
    { uid: uid },
    { $pull: { notifications: null } }
  );
};
