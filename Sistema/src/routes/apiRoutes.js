const express = require("express");
const receitaController = require("../controllers/receitaController");

const router = express.Router();

router.post("/receitas", receitaController.criar);
router.put("/receitas/:id", receitaController.atualizar);

module.exports = router;