import { Router } from "express";

import { getNotifications } from "../controllers/notification";
import { isAuthenticated } from "../middlewares";

export default (router: Router) => {
  router.get("/get-notifications", isAuthenticated, getNotifications);
};
