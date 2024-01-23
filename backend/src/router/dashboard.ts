import { Router } from "express";

import { getUserLogData } from "../controllers/dashboard";
import { isAuthenticated } from "../middlewares";

export default (router: Router) => {
  router.get("/get-user-report-data", isAuthenticated, getUserLogData);
};
