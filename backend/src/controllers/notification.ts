import { Request, Response } from "express";

import { getAllNotifications, deleteNotification } from "../model/notification";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    const nots = await getAllNotifications(uid);
    res.status(200).json({ notifications: nots });
  } catch (e) {
    res.status(500).json({ error: "Failed Getting notification" });
    console.error(e);
  }
};

export const deleteNotificationAPI = async (req: Request, res: Response) => {
  try {
    const { uid, nid } = req.body;
    console.log("Deleting notification: ", nid);
    if (!Number(nid) && Number(nid) < 0) {
      res.status(400).json({ error: "Invalid notification id" });
      return;
    }
    console.log("Deleted notification: ", nid);
    await deleteNotification(uid, nid);
  } catch (e) {
    res.status(500).json({ error: "Failed Deleting notification" });
    console.error(e);
  }
};
