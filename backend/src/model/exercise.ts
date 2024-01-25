import { m_getOneOrUpdate } from "./mongoDB";

export const getWorkoutTypes = async (uid: number) => {
  return await m_getOneOrUpdate(
    "coll_user_workout_types",
    { uid },
    {
      $setOnInsert: {
        weight: { push: [], pull: [], legs: [] },
        time: { cardio: [] },
      },
    }
  );
};
