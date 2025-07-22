const express = require("express");
const app = express();
const port = 3000;

const agentesRoutes = require("./routes/agentesRoutes.js");
const casosRoutes = require("./routes/casosRoutes.js");

app.use(express.json());
app.use("/", casosRoutes);
app.use("/", agentesRoutes);

/*// Rota para obter todos os usuários
app.get("/usuarios", (req, res) => {
  res.status(200).json(usuarios);
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
});

// Rota para obter um usuário específico por ID
app.get("/usuarios/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === userId);

  if (!usuario) {
    return res.status(404).send("Erro 404: Usuário não encontrado");
  }
  res.status(200).json(usuario);
});*/

// Inicia o servidor
app.listen(port, () => {
  console.log(`\nServidor do departamento de polícia rodando em http://localhost:${port}`);
});
