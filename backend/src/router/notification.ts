import { Router } from "express";

import {
  getNotifications,
  deleteNotificationAPI,
} from "../controllers/notification";
import { isAuthenticated } from "../middlewares";

export default (router: Router) => {
  router.get("/get-notifications", isAuthenticated, getNotifications);
  router.post("/delete-notification", isAuthenticated, deleteNotificationAPI);
};
