import express from "express"; 

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // get session token from cookie
        // get session token from redis
        // if session token doesn't exist in redis return error status 403
        // if session token exists in redis call next function

        //go back to the video and check why the person had added identity to the req object
        next();
    } catch (e) {
        console.log(e);
        res.status(403).send({error: "Not authenticated"});
    }
}


//to check if the user trying to delete the user is the owner of the account
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => { 
    try {
        
    } catch (error) {
        
    }
};