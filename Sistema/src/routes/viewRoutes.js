const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Olá Mundo");
});

module.exports = router;
