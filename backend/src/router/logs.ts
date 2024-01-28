import { Router } from "express";

import {
  addDailyLog,
  fetchAllHabits,
  addNewHabits,
  getDailyLog,
} from "../controllers/logs";
import { isAuthenticated } from "../middlewares";

export default (router: Router) => {
  router.post("/add-daily-log", isAuthenticated, addDailyLog);
  router.get("/fetch-all-habits", isAuthenticated, fetchAllHabits);
  router.post("/add-new-habits", isAuthenticated, addNewHabits);
  router.get("/get-daily-log", isAuthenticated, getDailyLog);
};
