import { Router } from "express";

import {
  getUserLogData,
  getWorkoutHistoricData,
} from "../controllers/dashboard";
import { isAuthenticated } from "../middlewares";

export default (router: Router) => {
  router.get("/get-user-report-data", isAuthenticated, getUserLogData);
  router.get(
    "/get-workout-historic-data",
    isAuthenticated,
    getWorkoutHistoricData
  );
};
