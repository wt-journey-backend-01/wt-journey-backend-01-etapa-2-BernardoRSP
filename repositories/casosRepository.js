// Repositório de casos
const casos = [
  {
    id: "b57c06a0-11f2-4ba0-9a67-69d8a89c0e23",
    titulo: "homicidio",
    descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "a3f9c3b4-0e51-4c3a-9b15-c7f8d3a1e72f",
  },
  {
    id: "4a5d8f12-8b23-41f7-9bc4-773cd19e6b22",
    titulo: "furto",
    descricao: "Furto de veículo ocorrido às 03:15 do dia 22/03/2015 na Rua das Flores, vítima relatou o desaparecimento do carro.",
    status: "fechado",
    agente_id: "d5721b6f-cf0e-4e4d-9a3d-1827fa81a2b9",
  },
];
// ----------------------

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
    return (casos[indice] = { ...casos[indice], ...caso });
  }
  return null;
}

function deleteById(id) {
  const caso = casos.find((caso) => caso.id === id);
  if (caso) {
    return casos.splice(casos.indexOf(caso), 1);
  }
  return false;
}

// Exporta as funções do repositório
module.exports = {
  findAll,
  findById,
  adicionar,
  atualizar,
  atualizarParcial,
  deleteById,
};
