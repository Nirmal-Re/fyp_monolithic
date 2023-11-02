import express from 'express';

//

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        // get user id from req.params
        // delete user from database
        // delete session token from redis
        // return status 200
    } catch (e) {
        console.log(e);
        res.status(500).send({error: "Error deleting user"});
    }
};


export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        // get user id from req.params
        // get updated fields from req.body
        // update user in database
        // return status 200
    } catch (e) {   
        console.log(e);
        res.status(500).send({error: "Error updating user"});
    }
};