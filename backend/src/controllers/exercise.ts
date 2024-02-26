import e, { Request, Response } from "express";

import { isValidWorkoutData } from "../helpers";
import {
  getWorkoutTypes,
  updateWorkoutTypes,
  updateWorkoutData,
  getWorkoutIDs,
  getWorkoutByID,
  updateWorkoutLog,
} from "../model/exercise";
import { updateWorkoutAll, wholeWorkoutData } from "../customTypes/exercise";

export const updateWorkout = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    console.log(`ADD-WORKOUT API CALLED BY USER ${uid}`);
    const toUpdate: updateWorkoutAll = req.body.update;
    console.log(toUpdate);
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
    const toUpdate = req.body.update;

    //Vaidate the data and also changes the exercise names to uppercase
    if (!(await isValidWorkoutData(uid, toUpdate)))
      return res.status(400).json({ error: "Invalid workout data" });

    if (toUpdate?._id) {
      const id = toUpdate._id;
      delete toUpdate._id;
      toUpdate.uploadDateAndTime = new Date(toUpdate.uploadDateAndTime);
      const upd = await updateWorkoutLog(id, toUpdate);
      return res.status(200).json({ update: upd });
    }

    const upd = await updateWorkoutData(uid, toUpdate);
    res.status(200).json({ update: upd });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//new thing
export const getWorkoutIDsController = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    const type = req.params.type;
    if (!type) return res.status(400).send({ error: "No type provided" });
    const value = await getWorkoutIDs(uid, type);
    return res.status(200).json(value);
  } catch (e) {
    console.log("Error with getting asked logs", e);
    res.status(400).send({ error: "Error with getting asked logs" });
  }
};

export const getWorkoutByIDController = async (req: Request, res: Response) => {
  try {
    const workoutID = req.params.id;
    if (!workoutID)
      return res.status(400).send({ error: "No workout id provided" });
    const value = await getWorkoutByID(workoutID);
    return res.status(200).json(value);
  } catch (e) {
    console.log("Error with getting log by id", e);
    res.status(400).send({ error: "Error with getting log by id" });
  }
};
