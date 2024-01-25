import { Request, Response } from "express";
import { getHabitStats } from "../model/dashboard";

export const getUserLogData = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    const stats = await getHabitStats(uid);
    return res.status(200).send(stats);
  } catch (e) {
    console.log("Error with adding daily log", e);
    res.status(400).send({ error: "Error with adding daily log" });
  }
};

export const getWorkoutHistoricData = async (req: Request, res: Response) => {};
