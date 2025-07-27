// Repositório de agentes
const agentes = [
  {
    id: "60e77701-68b4-4d68-a54c-771890ca665b",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "2010/03/12",
    cargo: "delegado",
  },
  {
    id: "283fc0e7-5494-42a8-919f-e2acd3106e58",
    nome: "Bernardo Rezende",
    dataDeIncorporacao: "2015/08/27",
    cargo: "investigador",
  },
  {
    id: "4b2f61ef-bc6d-4d3d-95e5-f40c9fe16847",
    nome: "Sofia Almeida",
    dataDeIncorporacao: "2018/11/19",
    cargo: "escrivã",
  },
  {
    id: "835922bc-011a-4b18-b03a-fd43ca6578f1",
    nome: "Miguel Torres",
    dataDeIncorporacao: "2020/06/05",
    cargo: "agente policial",
  },
  {
    id: "06734489-11bd-4d36-986c-b98296700e47",
    nome: "Helena Duarte",
    dataDeIncorporacao: "2012/01/23",
    cargo: "inspetora",
  },
  {
    id: "5fbeb01c-7890-4069-a337-1c1cd38bc8ea",
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
