import { Router } from "express";
import { isAuthenticated } from "../middlewares";
import {
  updateWorkout,
  getWorkout,
  addWorkoutData,
  getWorkoutIDsController,
  getWorkoutByIDController,
} from "../controllers/exercise";

export default (router: Router) => {
  router.post("/update-workouts", isAuthenticated, updateWorkout);
  router.get("/get-workouts", isAuthenticated, getWorkout);
  router.post("/add-workout-data", isAuthenticated, addWorkoutData);
  router.get(
    "/get-workout-ids/:type",
    isAuthenticated,
    getWorkoutIDsController
  );
  router.get(
    "/get-workout-by-id/:id",
    isAuthenticated,
    getWorkoutByIDController
  );
};
