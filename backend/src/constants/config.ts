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

const {SQL_DB_HOST, SQL_DB_USER, SQL_DB_PASSWORD, SQL_DB_NAME, JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET} = process.env;
if (!SQL_DB_HOST || !SQL_DB_USER || !SQL_DB_PASSWORD || !SQL_DB_NAME) {
    throw new Error("SQL database connection values are not defined");
}



export const DB_mysql:DB_Interface = {
    host: SQL_DB_HOST,
    user:  SQL_DB_USER,
    password: SQL_DB_PASSWORD,
    database: SQL_DB_NAME,
}


interface JWT_Interface {
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_SECRET: string;

}

if (!JWT_ACCESS_TOKEN_SECRET || !JWT_REFRESH_TOKEN_SECRET) {
    throw new Error("JWT secrets not defined");
}

export const secrets:JWT_Interface = {
    JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_SECRET
}