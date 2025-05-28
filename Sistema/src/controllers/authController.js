const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha)
            return res.status(400).json({ error: "Dados obrigatórios" });
        const existe = await Usuario.findByEmail(email);
        if (existe) return res.status(400).json({ error: "Email já cadastrado" });
        const hash = await bcrypt.hash(senha, 10);
        const usuario = await Usuario.create({ nome, email, senha: hash });
        res
            .status(201)
            .json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
    } catch (e) {
        next(e);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha)
            return res.status(400).json({ error: "Dados obrigatórios" });
        const usuario = await Usuario.findByEmail(email);
        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            return res.status(401).json({ error: "Email ou senha inválidos" });
        }
        
        res.json({ message: "Login realizado" });
    } catch (e) {
        next(e);
    }
};