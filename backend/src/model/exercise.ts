import { m_getOneOrUpdate } from "./mongoDB";
import { updateWorkoutAll } from "../customTypes/exercise";

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
