const Receita = require("../models/Receita");

exports.listar = async (req, res, next) => {
  try {
    const { q } = req.query;
    const receitas = await Receita.findAll({ search: q });
    res.json(receitas);
  } catch (e) {
    next(e);
  }
};

exports.detalhar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const receita = await Receita.findById(id);
    if (!receita)
      return res.status(404).json({ error: "Receita não encontrada" });
    res.json(receita);
  } catch (e) {
    next(e);
  }
};

exports.criar = async (req, res, next) => {
  try {
    const { nome, ingredientes, modo_preparo, tempo_preparo, rendimento } =
      req.body;
    if (!nome || !ingredientes || !modo_preparo)
      return res.status(400).json({ error: "Campos obrigatórios" });
    const receita = await Receita.create({
      nome,
      ingredientes,
      modo_preparo,
      tempo_preparo,
      rendimento,
      usuario_id: req.user.id,
    });
    res.status(201).json(receita);
  } catch (e) {
    next(e);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ok = await Receita.update(id, req.body, req.user.id);
    if (!ok)
      return res
        .status(403)
        .json({ error: "Não permitido ou receita não encontrada" });
    res.json({ message: "Receita atualizada" });
  } catch (e) {
    next(e);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ok = await Receita.delete(id, req.user.id);
    if (!ok)
      return res
        .status(403)
        .json({ error: "Não permitido ou receita não encontrada" });
    res.json({ message: "Receita deletada" });
  } catch (e) {
    next(e);
  }
};
