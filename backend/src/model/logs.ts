import { start } from "repl";
import { m_getOne, m_insertOne, m_deleteOne, m_updateOne } from "./mongoDB";

//Log type declaration
interface Log {
  uid: number;
  uploadDateAndTime: Date;
  [key: string]: number | Date | boolean;
}


export const addLog = async (log: any) => {
  return await m_insertOne("coll_logs", log);
}

const createTodaysLog = async (uid: number) => {
  const {habits} = await getHabits(uid) as {habits: Array<string>};
  const log = { uid, uploadDateAndTime: new Date() } as Log;
  for (let i = 0; i < habits.length; i++) {
    log[habits[i]] = false;
  }
  return log;
}


//TODO: need to make this ever better. It needs to be able to update if new habits have been added today.
export const getTodaysLog = async (uid: number, startOfDay:Date, endOfDay:Date ) => {
  const result = await m_getOne("coll_logs", { uid, uploadDateAndTime:{$gte:startOfDay, $lte:endOfDay} });
  if (result) return result;
  await addLog(await createTodaysLog(uid));
  const secondResults = await m_getOne("coll_logs", { uid, uploadDateAndTime:{$gte:startOfDay, $lte:endOfDay} });
  // console.log({ uid, uploadDateAndTime:{$gte:startOfDay, $lte:startOfDay} })
  return secondResults;
}

export const updateLog = async (id: string, log: any) => {
  return await m_updateOne("coll_logs", { id }, { $set: log });
}

export const getHabits = async (uid: number) => {
  const result = await m_getOne("coll_user_habits", { uid });
  if (result) return { habits: result.habits};
  await createHabits(uid);
  const secondResults = await m_getOne("coll_user_habits", { uid });
  return {habits: secondResults.habits};
}

export const createHabits = async (uid: number) => {
  return await m_insertOne("coll_user_habits", { uid, habits: [] });
}

export const updateHabits = async (data:{uid: number, newHabits:Array<String>}) => {
  const {uid, newHabits} = data;
  return await m_updateOne("coll_user_habits", { uid }, { $addToSet: { habits: {$each: newHabits }} });
}


export const deleteLog = async (id: string) => {
  return await m_deleteOne("coll_logs", { id });
}
