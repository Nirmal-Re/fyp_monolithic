import e from "express";

type exerciseName = string;

interface updateWorkoutEach {
  type: "push" | "pull" | "legs" | "cardio";
  add: exerciseName[];
  remove: exerciseName[];
}

export interface updateWorkoutAll extends Array<updateWorkoutEach> {}

interface timeSet {
  time: number;
  reps: number;
}

interface weightSet {
  weight: number;
  reps: number;
}

type set = timeSet | weightSet;

interface exercise {
  name: exerciseName;
  sets: set[];
}

export interface wholeWorkoutData {
  type: "push" | "pull" | "legs" | "cardio";
  data: exercise[];
}
