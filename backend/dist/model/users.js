"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByID = exports.deleteUserByID = exports.checkUserExistsByEmail = exports.getUserByUsername = exports.getUserDataByEmail = exports.getUserIDByEmail = exports.createUser = void 0;
const db_1 = require("./db");
const createUser = async (user) => {
    return (0, db_1.addItem)('t_user_login_data', user);
};
exports.createUser = createUser;
const getUserIDByEmail = async (email) => {
    return await (0, db_1.getItemsByCriteria)('t_user_login_data', ["user_id"], { email });
};
exports.getUserIDByEmail = getUserIDByEmail;
const getUserDataByEmail = async (email) => {
    return await (0, db_1.getItemsByCriteria)('t_user_login_data', ["user_id", "first_name", "last_name", "hashed_password"], { email });
};
exports.getUserDataByEmail = getUserDataByEmail;
const getUserByUsername = (username) => {
    (0, db_1.getItemsByCriteria)('t_user_login_data', ["user_id"], { username });
};
exports.getUserByUsername = getUserByUsername;
const checkUserExistsByEmail = async (email) => {
    return typeof await (0, exports.getUserIDByEmail)(email) === 'undefined' ? false : true;
};
exports.checkUserExistsByEmail = checkUserExistsByEmail;
const deleteUserByID = (id) => {
    (0, db_1.deleteItemsByCriteria)('t_user_login_data', { id });
};
exports.deleteUserByID = deleteUserByID;
const updateUserByID = (id, user) => {
    (0, db_1.updateItem)('t_user_login_data', id, user);
};
exports.updateUserByID = updateUserByID;
//# sourceMappingURL=users.js.map