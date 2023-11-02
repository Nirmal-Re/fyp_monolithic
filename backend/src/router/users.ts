import express from 'express';
import { deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';


export default (router:express.Router) => {
    router.post("/delete", isAuthenticated, isOwner, deleteUser)
    router.post("/update", isAuthenticated, isOwner, updateUser)

    return router;
}