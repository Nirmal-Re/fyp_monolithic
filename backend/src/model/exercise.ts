import { ObjectId } from "mongodb";

import {
  m_getOneOrUpdate,
  m_insertOne,
  m_getOne,
  m_getAllItems,
  m_updateOne,
  m_runAggregation,
} from "./mongoDB";
import {
  updateWorkoutAll,
  wholeWorkoutData,
  WorkoutType,
} from "../customTypes/exercise";

export const getWorkoutTypes = async (uid: number) => {
  return await m_getOneOrUpdate(
    "coll_user_workout_types",
    { uid },
    {
      $setOnInsert: {
        push: [],
        pull: [],
        legs: [],
        cardio: [],
      },
    }
  );
};

export const updateWorkoutTypes = async (
  uid: number,
  toUpdate: updateWorkoutAll
) => {
  // Iterate over the toUpdate array
  let result = getWorkoutTypes(uid);
  for (const update of toUpdate) {
    // Add exercises to the array
    update.add = update.add = update.add.map((exercise) =>
      exercise.trim().toLowerCase()
    );
    update.remove = update.remove = update.remove.map((exercise) =>
      exercise.trim().toLowerCase()
    );
    await m_getOneOrUpdate(
      "coll_user_workout_types",
      { uid },
      { $addToSet: { [update.type]: { $each: update.add } } }
    );

    // Remove exercises from the array
    result = await m_getOneOrUpdate(
      "coll_user_workout_types",
      { uid },
      { $pull: { [update.type]: { $in: update.remove } } }
    );
  }
  return result;
};

export const updateWorkoutData = async (
  uid: number,
  data: wholeWorkoutData
) => {
  const entry = { uid, uploadDateAndTime: new Date(), ...data };
  return await m_insertOne("coll_workout_data", entry);
};

export const updateWorkoutLog = async (_id: string, log: any) => {
  return await m_updateOne(
    "coll_workout_data",
    { _id: new ObjectId(_id) },
    { $set: log }
  );
};

export const getExercises = async (uid: number, type: string) => {
  return (
    await m_getOne("coll_user_workout_types", { uid }, { [type]: 1, _id: 0 })
  )[type];
};

const calculateAverage = (data: any): number => {
  const exerciseAverages: number[] = [];
  let totalNoOfReps: number = 0;
  for (let i = 0; i < data.length; i++) {
    const all = data[i].sets.map((set: any) => {
      totalNoOfReps += set.reps;
      if (set?.weight) return set.weight * set.reps;
      return set.time * set.reps;
    });
    const total = all.reduce((a: number, b: number) => a + b, 0);
    const average = total / all.length;
    exerciseAverages.push(average);
  }
  const total = exerciseAverages.reduce((a: number, b: number) => a + b, 0);
  const averageWeightEachSet = total / exerciseAverages.length;
  const averageWeightEachRep = averageWeightEachSet / totalNoOfReps;
  return averageWeightEachRep || 0;
};

export const getHistoryWorkoutData = async (
  uid: number,
  start: Date,
  end: Date
) => {
  const types = ["push", "pull", "legs", "cardio"];
  const results: Record<string, WorkoutType> = {};
  for (const t of types) {
    const documents = await m_getAllItems(
      "coll_workout_data",
      { uid, type: t, uploadDateAndTime: { $gte: start, $lte: end } },
      { _id: 0, type: 1, uploadDateAndTime: 1, data: 1 },
      { uploadDateAndTime: 1 }
    );
    results[t] = {
      uploadDateAndTime: documents.map((doc) => doc.uploadDateAndTime),
      averageForEachDay: documents.map((doc) => calculateAverage(doc.data)),
    };
  }
  return results;
};

export const getWorkoutIDs = async (userId: string, type: string) => {
  const pipeline = [
    {
      $match: {
        uid: Number(userId),
        type: type,
      },
    },
    { $sort: { uploadDateAndTime: 1 } },
    {
      $project: {
        _id: 0,
        id: "$_id",
        uploadDateAndTime: 1,
      },
    },
  ];

  const result = await m_runAggregation("coll_workout_data", pipeline);
  return result;
};

export const getWorkoutByID = async (id: string) => {
  return await m_getOne("coll_workout_data", { _id: new ObjectId(id) });
};
