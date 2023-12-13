"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers");
const users_1 = require("../model/users");
const config_1 = require("../constants/config");
//Registers a new user
const register = async (req, res) => {
    try {
        console.log("[Register API called]");
        const { email, password, firstName, lastName } = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).send({ error: "Missing fields" });
        }
        if (await (0, users_1.checkUserExistsByEmail)(email)) {
            return res
                .status(400)
                .send({ error: "User by this email already exists" });
        }
        const hashedPassword = await (0, helpers_1.createHashedPassword)(password);
        const value = await (0, users_1.createUser)({
            email,
            hashed_password: hashedPassword,
            first_name: firstName,
            last_name: lastName,
        });
        if (value) {
            console.log("User registered successfully");
            return res.status(200).send({ message: "User registered successfully" });
        }
        else {
            console.log("Error with registering user");
            return res.status(400).send({ error: "Error with registering user" });
        }
    }
    catch (e) {
        console.log("Error with registering user", e);
        res.status(400).send({ error: "Error with registering user" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        console.log("[Login API called]");
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ error: "Missing fields" });
        }
        //check user exists for the email
        if (!(await (0, users_1.checkUserExistsByEmail)(email))) {
            return res
                .status(400)
                .send({ error: "User by this email doesn't exist" });
        }
        const { id, first_name, last_name, hashed_password } = await (0, users_1.getUserDataByEmail)(email);
        const isPasswordCorrect = await (0, helpers_1.comparePassword)(password, hashed_password);
        if (!isPasswordCorrect) {
            return res.status(403).send({ error: "Incorrect password" });
        }
        console.log(`${email} has logged in successfully`);
        const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } = config_1.secrets;
        const accessToken = jsonwebtoken_1.default.sign({ email, uid: id }, JWT_ACCESS_TOKEN_SECRET);
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        return res.status(200).send({
            message: "Logged in successfully",
            user: { email, first_name, last_name },
        }); // This might have to change. I am not sure if I should send the user data back to the client
    }
    catch (e) {
        console.log(e);
        return res.sendStatus(400).send({ error: "Error with logging in" });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        console.log("[Logout API called]");
        res.clearCookie("access_token");
        return res.status(200).send({ message: "Logged out successfully" });
    }
    catch (e) {
        console.log(e);
        return res.sendStatus(400).send({ error: "Error with logging out" });
    }
};
exports.logout = logout;
//# sourceMappingURL=authentication.js.map