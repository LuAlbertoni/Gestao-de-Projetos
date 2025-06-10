const express = require("express");
const path = require("path");
const authenticate = require("../middleware/authMiddleware");

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

router.get("/receitas", authenticate, (req, res) => {
  res.sendFile(path.join(publicRoot, "receitas.html"));
});

router.get("/receita/:id", authenticate, (req, res) => {
  res.sendFile(path.join(publicRoot, "receita-detalhe.html"));
});

module.exports = router;
