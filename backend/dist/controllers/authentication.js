"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const helpers_1 = require("../helpers");
const users_1 = require("../model/users");
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        console.log(email, password, username);
        if (!email || !password || !username) {
            return res.status(400).send({ error: "Missing fields" });
        }
        //todo check email is unique
        //todo check username is unique
        const hashedPassword = await (0, helpers_1.createHashedPassword)(password);
        //todo insert into db
        (0, users_1.addUser)({ email, password_salt: hashedPassword, username });
        res.status(200).json({ username, email });
    }
    catch (e) {
        console.log("Error with registering user", e);
        res.status(400).send({ err0r: "Error ith registering user" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ error: "Missing fields" });
        }
        //todo check user exists for the email
        // if user doesn't exist return error status 400
        //todo check password is correct
        // get hashed password from db
        // bcrypt.compare(password, hashedPassword)
        // if password is incorrect return error status 403 
        // if correct generate a session token add it in cache database (This way server becomes stateless)
        // return session token with in cookie in response
        console.log("Logged in successfully");
        return res.status(200).send({ message: "Logged in successfully" });
    }
    catch (e) {
        console.log(e);
        return res.sendStatus(400).send({ error: "Error with logging in" });
    }
};
exports.login = login;
//# sourceMappingURL=authentication.js.map