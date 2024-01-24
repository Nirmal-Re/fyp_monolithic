import { Router } from "express";

import authentication from "./authentication";
import users from "./users";
import logs from "./logs";
import dashboard from "./dashboard";
import notification from "./notification";

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  logs(router);
  dashboard(router);
  notification(router);
  return router;
};
