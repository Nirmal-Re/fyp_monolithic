import express from 'express';
import { deleteUser, updateUser, changePassword } from '../controllers/users';
import { isAuthenticated } from '../middlewares';


export default (router:express.Router) => {
    router.delete("/delete", isAuthenticated, deleteUser)
    router.post("/update", isAuthenticated, updateUser)
    router.post("/change-password", isAuthenticated, changePassword)

    return router;
}