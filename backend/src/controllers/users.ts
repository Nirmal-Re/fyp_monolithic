import express from 'express';

import {deleteUserByID, updateUserByID} from '../model/users';
import {createHashedPassword} from '../helpers';


export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const {uid} = req.body;
        console.log(uid);
        if(await !deleteUserByID(uid)) return res.status(500).send({error: "Error deleting user"});
        res.cookie('access_token', '', { expires: new Date(0) });
        res.status(200).send({message: "User deleted successfully"});

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

export const changePassword = async (req: express.Request, res: express.Response) => {
    try {
    const {newPassword, uid} = req.body;
    console.log(newPassword, uid)
    const hashedPassword = await createHashedPassword(newPassword);
    if(await !updateUserByID(uid, {hashed_password: hashedPassword})) return res.status(500).send({error: "Error changing password"});

    res.status(200).send({message: "Password changed successfully"});

    } catch (e) {
        console.log(e);
        res.status(500).send({error: "Error changing password"});
    }
}