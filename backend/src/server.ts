import express from "express";
import cors from "cors";

import router from "./router";

const app = express();
app.use(express.json())

app.use(cors({
  credentials: true
}))

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.use("/auth", router());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});


//    "dev": "concurrently \"tsc -w\" \"nodemon dist/server.js\""