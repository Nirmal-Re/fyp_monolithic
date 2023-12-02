import mysql2 from "mysql2";
import dotenv from "dotenv";
import path from "path"

import { DB_mysql } from "../constants/config";

dotenv.config({path: path.join(__dirname, "../.env")});
const conn = mysql2.createConnection({...DB_mysql});

// conn.ping((err) => {console.log("Error with connection",err)})

conn.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + conn.threadId);
});

const excuteQuery = async (query:string) => {
    conn.query(query, (err, results, fields) => {
        if (err) {
        console.log(err);
        }
        console.log(fields);
        return results; // results contains rows returned by server
    });
}

export const addItem = (table:string, item:any) => {
    conn.query(`INSERT INTO ${table} SET ?`, [item], (err, results, fields) => {
        if (err) {
        console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields);
    });
}

export const addMultipleItems = (table:string, items:any[]) => {
    conn.query(`INSERT INTO ${table} SET ?`, [items], (err, results, fields) => {
        if (err) {
        console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
}

export const getAllItems = (table:string) => {
    conn.query(`SELECT * FROM ${table}`, (err, results, fields) => {
        if (err) {
        console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
}

export const getItemByID = (table:string, id:string) => {
    conn.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, results, fields) => {
        if (err) {
        console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
}

export const getItemsByCriteria = (table:string, criteria:any) => {
    conn.query(`SELECT * FROM ${table} WHERE ?`, [criteria], (err, results, fields) => {
        if (err) {
        console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
}

export const updateItem = (table:string, id:string, item:any) => {
    conn.query(`UPDATE ${table} SET ? WHERE id = ?`, [item, id], (err, results, fields) => {
        if (err) {
        console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
}

export const updateItemsByCriteria = (table:string, criteria:any, item:any) => {
    conn.query(`UPDATE ${table} SET ? WHERE ?`, [item, criteria], (err, results, fields) => {
        if (err) {
        console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
}


export const deleteItemByID = (table:string, id:string) => {
    conn.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, results, fields) => {
        if (err) {
        console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
}

export const deleteItemsByCriteria = (table:string, criteria:any) => {
    conn.query(`DELETE FROM ${table} WHERE ?`, [criteria], (err, results, fields) => {
        if (err) {
        console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    });
}

export const deleteAllItems = (table:string) => {
    conn.query(`DELETE FROM ${table}`, (err, results, fields) => {
        if (err) {
        console.log(err);
        }
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        
    });
}



export default conn;