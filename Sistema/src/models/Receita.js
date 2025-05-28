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

    static async update(
        id,
        { nome, ingredientes, modo_preparo, tempo_preparo, rendimento }
    ) {
        const conn = await pool.getConnection();
        const res = await conn.query(
            `UPDATE receitas SET nome=?, ingredientes=?, modo_preparo=?, tempo_preparo=?, rendimento=? WHERE id=?`,
            [
                nome,
                ingredientes,
                modo_preparo,
                tempo_preparo,
                rendimento,
                id,
            ]
        );
        conn.release();
        return res.affectedRows > 0;
    }

    static async delete(id) {
        const conn = await pool.getConnection();
        const res = await conn.query(
            `DELETE FROM receitas WHERE id=?`,
            [id]
        );
        conn.release();
        return res.affectedRows > 0;
    }
}

module.exports = Receita;