import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./router";
import "./cron_job/notification";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: true, // Allow all origins
    credentials: true,
    
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", router());
app.use("/user", router());
app.use("/logs", router());
app.use("/dashboard", router());
app.use("/notifications", router());
app.use("/exercise", router());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});

//    "dev": "concurrently \"tsc -w\" \"nodemon dist/server.js\""
