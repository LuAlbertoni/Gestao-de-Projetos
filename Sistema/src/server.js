const app = require("./app");
const { initDb } = require("./config/db");

const port = process.env.PORT || 3000;
initDb().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});
 