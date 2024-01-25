import { Request, Response } from "express";
import { getHabitStats } from "../model/logs";

export const getUserLogData = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    const stats = await getHabitStats(uid);
    return res.status(200).send(stats);
  } catch (e) {
    res.status(400).send({ error: "Error with getting historic log data" });
  }
};

export const getWorkoutHistoricData = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    return res.status(200).send({});
  } catch (e) {
    console.log("Error with adding daily log", e);
    res.status(400).send({ error: "Error with getting historic workout data" });
  }
};
