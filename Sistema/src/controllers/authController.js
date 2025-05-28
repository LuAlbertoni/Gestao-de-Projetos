const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtCfg = require("../config/jwt");

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
        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome, email: usuario.email },
            jwtCfg.secret,
            { expiresIn: jwtCfg.expiresIn }
        );
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === "true",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ message: "Login realizado" });
    } catch (e) {
        next(e);
    }
};

exports.me = async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: "Token não encontrado" });
    jwt.verify(token, jwtCfg.secret, async (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token inválido" });
        const usuario = await Usuario.findById(decoded.id);
        if (!usuario)
            return res.status(404).json({ error: "Usuário não encontrado" });
        res.json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
    });
};

exports.logout = (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: "strict",
    });
    res.json({ message: "Logout realizado" });
};