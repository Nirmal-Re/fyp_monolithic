"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByID = exports.deleteUserByID = exports.checkUserExistsByEmail = exports.getUserByUsername = exports.getUserDataByEmail = exports.getUserIDByEmail = exports.createUser = void 0;
const sqlDB_1 = require("./sqlDB");
const createUser = async (user) => {
    return (0, sqlDB_1.addItem)('t_user_login_data', user);
};
exports.createUser = createUser;
const getUserIDByEmail = async (email) => {
    return await (0, sqlDB_1.getItemsByCriteria)('t_user_login_data', ["id"], { email });
};
exports.getUserIDByEmail = getUserIDByEmail;
const getUserDataByEmail = async (email) => {
    return await (0, sqlDB_1.getItemsByCriteria)('t_user_login_data', ["id", "first_name", "last_name", "hashed_password"], { email });
};
exports.getUserDataByEmail = getUserDataByEmail;
const getUserByUsername = (username) => {
    (0, sqlDB_1.getItemsByCriteria)('t_user_login_data', ["id"], { username });
};
exports.getUserByUsername = getUserByUsername;
const checkUserExistsByEmail = async (email) => {
    return typeof await (0, exports.getUserIDByEmail)(email) === 'undefined' ? false : true;
};
exports.checkUserExistsByEmail = checkUserExistsByEmail;
const deleteUserByID = async (user_id) => {
    return await (0, sqlDB_1.deleteItemByID)('t_user_login_data', user_id);
};
exports.deleteUserByID = deleteUserByID;
const updateUserByID = async (id, changes) => {
    return await (0, sqlDB_1.updateItem)('t_user_login_data', id, changes);
};
exports.updateUserByID = updateUserByID;
//# sourceMappingURL=users.js.map