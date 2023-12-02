"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const db_1 = require("./db");
const addUser = (user) => {
    (0, db_1.addItem)('t_user_login_data', user);
};
exports.addUser = addUser;
//# sourceMappingURL=users.js.map