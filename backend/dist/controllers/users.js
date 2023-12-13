"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateUser = exports.deleteUser = void 0;
const users_1 = require("../model/users");
const helpers_1 = require("../helpers");
const deleteUser = async (req, res) => {
    try {
        console.log("[Delete User API called]");
        const { uid } = req.body;
        if (await !(0, users_1.deleteUserByID)(uid))
            return res.status(500).send({ error: "Error deleting user" });
        res.cookie("access_token", "", { expires: new Date(0) });
        res.status(200).send({ message: "User deleted successfully" });
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
const changePassword = async (req, res) => {
    try {
        console.log("[Change Password API called]");
        const { newPassword, uid } = req.body;
        console.log(newPassword, uid);
        const hashedPassword = await (0, helpers_1.createHashedPassword)(newPassword);
        if (await !(0, users_1.updateUserByID)(uid, { hashed_password: hashedPassword }))
            return res.status(500).send({ error: "Error changing password" });
        res.status(200).send({ message: "Password changed successfully" });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ error: "Error changing password" });
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=users.js.map