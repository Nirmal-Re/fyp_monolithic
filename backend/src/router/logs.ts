import { Router } from "express";

import {
  updateLogController,
  fetchAllHabits,
  addNewHabits,
  getDailyLog,
  getLogIDsController,
  getLogByIdController,
} from "../controllers/logs";
import { isAuthenticated } from "../middlewares";

export default (router: Router) => {
  router.post("/update-log", isAuthenticated, updateLogController);
  router.get("/fetch-all-habits", isAuthenticated, fetchAllHabits);
  router.post("/add-new-habits", isAuthenticated, addNewHabits);
  router.get("/get-daily-log", isAuthenticated, getDailyLog);
  router.get("/get-log-ids", isAuthenticated, getLogIDsController);
  router.get("/get-log-by-id/:id", isAuthenticated, getLogByIdController);
};
