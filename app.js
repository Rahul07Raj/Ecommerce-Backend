require("dotenv").config();
const express = require("express");
const app = express();

const User = require("./src/routes/user")

app.use("api/v1/user", User);

module.exports = app;
