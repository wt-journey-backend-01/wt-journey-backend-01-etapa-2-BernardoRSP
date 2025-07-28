// Os IDs agora são UUIDs versão 4 estáticos e válidos.

const agentes = [
  {
    // CORREÇÃO: UUID v4 real e estático.
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "2010/03/12",
    cargo: "delegado",
  },
  {
    // CORREÇÃO: UUID v4 real e estático.
    id: "a46ac20b-68dd-4271-b456-1f13c3d5e89a",
    nome: "Bernardo Rezende",
    dataDeIncorporacao: "2015/08/27",
    cargo: "investigador",
  },
];

// O restante do arquivo permanece inalterado, pois a lógica já estava correta.

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
    agentes[indice] = { ...agentes[indice], ...agente };
    return agentes[indice];
  }
  return null;
}

function deleteById(id) {
  const indice = agentes.findIndex((a) => a.id === id);
  if (indice !== -1) {
    agentes.splice(indice, 1);
    return true;
  }
  return false;
}

module.exports = {
  findAll,
  findById,
  adicionar,
  deleteById,
  atualizar,
  atualizarParcial,
};
