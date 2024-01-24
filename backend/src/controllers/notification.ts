import { Request, Response } from "express";

import { getAllNotifications } from "../model/notification";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    const { notifications } = await getAllNotifications(uid);
    res.status(200).json({ notifications });
  } catch (e) {
    res.status(500).json({ error: "Failed Getting notification" });
    console.error(e);
  }
};
