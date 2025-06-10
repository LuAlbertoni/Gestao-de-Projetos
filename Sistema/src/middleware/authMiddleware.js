const jwt = require("jsonwebtoken");
const jwtCfg = require("../config/jwt");

function authenticate(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.redirect("/entrar");
    }

    jwt.verify(token, jwtCfg.secret, (err, user) => {
      if (err) {
        return res.redirect("/entrar");
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor ao autenticar." });
  }
}

module.exports = authenticate;
