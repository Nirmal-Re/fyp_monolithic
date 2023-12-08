import express from "express"; 
import jwt from "jsonwebtoken";
import {get, merge} from "lodash";

import { secrets } from "../constants/config";
import { fromPairs } from "lodash";

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        // get access_token from cookie
        const {access_token} = req.cookies;
        if (!access_token) return res.status(403).send({error: "Not authenticated"});
        
        // verify access_token
        const {JWT_ACCESS_TOKEN_SECRET} = secrets;
        const {email, uid}  = jwt.verify(access_token,JWT_ACCESS_TOKEN_SECRET) as {email: string, uid: Number};
        if (!email || !uid) return res.status(403).send({error: "Not authenticated"});

        merge(req.body, {uid});
        next();
    } catch (e) { 
        console.log(e);
        res.status(403).send({error: "Not authenticated"});
    }
}
