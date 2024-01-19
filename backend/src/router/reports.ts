import { Router } from "express";

import { getUserLogData } from "../controllers/reports";
import { isAuthenticated } from "../middlewares";

export default (router: Router) => {
  router.get("/get-user-log-data", isAuthenticated, getUserLogData);
};
