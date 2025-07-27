const agentesRepository = require("../repositories/agentesRepository.js");
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
  const novoAgente = { id, nome, dataDeIncorporacao, cargo };
  // Validação dos dados do agente
  const erros = {};
  if (!id || !nome || !dataDeIncorporacao || !cargo) {
    erros.geral = "Todos os campos são obrigatórios";
  }
  if (!dataDeIncorporacao.match(/^(19[7-9][0-9]|20[0-1][0-9]|202[0-5])\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/)) {
    erros.dataDeIncorporacao = "A data de incorporação deve ser uma data válida no formato AAAA/MM/DD";
  }
  if (agentesRepository.findById(id)) {
    erros.id = "Já existe um agente com esse ID";
  }
  if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
    erros.id = "O ID deve ser um UUID válido";
  }
  // Se houver erros, retorna o status 400 com os erros
  if (Object.keys(erros).length > 0) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
  }
  // Se não houver erros, adiciona o agente
  agentesRepository.adicionar(novoAgente);
  res.status(201).json(novoAgente);
}

// Atualizar um agente
function atualizarAgente(req, res) {
  const agenteId = req.params.id;
  const novosDados = ({ id, nome, dataDeIncorporacao, cargo } = req.body);
  // Validação dos dados do agente
  const erros = {};
  if (!id || !nome || !dataDeIncorporacao || !cargo) {
    erros.geral = "Todos os campos são obrigatórios";
  }
  if (dataDeIncorporacao && !dataDeIncorporacao.match(/^(19[7-9][0-9]|20[0-1][0-9]|202[0-5])\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/)) {
    erros.dataDeIncorporacao = "A data de incorporação deve ser uma data válida no formato AAAA/MM/DD";
  }

  if (agentesRepository.findById(id) && agentesRepository.findById(id).id !== agenteId) {
    erros.id = "Já existe um agente com esse ID";
  }
  if (id && !id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
    erros.id = "O ID deve ser um UUID válido";
  }
  // Se houver erros, retorna o status 400 com os erros
  if (Object.keys(erros).length > 0) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
  }
  // Se não houver erros, atualiza o agente
  const agenteAtualizado = agentesRepository.atualizar(novosDados, agenteId);
  // Se o agente não for encontrado, retorna 404
  if (!agenteAtualizado) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado" });
  }
  res.status(200).json(agenteAtualizado);
}

// Atualizar um agente parcialmente
function atualizarAgenteParcial(req, res) {
  const agenteId = req.params.id;
  const novosDados = req.body;
  const erros = {};
  if (novosDados.id && novosDados.id !== agenteId && agentesRepository.findById(novosDados.id)) {
    erros.id = " Já existe um agente com esse ID";
  }
  if (novosDados.id && !novosDados.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
    erros.id = "O ID deve ser um UUID válido";
  }
  if (novosDados.dataDeIncorporacao && !novosDados.dataDeIncorporacao.match(/^(19[7-9][0-9]|20[0-1][0-9]|202[0-5])\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/)) {
    erros.dataDeIncorporacao = "A data de incorporação deve ser uma data válida no formato AAAA/MM/DD";
  }
  // Se houver erros, retorna o status 400 com os erros
  if (Object.keys(erros).length > 0) {
    return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
  }
  const agenteAtualizado = agentesRepository.atualizarParcial(novosDados, agenteId);
  if (!agenteAtualizado) {
    return res.status(404).json({ status: 404, mensagem: "agente não encontrado" });
  }
  res.status(200).json(agenteAtualizado);
}

// Deletar um agente por ID
function deleteAgenteById(req, res) {
  const agenteId = req.params.id;
  if (!agentesRepository.findById(agenteId)) {
    return res.status(404).json({ status: 404, mensagem: "Agente não encontrado" });
  }
  // Se o agente existir, chama o repositório para deletar
  agentesRepository.deleteById(agenteId);
  res.status(204).send();
}

function getAgentesFiltrados(req, res) {
  const { especialidade, ordenarPorData } = req.query;
  let agentes = agentesRepository.findAll();

  if (especialidade) {
    const esp = especialidade.toLowerCase();
    agentes = agentes.filter((agente) => agente.especialidade.toLowerCase().includes(esp));
  }

  if (ordenarPorData === "asc" || ordenarPorData === "desc") {
    agentes.sort((a, b) => {
      const dataA = Date.parse(a.data_incorporacao);
      const dataB = Date.parse(b.data_incorporacao);
      return ordenarPorData === "asc" ? dataA - dataB : dataB - dataA;
    });
  }

  res.json(agentes);
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  adicionarAgente,
  deleteAgenteById,
  atualizarAgente,
  atualizarAgenteParcial,
  getAgentesFiltrados,
};
