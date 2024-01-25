import e from "express";

type exerciseName = string;

interface updateWorkoutEach {
  type: "push" | "pull" | "legs" | "cardio";
  add: exerciseName[];
  remove: exerciseName[];
}

export interface updateWorkoutAll extends Array<updateWorkoutEach> {}

interface set {
  [(key in "time") | "weight"]: Number;
  reps: Number;
}

interface exercise {
  name: exerciseName;
  sets: set[];
}

export interface wholeWorkoutData extends Array<exercise> {}
