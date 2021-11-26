// modules
const express = require("express");
const app = express();
const cors = require("cors");

// dotenv config
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// startup

// main

// listen to express server
app.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});
