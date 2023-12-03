"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllItems = exports.deleteItemsByCriteria = exports.deleteItemByID = exports.updateItemsByCriteria = exports.updateItem = exports.getItemsByCriteria = exports.getItemByID = exports.getAllItems = exports.addMultipleItems = exports.addItem = exports.excuteCustomQuery = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../constants/config");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../.env") });
let conn;
//connecting to mysql database
const sqlDbConnect = async () => {
    try {
        conn = await promise_1.default.createConnection({ ...config_1.DB_mysql });
        console.log("Connected as id " + conn.threadId);
    }
    catch (e) {
        console.log("Error with connection", e.stack);
    }
};
sqlDbConnect();
// conn.ping((err) => {console.log("Error with connection",err)})
const excuteCustomQuery = (query) => {
    conn.query(query);
};
exports.excuteCustomQuery = excuteCustomQuery;
const addItem = async (table, item) => {
    const [result] = await conn.query(`INSERT INTO ${table} SET ?`, [item]);
    const { insertId, affectedRows } = result;
    return affectedRows === 1 ? true : false;
};
exports.addItem = addItem;
const addMultipleItems = (table, items) => {
    conn.query(`INSERT INTO ${table} SET ?`, [items]);
};
exports.addMultipleItems = addMultipleItems;
const getAllItems = (table) => {
    conn.query(`SELECT * FROM ${table}`);
};
exports.getAllItems = getAllItems;
const getItemByID = (table, id) => {
    conn.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
};
exports.getItemByID = getItemByID;
const getItemsByCriteria = async (table, fields, criteria) => {
    const queryfields = fields.length === 0 ? "*" : fields.join(", ");
    const [row, _] = await conn.query(`SELECT ${queryfields} FROM ${table} WHERE ?`, [criteria]);
    return row[0];
};
exports.getItemsByCriteria = getItemsByCriteria;
const updateItem = (table, id, item) => {
    conn.query(`UPDATE ${table} SET ? WHERE id = ?`, [item, id]);
};
exports.updateItem = updateItem;
const updateItemsByCriteria = (table, criteria, item) => {
    conn.query(`UPDATE ${table} SET ? WHERE ?`, [item, criteria]);
};
exports.updateItemsByCriteria = updateItemsByCriteria;
const deleteItemByID = (table, id) => {
    conn.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
};
exports.deleteItemByID = deleteItemByID;
const deleteItemsByCriteria = (table, criteria) => {
    conn.query(`DELETE FROM ${table} WHERE ?`, [criteria]);
};
exports.deleteItemsByCriteria = deleteItemsByCriteria;
const deleteAllItems = (table) => {
    conn.query(`DELETE FROM ${table}`, []);
};
exports.deleteAllItems = deleteAllItems;
//# sourceMappingURL=db.js.map