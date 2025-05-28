const express = require("express");
const receitaController = require("../controllers/receitaController");
const authController = require("../controllers/authController");

const router = express.Router();

// Usuários
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", authController.me);
router.post("/auth/logout", authController.logout);

// Receitas
router.post("/receitas", receitaController.criar);
router.put("/receitas/:id", receitaController.atualizar);
router.delete("/receitas/:id", receitaController.deletar);

module.exports = router;