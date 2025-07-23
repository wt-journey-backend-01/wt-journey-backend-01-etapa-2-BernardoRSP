const express = require("express");
const app = express();
const port = 3000;

const agentesRoutes = require("./routes/agentesRoutes.js");
const casosRoutes = require("./routes/casosRoutes.js");

app.use(express.json());
app.use("/casos", casosRoutes);
app.use("/agentes", agentesRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`\nServidor do departamento de polícia rodando em http://localhost:${port}`);
});
