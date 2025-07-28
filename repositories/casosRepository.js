const { v4: uuidv4 } = require("uuid");
const { agentes } = require("./agentesRepository.js");

const casos = [
  {
    id: uuidv4(),
    titulo: "homicidio",
    descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",

    agente_id: agentes[0].id,
  },
  {
    id: uuidv4(),
    titulo: "furto",
    descricao: "Furto de veículo ocorrido às 03:15 do dia 22/03/2015 na Rua das Flores, vítima relatou o desaparecimento do carro.",
    status: "fechado",
    agente_id: agentes[1].id,
  },
];

function findAll() {
  return casos;
}

function findById(id) {
  return casos.find((caso) => caso.id === id);
}

function adicionar(caso) {
  casos.push(caso);
  return caso;
}

function atualizar(caso, id) {
  const indice = casos.findIndex((c) => c.id === id);
  if (indice !== -1) {
    casos[indice] = caso;
    return casos[indice];
  }
  return null;
}

function atualizarParcial(caso, id) {
  const indice = casos.findIndex((c) => c.id === id);
  if (indice !== -1) {
    casos[indice] = { ...casos[indice], ...caso };
    return casos[indice];
  }
  return null;
}

function deleteById(id) {
  const indice = casos.findIndex((c) => c.id === id);
  if (indice !== -1) {
    casos.splice(indice, 1);
    return true;
  }
  return false;
}

module.exports = {
  findAll,
  findById,
  adicionar,
  atualizar,
  atualizarParcial,
  deleteById,
};
