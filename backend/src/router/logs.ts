import { Router } from "express";

import {
  updateLogController,
  fetchAllHabits,
  addNewHabits,
  getDailyLog,
  getAskedLogIDs,
  getLogByIdController,
} from "../controllers/logs";
import { isAuthenticated } from "../middlewares";

export default (router: Router) => {
  router.post("/update-log", isAuthenticated, updateLogController);
  router.get("/fetch-all-habits", isAuthenticated, fetchAllHabits);
  router.post("/add-new-habits", isAuthenticated, addNewHabits);
  router.get("/get-daily-log", isAuthenticated, getDailyLog);
  router.post("/get-log-ids", isAuthenticated, getAskedLogIDs);
  router.get("/get-log-by-id/:id", isAuthenticated, getLogByIdController);
};
