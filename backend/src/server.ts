import express from "express";
import cors from "cors";

import { dbConnection } from "./model/db";
dbConnection

const app = express();

app.use(cors({
  credentials: true
}))

app.use(express.json());


app.get("/", (req, res) => {
  res.send("!");
});

app.post("/signup", (req, res) => { 
  
  const { email, password } = req.body;
}
);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});
