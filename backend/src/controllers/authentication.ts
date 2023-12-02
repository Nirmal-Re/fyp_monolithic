import express from "express";

import { createHashedPassword } from "../helpers";
import { getUserByEmail, addUser } from "../model/users";
import { get } from "http";

 export const register = async (req: express.Request, res:express.Response) => {
    try{
        const {email, password, username, firstName, lastName} = req.body;
        if (!email || !password || !username) {
            return res.status(400).send({error: "Missing fields"});
        }
        getUserByEmail(email); //The db function is asynchous so it will return a promise, need to make it wait and return value to check
        //todo check username is unique
        const hashedPassword = await createHashedPassword(password);
        //todo insert into db
        addUser({email, hashed_password: hashedPassword, username, first_name: firstName, last_name: lastName});

        res.status(200).json({username, email});
    } catch (e) {
        console.log("Error with registering user", e);
        res.status(400).send({err0r: "Error ith registering user"});
    }

}

export const login = async (req: express.Request, res:express.Response) => { 
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).send({error: "Missing fields"});
        }
        //todo check user exists for the email
        // if user doesn't exist return error status 400
        //todo check password is correct
        // get hashed password from db
        // bcrypt.compare(password, hashedPassword)
        // if password is incorrect return error status 403 
        // if correct generate a session token add it in cache database (This way server becomes stateless)
        // return session token with in cookie in response
        console.log("Logged in successfully")
        return res.status(200).send({message: "Logged in successfully"});
    } catch (e) {
        console.log(e);
        return res.sendStatus(400).send({error: "Error with logging in"});
    }
}