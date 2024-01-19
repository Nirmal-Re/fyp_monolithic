import { Router } from "express";

import authentication from "./authentication";
import users from "./users";
import logs from "./logs";
import report from "./report";

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  logs(router);
  report(router);
  return router;
};
