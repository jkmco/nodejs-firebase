// modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// // for accessing firebase configs database
// import {
//   getAllConfigs,
//   getConfigsByApp,
//   getConfigByAppAndKey,
//   upsertConfigValue,
//   deleteConfigByAppAndKey,
// } from "./helpers/configHelper.js";

const app = express();

// dotenv config
dotenv.config();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// startup

// main

(async () => {})();

// listen to express server
app.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});
