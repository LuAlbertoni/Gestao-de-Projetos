const express = require("express");
const path = require("path");

const router = express.Router();
const publicRoot = path.resolve(process.cwd(), "public");

router.get("/", (req, res) => {
  res.sendFile(path.join(publicRoot, "index.html"));
});

router.get("/entrar", (req, res) => {
  res.sendFile(path.join(publicRoot, "entrar.html"));
});

router.get("/cadastro", (req, res) => {
  res.sendFile(path.join(publicRoot, "cadastro.html"));
});

module.exports = router;
