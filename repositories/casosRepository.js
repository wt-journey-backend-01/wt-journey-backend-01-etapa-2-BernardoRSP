// Repositório de casos
const casos = [
  {
    id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    titulo: "homicidio",
    descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
    titulo: "furto",
    descricao: "Furto de veículo ocorrido às 03:15 do dia 22/03/2015 na Rua das Flores, vítima relatou o desaparecimento do carro.",
    status: "fechado",
    agente_id: "2b1e7a8c-1a2b-4c3d-9e4f-2a5b6c7d8e9f",
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-2345678901bc",
    titulo: "assalto",
    descricao: "Assalto à residência às 21:00 do dia 05/11/2018 no bairro Centro, dois suspeitos armados invadiram a casa.",
    status: "aberto",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-3456789012cd",
    titulo: "tráfico de drogas",
    descricao: "Apreensão de entorpecentes às 16:45 do dia 18/02/2020 na Avenida Brasil, três indivíduos detidos.",
    status: "fechado",
    agente_id: "2b1e7a8c-1a2b-4c3d-9e4f-2a5b6c7d8e9f",
  },
  {
    id: "d4e5f6a7-b8c9-0123-def0-4567890123de",
    titulo: "fraude",
    descricao: "Investigação de fraude bancária iniciada em 27/07/2021, valores desviados de contas de clientes.",
    status: "aberto",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
  },
  {
    id: "e5f6a7b8-c9d0-1234-ef01-5678901234ef",
    titulo: "sequestro",
    descricao: "Sequestro de filho de empresário às 08:30 do dia 03/05/2017, vítima liberada após pagamento de resgate.",
    status: "fechado",
    agente_id: "2b1e7a8c-1a2b-4c3d-9e4f-2a5b6c7d8e9f",
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
