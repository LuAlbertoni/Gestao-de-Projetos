const { pool } = require("../config/db");

class Receita {
  static async create({
    nome,
    ingredientes,
    modo_preparo,
    tempo_preparo,
    rendimento,
    usuario_id,
  }) {
    const conn = await pool.getConnection();
    const res = await conn.query(
      `INSERT INTO receitas (nome, ingredientes, modo_preparo, tempo_preparo, rendimento, usuario_id, criado_em)
     VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [nome, ingredientes, modo_preparo, tempo_preparo, rendimento, usuario_id]
    );
    const rows = await conn.query(
      `SELECT r.*, u.nome as autor FROM receitas r LEFT JOIN usuarios u ON r.usuario_id = u.id WHERE r.id = ?`,
      [res.insertId]
    );
    conn.release();
    return rows[0] || null;
  }

  static async findAll({ search }) {
    const conn = await pool.getConnection();
    let rows;
    if (search) {
      rows = await conn.query(
        `SELECT r.*, u.nome as autor FROM receitas r LEFT JOIN usuarios u ON r.usuario_id = u.id WHERE r.nome LIKE ? OR r.ingredientes LIKE ? ORDER BY r.criado_em DESC`,
        [`%${search}%`, `%${search}%`]
      );
    } else {
      rows = await conn.query(
        `SELECT r.*, u.nome as autor FROM receitas r LEFT JOIN usuarios u ON r.usuario_id = u.id ORDER BY r.criado_em DESC`
      );
    }
    conn.release();
    return rows;
  }

  static async findById(id) {
    const conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT r.*, u.nome as autor FROM receitas r LEFT JOIN usuarios u ON r.usuario_id = u.id WHERE r.id = ?`,
      [id]
    );
    conn.release();
    return rows[0] || null;
  }

  static async update(
    id,
    { nome, ingredientes, modo_preparo, tempo_preparo, rendimento },
    usuario_id
  ) {
    const conn = await pool.getConnection();
    const res = await conn.query(
      `UPDATE receitas SET nome=?, ingredientes=?, modo_preparo=?, tempo_preparo=?, rendimento=? WHERE id=? AND usuario_id=?`,
      [
        nome,
        ingredientes,
        modo_preparo,
        tempo_preparo,
        rendimento,
        id,
        usuario_id,
      ]
    );
    conn.release();
    return res.affectedRows > 0;
  }

  static async delete(id, usuario_id) {
    const conn = await pool.getConnection();
    const res = await conn.query(
      `DELETE FROM receitas WHERE id=? AND usuario_id=?`,
      [id, usuario_id]
    );
    conn.release();
    return res.affectedRows > 0;
  }
}

module.exports = Receita;