const express = require("express");
const receitaController = require("../controllers/receitaController");
const authController = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Autenticação
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", authController.me);
router.post("/auth/logout", authController.logout);

// Receitas
router.post("/receitas", auth, receitaController.criar);
router.put("/receitas/:id", auth, receitaController.atualizar);
router.delete("/receitas/:id", auth, receitaController.deletar);
router.get("/receitas", auth, receitaController.listar);
router.get("/receitas/:id", auth, receitaController.detalhar);

module.exports = router;