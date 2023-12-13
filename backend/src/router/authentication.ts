import { Router } from "express";

import { register, login, logout } from "../controllers/authentication";
import { isAuthenticated } from "../middlewares";

export default (router: Router) => {
  router.post("/register", register);
  router.post("/login", login);
  router.post("/logout", isAuthenticated, logout);
};
