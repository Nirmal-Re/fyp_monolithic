import express from "express";

import { createHashedPassword } from "../helpers";
import { addUser } from "../model/users";

 export const register = async (req: express.Request, res:express.Response) => {
    try{
        const {email, password, username} = req.body;
        console.log(email, password, username  );
        if (!email || !password || !username) {
            return res.status(400).send({error: "Missing fields"});
        }
        //todo check email is unique
        //todo check username is unique
        const hashedPassword = await createHashedPassword(password);
        //todo insert into db
        addUser({email, password_salt: hashedPassword, username});

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