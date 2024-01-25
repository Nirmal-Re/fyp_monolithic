import { ObjectId } from "mongodb";

import { startAndEndOfDay } from "../helpers";
import {
  m_getOne,
  m_insertOne,
  m_deleteOne,
  m_updateOne,
  m_runAggregation,
} from "./mongoDB";

//Log type declaration
interface Log {
  uid: number;
  uploadDateAndTime: Date;
  [key: string]: number | Date | boolean | string;
}

export const addLog = async (log: any) => {
  return await m_insertOne("coll_logs", log);
};

const createTodaysLog = async (uid: number) => {
  const { habits } = (await getHabits(uid)) as { habits: Array<string> };
  const log = { uid, uploadDateAndTime: new Date() } as Log;
  for (let i = 0; i < habits.length; i++) {
    log[habits[i]] = false;
  }
  return log;
};

//TODO: need to make this ever better. It needs to be able to update if new habits have been added today.
export const getTodaysLog = async (
  uid: number,
  startOfDay: Date,
  endOfDay: Date
) => {
  const result = await m_getOne("coll_logs", {
    uid,
    uploadDateAndTime: { $gte: startOfDay, $lte: endOfDay },
  });
  if (result) return result;
  await addLog(await createTodaysLog(uid));
  const secondResults = await m_getOne("coll_logs", {
    uid,
    uploadDateAndTime: { $gte: startOfDay, $lte: endOfDay },
  });
  // console.log({ uid, uploadDateAndTime:{$gte:startOfDay, $lte:startOfDay} })
  return secondResults;
};

export const updateLog = async (_id: string, log: any) => {
  return await m_updateOne(
    "coll_logs",
    { _id: new ObjectId(_id) },
    { $set: log }
  );
};

export const getHabits = async (uid: number) => {
  const result = await m_getOne("coll_user_habits", { uid });
  if (result) return { habits: result.habits };
  await createHabits(uid);
  const secondResults = await m_getOne("coll_user_habits", { uid });
  return { habits: secondResults.habits };
};

export const createHabits = async (uid: number) => {
  return await m_insertOne("coll_user_habits", { uid, habits: [] });
};

export const updateHabits = async (data: {
  uid: number;
  newHabits: Array<string>;
}) => {
  const { uid, newHabits } = data;
  await m_updateOne(
    "coll_user_habits",
    { uid },
    { $addToSet: { habits: { $each: newHabits } } }
  );
  const [startOfDay, endOfDay] = startAndEndOfDay();
  const todaysLog = (await getTodaysLog(uid, startOfDay, endOfDay)) as Log;
  const { _id } = todaysLog;
  for (let i = 0; i < newHabits.length; i++) {
    if (!todaysLog?.[newHabits[i]]) {
      todaysLog[newHabits[i]] = false;
    }
  }
  delete todaysLog._id;
  return await updateLog(String(_id), todaysLog);
};

export const getLogById = async (id: string) => {
  return await m_getOne("coll_logs", { _id: new ObjectId(id) });
};

export const deleteLog = async (id: string) => {
  return await m_deleteOne("coll_logs", { id });
};

export const getHabitStats = async (userId: string): Promise<any[]> => {
  const pipeline = [
    { $match: { uid: Number(userId) } },
    { $sort: { uploadDateAndTime: 1 } },
    {
      $project: {
        _id: 0,
        uploadDateAndTime: 1,
        NoOfTrue: {
          $size: {
            $filter: {
              input: { $objectToArray: "$$ROOT" },
              cond: { $eq: ["$$this.v", true] },
            },
          },
        },
        NoOfFalse: {
          $size: {
            $filter: {
              input: { $objectToArray: "$$ROOT" },
              cond: { $eq: ["$$this.v", false] },
            },
          },
        },
      },
    },
  ];
  const result = await m_runAggregation("coll_logs", pipeline);
  return result;
};

export const getTodaysUids = async () => {
  const [startOfDay, endOfDay] = startAndEndOfDay();
  const pipeline = [
    { $match: { uploadDateAndTime: { $gte: startOfDay, $lte: endOfDay } } },
    { $project: { _id: 0, uid: "$uid" } },
  ];
  const result = await m_runAggregation("coll_logs", pipeline);
  const uids = result.map((item) => item.uid);
  return uids;
};
