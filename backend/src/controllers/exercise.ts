import e, { Request, Response } from "express";

import { isValidWorkoutData } from "../helpers";
import {
  getWorkoutTypes,
  updateWorkoutTypes,
  updateWorkoutData,
} from "../model/exercise";
import { updateWorkoutAll, wholeWorkoutData } from "../customTypes/exercise";

export const updateWorkout = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    console.log(`ADD-WORKOUT API CALLED BY USER ${uid}`);
    const toUpdate: updateWorkoutAll = req.body.update;
    const { push, pull, legs, cardio } = await updateWorkoutTypes(
      uid,
      toUpdate
    );
    res.status(200).json({ push, pull, legs, cardio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// export const updateWorkout = async (req: Request, res: Response) => {};

export const getWorkout = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    console.log(`GET-WORKOUT API CALLED BY USER ${uid}`);
    const { push, pull, legs, cardio } = await getWorkoutTypes(uid);
    res.status(200).json({ push, pull, legs, cardio });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const addWorkoutData = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    console.log(`ADD-WORKOUT API CALLED BY USER ${uid}`);
    const toUpdate = req.body.update as wholeWorkoutData;

    //Vaidate the data and also changes the exercise names to uppercase
    if (!(await isValidWorkoutData(uid, toUpdate)))
      return res.status(400).json({ error: "Invalid workout data" });
    console.log(toUpdate);
    const d = await updateWorkoutData(uid, toUpdate);
    res.status(200).json({ d });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
