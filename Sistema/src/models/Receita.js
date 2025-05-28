const { pool } = require("../config/db");

class Receita {
    static async create({
        nome,
        ingredientes,
        modo_preparo,
        tempo_preparo,
        rendimento,
    }) {
        const conn = await pool.getConnection();
        const res = await conn.query(
            `INSERT INTO receitas (nome, ingredientes, modo_preparo, tempo_preparo, rendimento, criado_em)
       VALUES (?, ?, ?, ?, ?, NOW())`,
            [nome, ingredientes, modo_preparo, tempo_preparo, rendimento]
        );
        const rows = await conn.query(
            `SELECT * FROM receitas WHERE id = ?`,
            [res.insertId]
        );
        conn.release();
        return rows[0] || null;
    }
}

module.exports = Receita;