require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use("/uploads",express.static("uploads"));

const User = require("./src/routes/user");
const Product = require("./src/routes/products");
const Order = require("./src/routes/order");

app.use("/api/v1/user", User);
app.use("/api/v1/product", Product);
app.use("/api/v1/order", Order);

module.exports = app;
