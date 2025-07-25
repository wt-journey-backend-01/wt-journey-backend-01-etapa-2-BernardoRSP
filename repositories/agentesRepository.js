// Repositório de agentes
const agentes = [
  {
    id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "2010/03/12",
    cargo: "delegado",
  },
  {
    id: "2b1e7a8c-1a2b-4c3d-9e4f-2a5b6c7d8e9f",
    nome: "Bernardo Rezende",
    dataDeIncorporacao: "2015/08/27",
    cargo: "investigador",
  },
  {
    id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
    nome: "Sofia Almeida",
    dataDeIncorporacao: "2018/11/19",
    cargo: "escrivã",
  },
  {
    id: "4e5f6a7b-8c9d-0e1f-2a3b-4c5d6e7f8a9b",
    nome: "Miguel Torres",
    dataDeIncorporacao: "2020/06/05",
    cargo: "agente policial",
  },
  {
    id: "5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0c",
    nome: "Helena Duarte",
    dataDeIncorporacao: "2012/01/23",
    cargo: "inspetora",
  },
  {
    id: "6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d",
    nome: "Lucas Farias",
    dataDeIncorporacao: "2016/09/14",
    cargo: "perito criminal",
  },
];
// ----------------------

function findAll() {
  return agentes;
}

function findById(id) {
  return agentes.find((agente) => agente.id === id);
}

function adicionar(agente) {
  agentes.push(agente);
  return agente;
}

function atualizar(agente, id) {
  const indice = agentes.findIndex((a) => a.id === id);
  if (indice !== -1) {
    agentes[indice] = agente;
    return agentes[indice];
  }
  return null;
}

function atualizarParcial(agente, id) {
  const indice = agentes.findIndex((a) => a.id === id);
  if (indice !== -1) {
    return (agentes[indice] = { ...agentes[indice], ...agente });
  }
  return null;
}

function deleteById(id) {
  const agente = agentes.find((agente) => agente.id === id);
  if (agente) {
    return agentes.splice(agentes.indexOf(agente), 1);
  }
  return false;
}

// Exporta as funções do repositório
module.exports = {
  findAll,
  findById,
  adicionar,
  deleteById,
  atualizar,
  atualizarParcial,
};
