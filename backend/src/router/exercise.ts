import { Router } from "express";
import { isAuthenticated } from "../middlewares";
import {
  updateWorkout,
  getWorkout,
  addWorkoutData,
} from "../controllers/exercise";

export default (router: Router) => {
  router.post("/update-workouts", isAuthenticated, updateWorkout);
  router.get("/get-workouts", isAuthenticated, getWorkout);
  router.post("/add-workout-data", isAuthenticated, addWorkoutData);
};
