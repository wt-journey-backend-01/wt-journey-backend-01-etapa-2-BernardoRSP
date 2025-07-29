const casos = [
  {
    id: "b57c06a0-11f2-4ba0-9a67-69d8a89a0e23",
    titulo: "homicidio",
    descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
  {
    id: "4a5d8f12-8b23-41f7-9bc4-773cd19e6b22",
    titulo: "furto",
    descricao: "Furto de veículo ocorrido às 03:15 do dia 22/03/2015 na Rua das Flores, vítima relatou o desaparecimento do carro.",
    status: "fechado",
    agente_id: "a46ac20b-68dd-4271-b456-1f13c3d5e89a",
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
