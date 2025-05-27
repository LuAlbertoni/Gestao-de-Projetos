const mariadb = require("mariadb");

async function createDatabaseIfNotExists() {
  const conn = await mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  await conn.end();
}

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

async function initDb() {
  await createDatabaseIfNotExists();

  const conn = await pool.getConnection();

  await conn.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      senha VARCHAR(255) NOT NULL,
      criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS receitas (
      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      ingredientes TEXT NOT NULL,
      modo_preparo TEXT NOT NULL,
      tempo_preparo VARCHAR(50) DEFAULT NULL,
      rendimento VARCHAR(50) DEFAULT NULL,
      usuario_id INT(11),
      criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
    );
  `);
  conn.release();
}

module.exports = { pool, initDb };