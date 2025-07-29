const casosRepository = require("../repositories/casosRepository.js");
const agentesRepository = require("../repositories/agentesRepository.js");
const { v4: uuidv4, validate: isUUID } = require("uuid");

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
  if (!agentesRepository.findById(agente_id)) {
    return res.status(404).json({ status: 404, mensagem: "Agente com o ID fornecido não foi encontrado." });
  }
  const novoCaso = {
    id: uuidv4(),
    titulo,
    descricao,
    status,
    agente_id,
  };
  casosRepository.adicionar(novoCaso);
  res.status(201).json(novoCaso);
}

function atualizarCaso(req, res) {
  const { id } = req.params;
  if (!casosRepository.findById(id)) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado." });
  }

  const dadosParaAtualizar = req.body;
  dadosParaAtualizar.id = id;

  const casoAtualizado = casosRepository.atualizar(dadosParaAtualizar, id);
  res.status(200).json(casoAtualizado);
}

function atualizarCasoParcial(req, res) {
  const { id } = req.params;
  if (!casosRepository.findById(id)) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado." });
  }
  const casoAtualizado = casosRepository.atualizarParcial(req.body, id);
  res.status(200).json(casoAtualizado);
}

function deleteCasoById(req, res) {
  const { id } = req.params;
  const sucesso = casosRepository.deleteById(id);
  if (!sucesso) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado." });
  }
  res.status(204).send();
}

module.exports = {
  getAllCasos,
  getCasoById,
  adicionarCaso,
  atualizarCaso,
  atualizarCasoParcial,
  deleteCasoById,
};
