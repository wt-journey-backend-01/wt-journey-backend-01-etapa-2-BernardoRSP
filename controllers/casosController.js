const casosRepository = require("../repositories/casosRepository.js");
const agentesRepository = require("../repositories/agentesRepository.js");
const { v4: uuidv4, validate: isUUID } = require("uuid");

function listarCasos(req, res) {
  const casos = casosRepository.listar();
  res.status(200).json(casos);
}

function getCasosFiltrados(req, res) {
  let { status, agente_id, q, ordenarPor } = req.query;
  let casos = casosRepository.listar();

  if (status && status !== "aberto" && status !== "fechado") {
    return res.status(400).json({ status: 400, mensagem: "Parâmetro 'status' inválido. Use 'aberto' ou 'fechado'." });
  }

  if (status) {
    casos = casos.filter((caso) => caso.status.toLowerCase() === status);
  }

  if (agente_id) {
    casos = casos.filter((caso) => caso.agente_id === agente_id);
  }

  if (q) {
    const keyword = q.toLowerCase();
    casos = casos.filter((caso) => caso.titulo.toLowerCase().includes(keyword) || caso.descricao.toLowerCase().includes(keyword));
  }

  if (ordenarPor === "titulo_asc" || ordenarPor === "titulo_desc") {
    casos.sort((a, b) => {
      const tituloA = a.titulo.toLowerCase();
      const tituloB = b.titulo.toLowerCase();
      if (tituloA < tituloB) return ordenarPor === "titulo_asc" ? -1 : 1;
      if (tituloA > tituloB) return ordenarPor === "titulo_asc" ? 1 : -1;
      return 0;
    });
  }

  res.status(200).json(casos);
}

function getAgenteDoCaso(req, res) {
  const { id } = req.params;

  if (!isUUID(id)) {
    return res.status(404).json({ status: 404, mensagem: "Parâmetros inválidos", errors: { id: "O ID do caso deve ser um UUID válido" } });
  }
  const caso = casosRepository.encontrar(id);
  if (!caso) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado" });
  }
  const agente = agentesRepository.encontrar(caso.agente_id);
  if (!agente) {
    return res.status(404).json({ status: 404, mensagem: "Agente associado ao caso não encontrado" });
  }
  res.status(200).json(agente);
}

function encontrarCaso(req, res) {
  const { id } = req.params;
  if (!isUUID(id)) {
    return res.status(404).json({ status: 404, mensagem: "Parâmetros inválidos", errors: { id: "O ID deve ser um UUID válido" } });
  }
  const caso = casosRepository.encontrar(id);
  if (!caso || Object.keys(caso).length === 0) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado" });
  }
  res.status(200).json(caso);
}

function adicionarCaso(req, res) {
  const { titulo, descricao, status, agente_id } = req.body;
  // Se o agente não existir, retorna 404
  const agenteDoCaso = agentesRepository.encontrar(agente_id);
  if (!agenteDoCaso || Object.keys(agenteDoCaso).length === 0) {
    return res.status(404).json({ status: 404, mensagem: "O agente com o ID fornecido não foi encontrado" });
  }
  const erros = {};
  if (!titulo || !descricao || !status || !agente_id) {
    erros.geral = "Os campos 'titulo', 'descricao', 'status' e 'agente_id' são obrigatórios";
  }
  if (status && status !== "aberto" && status !== "fechado") {
    erros.status = "O Status deve ser 'aberto' ou 'fechado'";
  }
  if (agente_id && !isUUID(agente_id)) {
    erros.agente_id = "O agente_id deve ser um UUID válido";
  }
  if (Object.keys(erros).length > 0) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
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

/*function atualizarCaso(req, res) {
  const { id } = req.params;
  const { titulo, descricao, status, agente_id, id: bodyId } = req.body;
  if (!isUUID(id)) {
    return res.status(404).json({ status: 404, mensagem: "Parâmetros inválidos", errors: { id: "O ID na URL deve ser um UUID válido" } });
  }

  const casoAtualizado = casosRepository.atualizar({ id, titulo, descricao, status, agente_id }, id);
  if (!casoAtualizado) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado" });
  }
  const erros = {};

  if (bodyId) {
    erros.id = "Não é permitido alterar o ID de um caso.";
  }
  if (!titulo || !descricao || !status || !agente_id) {
    erros.geral = "Todos os campos são obrigatórios para atualização completa (PUT)";
  }
  if (status && status !== "aberto" && status !== "fechado") {
    erros.status = "O Status deve ser 'aberto' ou 'fechado'";
  }
  if (agente_id && !isUUID(agente_id)) {
    erros.agente_id = "O agente_id deve ser um UUID válido";
  } else if (agente_id && !agentesRepository.encontrar(agente_id)) {
    erros.agente_id = "O agente com o ID fornecido não foi encontrado";
  }
  if (Object.keys(erros).length > 0) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
  }

  res.status(200).json(casoAtualizado);
}*/

function atualizarCaso(req, res) {
  const { id } = req.params;
  const dados = req.body;

  const casoExistente = casosRepository.encontrar(id);
  if (!casoExistente) return res.status(404).json({ mensagem: "Caso não encontrado" });

  delete dados.id;

  // Filtra apenas os campos válidos com base no objeto original
  const dadosValidos = Object.keys(dados).reduce((obj, chave) => {
    if (casoExistente.hasOwnProperty(chave)) {
      obj[chave] = dados[chave];
    }
    return obj;
  }, {});

  const casoAtualizado = casosRepository.atualizar(dadosValidos, id);
  res.json(casoAtualizado);
}

function atualizarCasoParcial(req, res) {
  const { id } = req.params;
  const dados = req.body;

  const casoExistente = casosRepository.encontrar(id);
  if (!casoExistente) return res.status(404).json({ mensagem: "Caso não encontrado" });

  // Filtra apenas os campos válidos com base no objeto original
  const dadosValidos = Object.keys(dados).reduce((obj, chave) => {
    if (casoExistente.hasOwnProperty(chave)) {
      obj[chave] = dados[chave];
    }
    return obj;
  }, {});

  const casoAtualizado = casosRepository.atualizarParcial(dadosValidos, id);
  res.json(casoAtualizado);
}

function deletarCaso(req, res) {
  const { id } = req.params;
  if (!isUUID(id)) {
    return res.status(404).json({ status: 404, mensagem: "Parâmetros inválidos", errors: { id: "O ID deve ser um UUID válido" } });
  }
  const sucesso = casosRepository.deletar(id);
  if (!sucesso) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado" });
  }
  res.status(204).send();
}

module.exports = {
  listarCasos,
  encontrarCaso,
  adicionarCaso,
  atualizarCaso,
  atualizarCasoParcial,
  deletarCaso,
  getAgenteDoCaso,
  getCasosFiltrados,
};
