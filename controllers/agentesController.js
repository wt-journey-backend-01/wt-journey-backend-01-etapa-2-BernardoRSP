const agentesRepository = require("../repositories/agentesRepository.js");
const { v4: uuidv4, validate: isUUID } = require("uuid");

function getAllAgentes(req, res) {
  const agentes = agentesRepository.findAll();
  res.status(200).json(agentes);
}

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
      const dataA = new Date(a.dataDeIncorporacao.replace(/\//g, "-"));
      const dataB = new Date(b.dataDeIncorporacao.replace(/\//g, "-"));
      return ordenarPorData === "asc" ? dataA - dataB : dataB - dataA;
    });
  }

  res.status(200).json(agentes);
}

function getAgenteById(req, res) {
  const { id } = req.params;
  if (!isUUID(id)) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: { id: "O ID deve ser um UUID válido" } });
  }
  const agente = agentesRepository.findById(id);
  if (!agente || Object.keys(agente).length === 0) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado" });
  }

  res.status(200).json(agente);
}

function adicionarAgente(req, res) {
  const { nome, dataDeIncorporacao, cargo } = req.body;
  const erros = {};

  if (!nome || !dataDeIncorporacao || !cargo) {
    erros.geral = "Os campos 'nome', 'dataDeIncorporacao' e 'cargo' são obrigatórios";
  }

  if (dataDeIncorporacao && !dataDeIncorporacao.match(/^\d{4}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/)) {
    erros.dataDeIncorporacao = "A data de incorporação deve ser uma data válida no formato AAAA-MM-DD";
  } else if (new Date(dataDeIncorporacao) > new Date()) {
    erros.dataDeIncorporacao = "A data de incorporação não pode ser no futuro";
  }

  if (Object.keys(erros).length > 0) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
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
  const { nome, dataDeIncorporacao, cargo, id: bodyId } = req.body;

  if (!isUUID(id)) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: { id: "O ID na URL deve ser um UUID válido" } });
  }

  const erros = {};

  if (bodyId) {
    erros.id = "Não é permitido alterar o ID de um agente.";
  }

  if (!nome || !dataDeIncorporacao || !cargo) {
    erros.geral = "Todos os campos são obrigatórios para atualização completa (PUT)";
  }

  if (dataDeIncorporacao && !dataDeIncorporacao.match(/^\d{4}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/)) {
    erros.dataDeIncorporacao = "A data de incorporação deve ser uma data válida no formato AAAA-MM-DD";
  } else if (new Date(dataDeIncorporacao) > new Date()) {
    erros.dataDeIncorporacao = "A data de incorporação não pode ser no futuro";
  }

  if (Object.keys(erros).length > 0) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
  }

  const agenteAtualizado = agentesRepository.atualizar({ id, nome, dataDeIncorporacao, cargo }, id);
  if (!agenteAtualizado) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado" });
  }

  res.status(200).json(agenteAtualizado);
}

function atualizarAgenteParcial(req, res) {
  const { id } = req.params;
  const novosDados = req.body;

  if (!isUUID(id)) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: { id: "O ID na URL deve ser um UUID válido" } });
  }

  const erros = {};

  if (novosDados.id) {
    erros.id = "Não é permitido alterar o ID de um agente.";
  }

  if (novosDados.dataDeIncorporacao) {
    if (!novosDados.dataDeIncorporacao.match(/^\d{4}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/)) {
      erros.dataDeIncorporacao = "A data de incorporação deve ser uma data válida no formato AAAA-MM-DD";
    } else if (new Date(novosDados.dataDeIncorporacao) > new Date()) {
      erros.dataDeIncorporacao = "A data de incorporação não pode ser no futuro";
    }
  }

  if (Object.keys(novosDados).length === 0) {
    return res.status(400).json({
      status: 400,
      mensagem: "É necessário fornecer pelo menos um campo para atualização.",
    });
  }

  // Validar somente campos válidos:
  const camposValidos = ["nome", "dataDeIncorporacao", "cargo"];
  const camposInvalidos = Object.keys(novosDados).filter((campo) => !camposValidos.includes(campo));

  if (camposInvalidos.length > 0) {
    return res.status(400).json({
      status: 400,
      mensagem: "Parâmetros inválidos",
      errors: { camposInvalidos: `Campos não reconhecidos: ${camposInvalidos.join(", ")}` },
    });
  }

  if (Object.keys(erros).length > 0) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
  }

  const agenteAtualizado = agentesRepository.atualizarParcial(novosDados, id);
  if (!agenteAtualizado) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado" });
  }

  res.status(200).json(agenteAtualizado);
}

function deleteAgenteById(req, res) {
  const { id } = req.params;
  if (!isUUID(id)) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: { id: "O ID deve ser um UUID válido" } });
  }
  const sucesso = agentesRepository.deleteById(id);
  if (!sucesso) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado" });
  }
  res.status(204).send();
}

module.exports = {
  getAllAgentes,
  getAgentesFiltrados,
  getAgenteById,
  adicionarAgente,
  deleteAgenteById,
  atualizarAgente,
  atualizarAgenteParcial,
};
