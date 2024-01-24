import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./router";
import "./cron_job/notification";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", router());
app.use("/user", router());
app.use("/logs", router());
app.use("/dashboard", router());
app.use("/notifications", router());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});

//    "dev": "concurrently \"tsc -w\" \"nodemon dist/server.js\""
