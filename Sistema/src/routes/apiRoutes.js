const express = require("express");
const receitaController = require("../controllers/receitaController");

const router = express.Router();

router.post("/receitas", receitaController.criar);
router.put("/receitas/:id", receitaController.atualizar);
router.delete("/receitas/:id", receitaController.deletar);

module.exports = router;