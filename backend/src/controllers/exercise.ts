import { Request, Response } from "express";

import { getWorkoutTypes } from "../model/exercise";

export const addWorkout = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
export const updateWorkout = async (req: Request, res: Response) => {};
export const getWorkout = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    console.log(`GET-WORKOUT API CALLED BY USER ${uid}`);
    const { time, weight } = await getWorkoutTypes(uid);
    res.status(200).json({ time, weight });
  } catch (error) {}
};
export const addWorkoutData = async (req: Request, res: Response) => {};
