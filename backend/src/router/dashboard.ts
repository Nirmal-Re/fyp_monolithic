import { Router } from "express";

import {
  getUserLogData,
  getWorkoutHistoricData,
} from "../controllers/dashboard";
import { isAuthenticated } from "../middlewares";

export default (router: Router) => {
  router.post("/get-user-report-data", isAuthenticated, getUserLogData);
  router.post(
    "/get-workout-historic-data",
    isAuthenticated,
    getWorkoutHistoricData
  );
};
