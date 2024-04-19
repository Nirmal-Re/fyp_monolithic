import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { createHashedPassword, comparePassword } from "../helpers";
import {
  getUserDataByEmail,
  checkUserExistsByEmail,
  createUser,
} from "../model/users";
import { secrets } from "../constants/config";

//Registers a new user
export const register = async (req: Request, res: Response) => {
  try {
    console.log("[Register API called]");
    const { email, password, firstName, lastName } = req.body;
    console.log(req.body);
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).send({ error: "Missing fields" });
    }

    if (await checkUserExistsByEmail(email)) {
      return res
        .status(400)
        .send({ error: "User by this email already exists" });
    }
    const hashedPassword = await createHashedPassword(password);

    const value = await createUser({
      email,
      hashed_password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
    });

    if (value) {
      console.log("User registered successfully");
      return res.status(200).send({ message: "User registered successfully" });
    } else {
      console.log("Error with registering user");
      return res.status(400).send({ error: "Error with registering user" });
    }
  } catch (e) {
    console.log("Error with registering user", e);
    res.status(400).send({ error: "Error with registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log("[Login API called]");
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "Missing fields" });
    }

    //check user exists for the email
    if (!(await checkUserExistsByEmail(email))) {
      return res
        .status(400)
        .send({ error: "User by this email doesn't exist" });
    }

    const { id, first_name, last_name, hashed_password } =
      await getUserDataByEmail(email);
    const isPasswordCorrect = await comparePassword(password, hashed_password);

    if (!isPasswordCorrect) {
      return res.status(403).send({ error: "Incorrect password" });
    }

    console.log(`${email} has logged in successfully`);
    const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } = secrets;
    const accessToken = jwt.sign({ email, uid: id }, JWT_ACCESS_TOKEN_SECRET);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 130,
    });
    return res.status(200).send({
      message: "Logged in successfully",
      user: { email, first_name, last_name },
    }); // This might have to change. I am not sure if I should send the user data back to the client
  } catch (e) {
    console.log(e);
    return res.sendStatus(400).send({ error: "Error with logging in" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    console.log("[Logout API called]");
    res.clearCookie("access_token");
    return res.status(200).send({ message: "Logged out successfully" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(400).send({ error: "Error with logging out" });
  }
};
