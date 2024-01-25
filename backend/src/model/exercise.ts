import { m_getOneOrUpdate, m_insertOne, m_getOne } from "./mongoDB";
import { updateWorkoutAll, wholeWorkoutData } from "../customTypes/exercise";

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
      exercise.trim().toUpperCase().replace(/\s/g, "")
    );
    update.remove = update.remove = update.remove.map((exercise) =>
      exercise.trim().toUpperCase().replace(/\s/g, "")
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

export const getExercises = async (uid: number, type: string) => {
  return (
    await m_getOne("coll_user_workout_types", { uid }, { [type]: 1, _id: 0 })
  )[type];
};
