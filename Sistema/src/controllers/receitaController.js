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

exports.atualizar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ok = await Receita.update(id, req.body);
        if (!ok)
            return res
                .status(404)
                .json({ error: "Receita não encontrada" });
        res.json({ message: "Receita atualizada" });
    } catch (e) {
        next(e);
    }
};

exports.deletar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ok = await Receita.delete(id);
        if (!ok)
            return res
                .status(404)
                .json({ error: "Receita não encontrada" });
        res.json({ message: "Receita deletada" });
    } catch (e) {
        next(e);
    }
};