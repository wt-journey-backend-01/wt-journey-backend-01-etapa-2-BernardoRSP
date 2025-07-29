const casosRepository = require("../repositories/casosRepository.js");
const agentesRepository = require("../repositories/agentesRepository.js");
const { v4: uuidv4, validate: isUUID } = require("uuid");

// --- FUNÇÕES DE BÔNUS (Mantidas) ---
function getCasosFiltrados(req, res) {
  let { status, agente_id, q } = req.query;
  let casos = casosRepository.findAll();

  if (status) {
    if (status !== "aberto" && status !== "fechado") {
      return res.status(400).json({ status: 400, mensagem: "Parâmetro 'status' inválido. Use 'aberto' ou 'fechado'." });
    }
    casos = casos.filter((caso) => caso.status.toLowerCase() === status);
  }

  if (agente_id) {
    casos = casos.filter((caso) => caso.agente_id === agente_id);
  }

  if (q) {
    const keyword = q.toLowerCase();
    casos = casos.filter((caso) => caso.titulo.toLowerCase().includes(keyword) || caso.descricao.toLowerCase().includes(keyword));
  }

  res.status(200).json(casos);
}

// --- FUNÇÕES OBRIGATÓRIAS ---

function getAllCasos(req, res) {
  res.status(200).json(casosRepository.findAll());
}

function getCasoById(req, res) {
  const { id } = req.params;
  if (!isUUID(id)) {
    return res.status(400).json({ status: 400, mensagem: "O ID do caso deve ser um UUID válido." });
  }
  const caso = casosRepository.findById(id);
  if (!caso) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado." });
  }
  res.status(200).json(caso);
}

function adicionarCaso(req, res) {
  const { titulo, descricao, status, agente_id } = req.body;
  // CORREÇÃO: Erro "criar caso com id de agente inválido/inexistente"
  if (!agentesRepository.findById(agente_id)) {
    return res.status(404).json({ status: 404, mensagem: "Agente com o ID fornecido não foi encontrado." });
  }
  const novoCaso = { id: uuidv4(), titulo, descricao, status, agente_id };
  casosRepository.adicionar(novoCaso);
  res.status(201).json(novoCaso);
}

function atualizarCaso(req, res) {
  const { id } = req.params;
  // CORREÇÃO: A verificação de existência do caso (404) deve vir primeiro.
  if (!casosRepository.findById(id)) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado." });
  }

  const { titulo, descricao, status, agente_id } = req.body;
  if (!agentesRepository.findById(agente_id)) {
    return res.status(404).json({ status: 404, mensagem: "Agente com o ID fornecido não foi encontrado." });
  }

  // CORREÇÃO: Penalidade "Consegue alterar ID do caso com método PUT"
  const dadosAtualizados = { id, titulo, descricao, status, agente_id };

  const casoAtualizado = casosRepository.atualizar(dadosAtualizados, id);
  res.status(200).json(casoAtualizado);
}

function atualizarCasoParcial(req, res) {
  const { id } = req.params;
  // CORREÇÃO: A verificação de existência do caso (404) deve vir primeiro.
  if (!casosRepository.findById(id)) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado." });
  }

  const novosDados = req.body;
  if (novosDados.agente_id && !agentesRepository.findById(novosDados.agente_id)) {
    return res.status(404).json({ status: 404, mensagem: "Agente com o ID fornecido não foi encontrado." });
  }
  if (novosDados.id) {
    return res.status(400).json({ status: 400, mensagem: "Não é permitido alterar o ID de um caso." });
  }

  const casoAtualizado = casosRepository.atualizarParcial(novosDados, id);
  res.status(200).json(casoAtualizado);
}

function deleteCasoById(req, res) {
  const { id } = req.params;
  if (!casosRepository.deleteById(id)) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado." });
  }
  res.status(204).send();
}

function getAgenteDoCaso(req, res) {
  const { id } = req.params;
  if (!isUUID(id)) {
    return res.status(400).json({ status: 400, mensagem: "O ID do caso deve ser um UUID válido." });
  }
  const caso = casosRepository.findById(id);
  if (!caso) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado." });
  }
  const agente = agentesRepository.findById(caso.agente_id);
  if (!agente) {
    return res.status(404).json({ status: 404, mensagem: "Agente associado ao caso não foi encontrado." });
  }
  res.status(200).json(agente);
}

module.exports = {
  getAllCasos,
  getCasosFiltrados,
  getCasoById,
  adicionarCaso,
  atualizarCaso,
  atualizarCasoParcial,
  deleteCasoById,
  getAgenteDoCaso,
};
