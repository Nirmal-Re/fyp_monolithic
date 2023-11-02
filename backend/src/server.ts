import express from "express";
import cors from "cors";
import mysql2 from "mysql2";
import dotenv from "dotenv";
import path from "path"

import { DB_mysql } from "./constants/config";
import router from "./router";

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

const app = express();

app.use(cors({
  credentials: true
}))

app.use(express.json());


app.use("/auth", router());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});


//    "dev": "concurrently \"tsc -w\" \"nodemon dist/server.js\""