import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import createUserRouter from "./Routes/CreateUser.js";
import DisplayDataRouter from "./Routes/DisplayData.js";
import connect from "./db.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("api is working");
});

//MiddleWare
app.use(express.json());
app.use("/api/", createUserRouter);
app.use("/api/", DisplayDataRouter);

app.listen(port, () => {
  connect();
  console.log("Server listening on port", port);
});
