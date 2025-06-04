require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const apiRoutes = require("./routes/apiRoutes");
const viewRoutes = require("./routes/viewRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/css", express.static(path.join(__dirname, "..", "public", "css")));
app.use("/js", express.static(path.join(__dirname, "..", "public", "js")));

app.use("/api", apiRoutes);
app.use("/", viewRoutes);

module.exports = app;
