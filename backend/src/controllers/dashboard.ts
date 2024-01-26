import { Request, Response } from "express";

import { convertDates, validDates } from "../helpers";
import { getHabitStats } from "../model/logs";
import { getHistoryWorkoutData } from "../model/exercise";

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
    const { uid, start, end } = req.body;
    const [startDate, endDate] = convertDates(start, end);
    if (!validDates(startDate, endDate)) {
      console.log(startDate, endDate);
      return res.status(400).send({ error: "Invalid dates" });
    }
    const data = await getHistoryWorkoutData(uid, startDate, endDate);
    return res.status(200).send({ data });
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) res.status(400).send({ error: e.message });
    else res.status(400).send({ error: "Error with getting historic data" });
  }
};
