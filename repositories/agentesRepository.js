const agentes = [
  {
    id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "1992/10/04",
    cargo: "delegado",
  },
];

function listar() {
  return agentes;
}

function encontrar(id) {
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

function deletar(id) {
  const indice = agentes.findIndex((a) => a.id === id);
  if (indice !== -1) {
    agentes.splice(indice, 1);
    return true;
  }
  return false;
}

module.exports = {
  listar,
  encontrar,
  adicionar,
  deletar,
  atualizar,
  atualizarParcial,
};
