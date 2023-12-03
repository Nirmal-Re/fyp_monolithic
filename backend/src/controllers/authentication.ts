import express from "express";

import { createHashedPassword, comparePassword} from "../helpers";
import { getUserDataByEmail, checkUserExistsByEmail, createUser } from "../model/users";


//Registers a new user
 export const register = async (req: express.Request, res:express.Response) => {
    try{
        const {email, password, firstName, lastName} = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).send({error: "Missing fields"});
        }

        if (await checkUserExistsByEmail(email)) {
            return res.status(400).send({error: "User by this email already exists"});
        }
        const hashedPassword = await createHashedPassword(password);

        const value = await createUser({email, hashed_password: hashedPassword, first_name: firstName, last_name: lastName});

        if (value){
            console.log("User registered successfully");
            return res.status(200).send({message: "User registered successfully"});
        } else {
            console.log("Error with registering user");
            return res.status(400).send({error: "Error with registering user"});
        }

    } catch (e) {
        console.log("Error with registering user", e);
        res.status(400).send({err0r: "Error with registering user"});
    }

}

export const login = async (req: express.Request, res:express.Response) => { 
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).send({error: "Missing fields"});
        }

        //check user exists for the email
        if (!await checkUserExistsByEmail(email)) {
            return res.status(400).send({error: "User by this email doesn't exist"});
        }

        const { user_id, first_name, last_name, hashed_password } = await getUserDataByEmail(email);
        const isPasswordCorrect = await comparePassword(password, hashed_password);

        if (!isPasswordCorrect) {
            return res.status(403).send({error: "Incorrect password"});
        }

        console.log("Logged in successfully")
        return res.status(200).send({user_id, first_name, last_name});

        // TODO: generate a session token
        // Create a cookie with session token
        // if correct generate a session token add it in cache database (This way server becomes stateless)
        // so when the logged in user sends a request to the server I can check if the session token is valid and present in cache database
        // return session token with in cookie in response
    } catch (e) {
        console.log(e);
        return res.sendStatus(400).send({error: "Error with logging in"});
    }
}