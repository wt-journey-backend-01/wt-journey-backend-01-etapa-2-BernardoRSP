// Repositório de agentes

const agentes = [
  {
    id: "a3f9c3b4-0e51-4c3a-9b15-c7f8d3a1e72f",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "2010/03/12",
    cargo: "delegado",
  },
  {
    id: "d5721b6f-cf0e-4e4d-9a3d-1827fa81a2b9",
    nome: "Bernardo Rezende",
    dataDeIncorporacao: "2015/08/27",
    cargo: "investigador",
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
