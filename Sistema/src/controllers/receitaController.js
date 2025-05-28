const Receita = require("../models/Receita");

exports.criar = async (req, res, next) => {
    try {
        const { nome, ingredientes, modo_preparo, tempo_preparo, rendimento } = req.body;
        if (!nome || !ingredientes || !modo_preparo)
            return res.status(400).json({ error: "Campos obrigatórios" });
        const receita = await Receita.create({
            nome,
            ingredientes,
            modo_preparo,
            tempo_preparo,
            rendimento,
        });
        res.status(201).json(receita);
    } catch (e) {
        next(e);
    }
};