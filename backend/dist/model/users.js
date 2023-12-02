"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = exports.getUserByEmail = exports.addUser = void 0;
const db_1 = require("./db");
const addUser = (user) => {
    (0, db_1.addItem)('t_user_login_data', user);
};
exports.addUser = addUser;
const getUserByEmail = (email) => {
    (0, db_1.getItemsByCriteria)('t_user_login_data', ["user_id"], { email });
};
exports.getUserByEmail = getUserByEmail;
const getUserByUsername = (username) => {
    (0, db_1.getItemsByCriteria)('t_user_login_data', ["user_id"], { username });
};
exports.getUserByUsername = getUserByUsername;
//# sourceMappingURL=users.js.map