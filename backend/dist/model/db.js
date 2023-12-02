"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllItems = exports.deleteItemsByCriteria = exports.deleteItemByID = exports.updateItemsByCriteria = exports.updateItem = exports.getItemsByCriteria = exports.getItemByID = exports.getAllItems = exports.addMultipleItems = exports.addItem = exports.excuteCustomQuery = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../constants/config");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../.env") });
const conn = mysql2_1.default.createConnection({ ...config_1.DB_mysql });
// conn.ping((err) => {console.log("Error with connection",err)})
conn.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + conn.threadId);
});
const excuteCustomQuery = (query) => {
    conn.query(query, (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        // console.log(fields);
    });
};
exports.excuteCustomQuery = excuteCustomQuery;
const addItem = (table, item) => {
    conn.query(`INSERT INTO ${table} SET ?`, [item], (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields);
    });
};
exports.addItem = addItem;
const addMultipleItems = (table, items) => {
    conn.query(`INSERT INTO ${table} SET ?`, [items], (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
};
exports.addMultipleItems = addMultipleItems;
const getAllItems = (table) => {
    conn.query(`SELECT * FROM ${table}`, (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
};
exports.getAllItems = getAllItems;
const getItemByID = (table, id) => {
    conn.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
};
exports.getItemByID = getItemByID;
const getItemsByCriteria = (table, fields, criteria) => {
    const queryfields = fields.length === 0 ? "*" : fields.join(", ");
    conn.query(`SELECT ${queryfields} FROM ${table} WHERE ?`, [criteria], (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
};
exports.getItemsByCriteria = getItemsByCriteria;
const updateItem = (table, id, item) => {
    conn.query(`UPDATE ${table} SET ? WHERE id = ?`, [item, id], (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
};
exports.updateItem = updateItem;
const updateItemsByCriteria = (table, criteria, item) => {
    conn.query(`UPDATE ${table} SET ? WHERE ?`, [item, criteria], (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
};
exports.updateItemsByCriteria = updateItemsByCriteria;
const deleteItemByID = (table, id) => {
    conn.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
};
exports.deleteItemByID = deleteItemByID;
const deleteItemsByCriteria = (table, criteria) => {
    conn.query(`DELETE FROM ${table} WHERE ?`, [criteria], (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
};
exports.deleteItemsByCriteria = deleteItemsByCriteria;
const deleteAllItems = (table) => {
    conn.query(`DELETE FROM ${table}`, (err, results, fields) => {
        if (err) {
            console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
};
exports.deleteAllItems = deleteAllItems;
exports.default = conn;
//# sourceMappingURL=db.js.map