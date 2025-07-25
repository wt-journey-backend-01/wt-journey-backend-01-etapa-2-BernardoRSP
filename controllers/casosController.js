const casosRepository = require("../repositories/casosRepository.js");
const agentesRepository = require("../repositories/agentesRepository.js");

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
  const erros = {};
  if (!id || !titulo || !descricao || !status || !agente_id) {
    erros.geral = "Todos os campos são obrigatórios";
  }
  if (status !== "aberto" && status !== "fechado") {
    erros.status = "O Status deve ser 'aberto' ou 'fechado'";
  }
  if (casosRepository.findById(id)) {
    erros.id = "Já existe um caso com esse ID";
  }
  if (!id.match(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/i)) {
    erros.id = "O ID deve ser um UUID válido";
  }
  if (!agentesRepository.findById(agente_id)) {
    erros.agente_id = "O UUID do agente não foi encontrado";
  }
  // Se houver erros, retorna o status 400 com os erros
  if (erros.length > 0) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
  }

  casosRepository.adicionar({ id, titulo, descricao, status, agente_id });
  res.status(201).json({ id, titulo, descricao, status, agente_id });
}

// Atualizar um caso
function atualizarCaso(req, res) {
  const casoId = req.params.id;
  const novosDados = ({ id, titulo, descricao, status, agente_id } = req.body);
  // Validação dos dados do caso
  const erros = {};
  if (!id || !titulo || !descricao || !status || !agente_id) {
    erros.geral = "Todos os campos são obrigatórios";
  }
  if (status !== "aberto" && status !== "fechado") {
    erros.status = "O Status deve ser 'aberto' ou 'fechado'";
  }
  if (casosRepository.findById(id) && casosRepository.findById(id).id !== casoId) {
    erros.id = "Já existe um caso com esse ID";
  }
  if (id && !id.match(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/i)) {
    erros.id = "O ID deve ser um UUID válido";
  }
  // Se houver erros, retorna o status 400 com os erros
  if (Object.keys(erros).length > 0) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
  }
  // Se não houver erros, atualiza o caso
  const casoAtualizado = casosRepository.atualizar(novosDados, casoId);
  // Se o caso não for encontrado, retorna 404
  if (!casoAtualizado) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado" });
  }
  res.status(200).json(casoAtualizado);
}

// Atualizar um caso parcialmente
function atualizarCasoParcial(req, res) {
  const casoId = req.params.id;
  const novosDados = req.body;
  const erros = {};
  if (novosDados.status !== "aberto" && novosDados.status !== "fechado" && novosDados.status !== undefined) {
    erros.status = "O Status deve ser 'aberto' ou 'fechado'";
  }
  if (casosRepository.findById(novosDados.id)) {
    erros.id = " Já existe um caso com esse ID";
  }
  if (novosDados.id && !novosDados.id.match(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/i)) {
    erros.id = "O ID deve ser um UUID válido";
  }
  // Se houver erros, retorna o status 400 com os erros
  if (Object.keys(erros).length > 0) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
  }
  const casoAtualizado = casosRepository.atualizarParcial(novosDados, casoId);
  if (!casoAtualizado) {
    return res.status(404).json({ status: 404, mensagem: "Caso não encontrado" });
  }
  res.status(200).json(casoAtualizado);
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
  atualizarCaso,
  atualizarCasoParcial,
};
