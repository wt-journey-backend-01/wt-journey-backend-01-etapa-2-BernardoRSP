// CORREÇÃO: Adicionando o require('uuid') para gerar IDs dinamicamente.
const { v4: uuidv4 } = require("uuid");

const agentes = [
  {
    // CORREÇÃO: ID agora é gerado dinamicamente na inicialização.
    id: uuidv4(),
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "2010/03/12",
    cargo: "delegado",
  },
  {
    // CORREÇÃO: ID agora é gerado dinamicamente na inicialização.
    id: uuidv4(),
    nome: "Bernardo Rezende",
    dataDeIncorporacao: "2015/08/27",
    cargo: "investigador",
  },
];

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
  agentes,
};
