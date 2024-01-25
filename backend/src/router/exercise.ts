import { Router } from "express";
import { isAuthenticated } from "../middlewares";
import {
  addWorkout,
  updateWorkout,
  getWorkout,
  addWorkoutData,
} from "../controllers/exercise";

export default (router: Router) => {
  router.post("/add-workout", isAuthenticated, addWorkout);
  router.post("/update-workout", isAuthenticated, updateWorkout);
  router.get("/get-workouts", isAuthenticated, getWorkout);
  router.post("/add-workout-data", isAuthenticated, addWorkoutData);
};
