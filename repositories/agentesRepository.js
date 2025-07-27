// Repositório de agentes
const agentes = [
  {
    id: "ffd9f602-40e1-42af-a5b1-df30d86e351b",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "2010/03/12",
    cargo: "delegado",
  },
  {
    id: "da9aa39b-1a31-41fe-8a79-3e3dbae4f7e0",
    nome: "Bernardo Rezende",
    dataDeIncorporacao: "2015/08/27",
    cargo: "investigador",
  },
  {
    id: "83ec29b6-9ef9-4379-99e4-bd35b518d576",
    nome: "Sofia Almeida",
    dataDeIncorporacao: "2018/11/19",
    cargo: "escrivã",
  },
  {
    id: "c903383c-9ebf-4fb1-a747-75e5da1d4a30",
    nome: "Miguel Torres",
    dataDeIncorporacao: "2020/06/05",
    cargo: "agente policial",
  },
  {
    id: "3906a95d-74aa-4921-b96f-8eb12a2948f8",
    nome: "Helena Duarte",
    dataDeIncorporacao: "2012/01/23",
    cargo: "inspetora",
  },
  {
    id: "6a8ac3a1-4afd-4b5f-9f5d-4375f2b63813",
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
