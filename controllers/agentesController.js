const agentesRepository = require("../repositories/agentesRepositories.js");
// Exibir todos os agentes
function getAllAgentes(req, res) {
  if (agentesRepository.findAll().length === 0) {
    return res.status(404).json({ status: 404, mensagem: "Nenhum agente encontrado" });
  }
  res.status(200).json(agentesRepository.findAll());
}
// Exibir um agente específico por ID
function getAgenteById(req, res) {
  const agenteId = req.params.id;
  const agente = agentesRepository.findById(agenteId);

  if (!agente) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado" });
  }
  res.status(200).json(agente);
}
// Adicionar um novo agente
function adicionarAgente(req, res) {
  const { id, nome, dataDeIncorporacao, cargo } = req.body;
  const erros = [];
  if (!id || !nome || !dataDeIncorporacao || !cargo) {
    erros.push("Todos os campos são obrigatórios");
  }
  if (!dataDeIncorporacao.match(/^[1970-2025]{4}\/[1-12]{2}\/[1-31]{2}$/)) {
    erros.push("dataDeIncorporacao: A data de incorporação deve ser uma data válida no formato AAAA/MM/DD");
  }
  if (agentesRepository.findById(id)) {
    erros.push("id: Já existe um agente com esse ID");
  }
  if (!id.match(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/)) {
    erros.push("id: O ID deve ser um UUID válido");
  }
  // Se houver erros, retorna o status 400 com os erros
  if (erros.length > 0) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
  }
  // Se não houver erros, adiciona o agente
  agentesRepository.adicionar({ id, nome, dataDeIncorporacao, cargo });
  res.status(201).json({ id, nome, dataDeIncorporacao, cargo });
}

// Deletar um agente por ID
function deleteAgenteById(req, res) {
  const agenteId = req.params.id;
  if (!agentesRepository.findById(agenteId)) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado" });
  }
  // Se o agente existir, chama o repositório para deletar
  agentesRepository.deleteById(agenteId);
  res.status(204);
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  adicionarAgente,
  deleteAgenteById,
};
