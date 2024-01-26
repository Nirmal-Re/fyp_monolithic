import bcrypt from "bcrypt";
import { getExercises } from "../model/exercise";

export const createHashedPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch {
    return { error: "Error with hashing password" };
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch {
    return { error: "Error with comparing password" };
  }
};

export const startAndEndOfDay = () => {
  return [
    new Date(new Date().setHours(0, 0, 0, 0)),
    new Date(new Date().setHours(23, 59, 59, 999)),
  ]; //[startofday, endofday]
};

export const areSetsEqual = (setA: Set<any>, setB: Set<any>): boolean => {
  if (setA.size !== setB.size) return false;
  for (let elem of setA) {
    if (!setB.has(elem)) return false;
  }
  return true;
};

export const convertDates = (start: string, end: string): Date[] => {
  try {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return [startDate, endDate];
  } catch {
    throw new Error("Error with dates");
  }
};

export const validDates = (start: Date, end: Date): boolean => {
  if (start > end) return false;
  return true;
};

export const isValidWorkoutData = async (
  uid: number,
  data: any
): Promise<boolean> => {
  if (!data) return false;
  data.type = data.type.trim().toLowerCase().replace(/\s/g, "");
  if (!["push", "pull", "legs", "cardio"].includes(data.type)) return false;
  const exercises = await getExercises(uid, data.type);
  for (let i = 0; i < data.data.length; i++) {
    const current = data.data[i];
    current.name = current.name.trim().toUpperCase().replace(/\s/g, "");
    if (!exercises.includes(current.name)) return false;
    for (let j = 0; j < current.sets.length; j++) {
      const currentSet = current.sets[j];
      const keys = new Set(Object.keys(currentSet));
      if (
        data.type === "cardio" &&
        !areSetsEqual(keys, new Set(["time", "reps"]))
      )
        return false;
      if (
        data.type !== "cardio" &&
        !areSetsEqual(keys, new Set(["weight", "reps"]))
      )
        return false;
    }
  }
  return true;
};
