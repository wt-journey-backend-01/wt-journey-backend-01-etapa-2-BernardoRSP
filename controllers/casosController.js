const casosRepository = require("../repositories/casosRepositories.js");
const agentesRepository = require("../repositories/agentesRepositories.js");

function getAllCasos(req, res) {
  if (casosRepository.findAll().length === 0) {
    return res.status(404).json({ status: 404, mensagem: "Nenhum caso encontrado" });
  }
  res.status(200).json(casosRepository.findAll());
}

function getCasoById(req, res) {
  const casoId = req.params.id;
  const caso = casosRepository.findById(casoId);

  if (!caso) {
    return res.status(404).send("ID do caso não encontrado");
  }
  res.status(200).json(caso);
}

function adicionarCaso(req, res) {
  const { id, titulo, descricao, status, agente_id } = req.body;
  const erros = [];
  if (!id || !titulo || !descricao || !status || !agente_id) {
    erros.push("Todos os campos são obrigatórios");
  }
  if (status !== "aberto" && status !== "fechado") {
    erros.push("status: O Status deve ser 'aberto' ou 'fechado'");
  }
  if (casosRepository.findById(id)) {
    erros.push("id: Já existe um caso com esse ID");
  }
  if (!id.match(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/)) {
    erros.push("id: O ID deve ser um UUID válido");
  }
  if (!agentesRepository.findById(agente_id)) {
    erros.push("agente_id: O UUID do agente não foi encontrado");
  }
  // Se houver erros, retorna o status 400 com os erros
  if (erros.length > 0) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
  }

  casosRepository.adicionar({ id, titulo, descricao, status, agente_id });
  res.status(201).json({ id, titulo, descricao, status, agente_id });
}

// Deleta um caso por ID
function deleteCasoById(req, res) {
  const casoId = req.params.id;
  if (!casosRepository.findById(casoId)) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado" });
  }
  casosRepository.deleteById(casoId);
  res.status(204).send();
}

module.exports = {
  getAllCasos,
  getCasoById,
  adicionarCaso,
  deleteCasoById,
};
