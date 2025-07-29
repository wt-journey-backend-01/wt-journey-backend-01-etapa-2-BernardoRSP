const agentesRepository = require("../repositories/agentesRepository.js");
const { v4: uuidv4, validate: isUUID } = require("uuid");

// --- FUNÇÕES DE BÔNUS (Mantidas) ---
function getAgentesFiltrados(req, res) {
  const { cargo, ordenarPorData } = req.query;
  let agentes = agentesRepository.findAll();

  if (ordenarPorData && ordenarPorData !== "asc" && ordenarPorData !== "desc") {
    return res.status(400).json({ status: 400, mensagem: "Parâmetro 'ordenarPorData' inválido. Use 'asc' ou 'desc'." });
  }

  if (cargo) {
    const cargoFormatado = cargo.toLowerCase();
    agentes = agentes.filter((agente) => agente.cargo.toLowerCase().includes(cargoFormatado));
  }

  if (ordenarPorData) {
    agentes.sort((a, b) => {
      const dataA = new Date(a.dataDeIncorporacao);
      const dataB = new Date(b.dataDeIncorporacao);
      return ordenarPorData === "asc" ? dataA - dataB : dataB - dataA;
    });
  }

  res.status(200).json(agentes);
}

// --- FUNÇÕES OBRIGATÓRIAS ---

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

  // CORREÇÃO: Penalidade "Data de incorporação no futuro"
  const dataRecebida = new Date(dataDeIncorporacao);
  const dataAtual = new Date();
  if (dataRecebida > dataAtual) {
    return res.status(400).json({ status: 400, mensagem: "A data de incorporação não pode ser uma data futura." });
  }

  const novoAgente = { id: uuidv4(), nome, dataDeIncorporacao, cargo };
  agentesRepository.adicionar(novoAgente);
  res.status(201).json(novoAgente);
}

function atualizarAgente(req, res) {
  const { id } = req.params;
  // CORREÇÃO: A verificação de existência do agente (404) deve vir primeiro.
  if (!agentesRepository.findById(id)) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado." });
  }

  const { nome, dataDeIncorporacao, cargo } = req.body;

  // Validação de data futura
  const dataRecebida = new Date(dataDeIncorporacao);
  const dataAtual = new Date();
  if (dataRecebida > dataAtual) {
    return res.status(400).json({ status: 400, mensagem: "A data de incorporação não pode ser uma data futura." });
  }

  // CORREÇÃO: Penalidade "Consegue alterar ID do agente com método PUT"
  // Criamos um novo objeto para garantir que o ID da URL seja usado, ignorando qualquer ID do corpo.
  const dadosAtualizados = { id, nome, dataDeIncorporacao, cargo };

  const agenteAtualizado = agentesRepository.atualizar(dadosAtualizados, id);
  res.status(200).json(agenteAtualizado);
}

function atualizarAgenteParcial(req, res) {
  const { id } = req.params;
  // CORREÇÃO: A verificação de existência (404) deve vir primeiro.
  if (!agentesRepository.findById(id)) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado." });
  }

  const novosDados = req.body;

  // CORREÇÃO: Erro "payload em formato incorreto" e "data futura"
  if (novosDados.dataDeIncorporacao) {
    const dataRecebida = new Date(novosDados.dataDeIncorporacao);
    const dataAtual = new Date();
    if (dataRecebida > dataAtual) {
      return res.status(400).json({ status: 400, mensagem: "A data de incorporação não pode ser uma data futura." });
    }
  }
  // Impede a alteração do ID via PATCH
  if (novosDados.id) {
    return res.status(400).json({ status: 400, mensagem: "Não é permitido alterar o ID de um agente." });
  }

  const agenteAtualizado = agentesRepository.atualizarParcial(novosDados, id);
  res.status(200).json(agenteAtualizado);
}

function deleteAgenteById(req, res) {
  const { id } = req.params;
  if (!agentesRepository.deleteById(id)) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado." });
  }
  res.status(204).send();
}

module.exports = {
  getAllAgentes,
  getAgentesFiltrados,
  getAgenteById,
  adicionarAgente,
  atualizarAgente,
  atualizarAgenteParcial,
  deleteAgenteById,
};
