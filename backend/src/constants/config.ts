import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(__dirname, "../../.env")});

interface DB_Interface { 
    host: string;
    user: string;
    // name: string;
    password: string;
    database: string;
}

// export const DB_mongo:DB_Interface = {
//     host: "mongodb://localhost:27017",
//     user: "root",
//     // name: "test",
//     password: ""
// };

const {SQL_DB_HOST, SQL_DB_USER, SQL_DB_PASSWORD, SQL_DB_NAME} = process.env;


export const DB_mysql:DB_Interface = {
    host: SQL_DB_HOST|| "localhost",
    user:  SQL_DB_USER|| "root",
    password: SQL_DB_PASSWORD|| "password",
    database: SQL_DB_NAME || "cn_habit_tracker",
}