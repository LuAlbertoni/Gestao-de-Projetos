const { pool } = require("../config/db");

class Usuario {
    static async findByEmail(email) {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM usuarios WHERE email = ?", [
            email,
        ]);
        conn.release();
        return rows[0] || null;
    }

    static async findById(id) {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM usuarios WHERE id = ?", [id]);
        conn.release();
        return rows[0] || null;
    }

    static async create({ nome, email, senha }) {
        const conn = await pool.getConnection();
        const res = await conn.query(
            "INSERT INTO usuarios (nome, email, senha, criado_em) VALUES (?, ?, ?, NOW())",
            [nome, email, senha]
        );
        const rows = await conn.query("SELECT * FROM usuarios WHERE id = ?", [
            res.insertId,
        ]);
        conn.release();
        return rows[0] || null;
    }
}
module.exports = Usuario;