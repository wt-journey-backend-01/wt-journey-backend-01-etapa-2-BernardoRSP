const express = require("express");
const app = express();
const port = 3000;

const agentesRoutes = require("./routes/agentes.routes.js");
const casosRoutes = require("./routes/casos.routes.js");
const setupSwagger = require("./docs/swagger.js");
const errorHandler = require("./utils/errorHandler.js");

// Middleware para interpretar JSON - Essencial que venha primeiro
app.use(express.json());

// Rotas da API
app.use("/agentes", agentesRoutes);
app.use("/casos", casosRoutes);

// Configuração do Swagger para documentação
setupSwagger(app);

// Middleware de tratamento de erros - Essencial que venha por último
app.use(errorHandler);

// Inicia o servidor
app.listen(port, () => {
  console.log(`\nServidor do departamento de polícia rodando em http://localhost:${port}`);
  console.log(`Documentação da API disponível em http://localhost:${port}/api-docs`);
});
