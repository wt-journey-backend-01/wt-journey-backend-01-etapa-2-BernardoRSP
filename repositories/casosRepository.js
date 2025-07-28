const { v4: uuidv4 } = require("uuid");
const { agentes } = require("./agentesRepository.js");

const casos = [];

function findAll() {
  return casos;
}

function findById(id) {// Os IDs agora são UUIDs versão 4 estáticos e válidos.

const casos = [
  {
    // CORREÇÃO: UUID v4 real e estático.
    id: "b57c06a0-11f2-4ba0-9a67-69d8a89c0e23",
    titulo: "homicidio",
    descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    // CORREÇÃO: Usando o ID v4 correspondente do agente.
    agente_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
  {
    // CORREÇÃO: UUID v4 real e estático.
    id: "4a5d8f12-8b23-41f7-9bc4-773cd19e6b22",
    titulo: "furto",
    descricao: "Furto de veículo ocorrido às 03:15 do dia 22/03/2015 na Rua das Flores, vítima relatou o desaparecimento do carro.",
    status: "fechado",
    // CORREÇÃO: Usando o ID v4 correspondente do agente.
    agente_id: "a46ac20b-68dd-4271-b456-1f13c3d5e89a",
  },
];

// O restante do arquivo permanece inalterado.

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
