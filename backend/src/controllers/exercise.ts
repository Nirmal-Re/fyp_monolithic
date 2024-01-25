import e, { Request, Response } from "express";

import { getWorkoutTypes, updateWorkoutTypes } from "../model/exercise";
import { updateWorkoutAll, wholeWorkoutData} from "../customTypes/exercise";

export const updateWorkout = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    console.log(`ADD-WORKOUT API CALLED BY USER ${uid}`);
    const toUpdate = req.body.update as updateWorkoutAll;
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
export const addWorkoutData = async (req: Request, res: Response) => {};
