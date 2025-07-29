const agentesRepository = require("../repositories/agentesRepository.js");
const { v4: uuidv4, validate: isUUID } = require("uuid");

function getAllAgentes(req, res) {
  res.status(200).json(agentesRepository.findAll());
}

function getAgenteById(req, res) {
  const { id } = req.params;
  if (!isUUID(id)) {
    return res.status(400).json({ status: 400, mensagem: "O ID deve ser um UUID válido." });
  }
  const agente = agentesRepository.findById(id);
  if (!agente) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado." });
  }
  res.status(200).json(agente);
}

function adicionarAgente(req, res) {
  const { nome, dataDeIncorporacao, cargo } = req.body;

  const dataRecebida = new Date(dataDeIncorporacao.replace(/\//g, "-"));
  const dataAtual = new Date();
  dataAtual.setHours(0, 0, 0, 0);

  if (dataRecebida > dataAtual) {
    return res.status(400).json({ status: 400, mensagem: "A data de incorporação não pode ser uma data futura." });
  }

  const novoAgente = {
    id: uuidv4(),
    nome,
    dataDeIncorporacao,
    cargo,
  };
  agentesRepository.adicionar(novoAgente);
  res.status(201).json(novoAgente);
}

function atualizarAgente(req, res) {
  const { id } = req.params;
  if (!agentesRepository.findById(id)) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado." });
  }

  const dadosParaAtualizar = req.body;

  // CORREÇÃO: Adicionada a validação de data futura também no PUT.
  if (dadosParaAtualizar.dataDeIncorporacao) {
    const dataRecebida = new Date(dadosParaAtualizar.dataDeIncorporacao.replace(/\//g, "-"));
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
    if (dataRecebida > dataAtual) {
      return res.status(400).json({ status: 400, mensagem: "A data de incorporação não pode ser uma data futura." });
    }
  }

  dadosParaAtualizar.id = id;

  const agenteAtualizado = agentesRepository.atualizar(dadosParaAtualizar, id);
  res.status(200).json(agenteAtualizado);
}

function atualizarAgenteParcial(req, res) {
  const { id } = req.params;
  if (!agentesRepository.findById(id)) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado." });
  }

  const novosDados = req.body;
  if (novosDados.dataDeIncorporacao) {
    const dataRecebida = new Date(novosDados.dataDeIncorporacao.replace(/\//g, "-"));
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
    if (dataRecebida > dataAtual) {
      return res.status(400).json({ status: 400, mensagem: "A data de incorporação não pode ser uma data futura." });
    }
  }

  const agenteAtualizado = agentesRepository.atualizarParcial(novosDados, id);
  res.status(200).json(agenteAtualizado);
}

function deleteAgenteById(req, res) {
  const { id } = req.params;
  const sucesso = agentesRepository.deleteById(id);
  if (!sucesso) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado." });
  }
  res.status(204).send();
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  adicionarAgente,
  atualizarAgente,
  atualizarAgenteParcial,
  deleteAgenteById,
};
