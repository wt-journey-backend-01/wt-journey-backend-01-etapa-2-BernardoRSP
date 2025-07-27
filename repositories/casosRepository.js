// Repositório de casos
const casos = [
  {
    id: "a7f885e8-ae88-47b8-80b3-9e9a070c986a",
    titulo: "homicidio",
    descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "c903383c-9ebf-4fb1-a747-75e5da1d4a30",
  },
  {
    id: "8aa755dc-562b-4b7b-af8d-0e4644e88635",
    titulo: "furto",
    descricao: "Furto de veículo ocorrido às 03:15 do dia 22/03/2015 na Rua das Flores, vítima relatou o desaparecimento do carro.",
    status: "fechado",
    agente_id: "da9aa39b-1a31-41fe-8a79-3e3dbae4f7e0",
  },
  {
    id: "7dc6bbd5-69c0-47f5-944a-a32d61d5adc2",
    titulo: "assalto",
    descricao: "Assalto à residência às 21:00 do dia 05/11/2018 no bairro Centro, dois suspeitos armados invadiram a casa.",
    status: "aberto",
    agente_id: "c903383c-9ebf-4fb1-a747-75e5da1d4a30",
  },
  {
    id: "fa0693ab-0519-42ed-8e73-ea51770f0c5e",
    titulo: "tráfico de drogas",
    descricao: "Apreensão de entorpecentes às 16:45 do dia 18/02/2020 na Avenida Brasil, três indivíduos detidos.",
    status: "fechado",
    agente_id: "3906a95d-74aa-4921-b96f-8eb12a2948f8",
  },
  {
    id: "83afc3f0-2688-4fad-99f8-187ee5bbbded",
    titulo: "fraude",
    descricao: "Investigação de fraude bancária iniciada em 27/07/2021, valores desviados de contas de clientes.",
    status: "aberto",
    agente_id: "da9aa39b-1a31-41fe-8a79-3e3dbae4f7e0",
  },
  {
    id: "eb0f5dd3-3ec2-4cf2-a35c-c105de4ebbf6",
    titulo: "sequestro",
    descricao: "Sequestro de filho de empresário às 08:30 do dia 03/05/2017, vítima liberada após pagamento de resgate.",
    status: "fechado",
    agente_id: "6a8ac3a1-4afd-4b5f-9f5d-4375f2b63813",
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
