import { Router } from "express";

import authentication from "./authentication";
import users from "./users";
import logs from "./logs";
import dashboard from "./dashboard";

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  logs(router);
  dashboard(router);
  return router;
};
