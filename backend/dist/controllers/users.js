"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = void 0;
//
const deleteUser = async (req, res) => {
    try {
        // get user id from req.params
        // delete user from database
        // delete session token from redis
        // return status 200
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ error: "Error deleting user" });
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res) => {
    try {
        // get user id from req.params
        // get updated fields from req.body
        // update user in database
        // return status 200
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ error: "Error updating user" });
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=users.js.map