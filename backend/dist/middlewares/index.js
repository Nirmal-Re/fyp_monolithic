"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwner = exports.isAuthenticated = void 0;
const isAuthenticated = async (req, res, next) => {
    try {
        // get session token from cookie
        // get session token from redis
        // if session token doesn't exist in redis return error status 403
        // if session token exists in redis call next function
        //go back to the video and check why the person had added identity to the req object
        next();
    }
    catch (e) {
        console.log(e);
        res.status(403).send({ error: "Not authenticated" });
    }
};
exports.isAuthenticated = isAuthenticated;
//to check if the user trying to delete the user is the owner of the account
const isOwner = async (req, res, next) => {
    try {
    }
    catch (error) {
    }
};
exports.isOwner = isOwner;
//# sourceMappingURL=index.js.map