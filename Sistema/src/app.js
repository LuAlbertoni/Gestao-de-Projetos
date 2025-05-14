require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const apiRoutes = require("./routes/apiRoutes");
const viewRoutes = require("./routes/viewRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRoutes);
app.use("/", viewRoutes);

module.exports = app;
