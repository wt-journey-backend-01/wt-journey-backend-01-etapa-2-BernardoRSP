// Repositório de casos
const casos = [
  {
    id: "95e0dadd-0894-4643-bea1-76069f197474",
    titulo: "homicidio",
    descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "60e77701-68b4-4d68-a54c-771890ca665b",
  },
  {
    id: "9fc4e999-662b-4530-bb21-524ca9d2da39",
    titulo: "furto",
    descricao: "Furto de veículo ocorrido às 03:15 do dia 22/03/2015 na Rua das Flores, vítima relatou o desaparecimento do carro.",
    status: "fechado",
    agente_id: "283fc0e7-5494-42a8-919f-e2acd3106e58",
  },
  {
    id: "0cc76570-62d4-446c-b6db-81d97d1b21f1",
    titulo: "assalto",
    descricao: "Assalto à residência às 21:00 do dia 05/11/2018 no bairro Centro, dois suspeitos armados invadiram a casa.",
    status: "aberto",
    agente_id: "283fc0e7-5494-42a8-919f-e2acd3106e58",
  },
  {
    id: "21492d6b-0632-4236-8710-d8ff2cd7f686",
    titulo: "tráfico de drogas",
    descricao: "Apreensão de entorpecentes às 16:45 do dia 18/02/2020 na Avenida Brasil, três indivíduos detidos.",
    status: "fechado",
    agente_id: "60e77701-68b4-4d68-a54c-771890ca665b",
  },
  {
    id: "02df2089-f25c-48d5-b144-7c699ce0d928",
    titulo: "fraude",
    descricao: "Investigação de fraude bancária iniciada em 27/07/2021, valores desviados de contas de clientes.",
    status: "aberto",
    agente_id: "835922bc-011a-4b18-b03a-fd43ca6578f1",
  },
  {
    id: "4af293f9-e9bf-4bd2-91e2-b26a3587acbe",
    titulo: "sequestro",
    descricao: "Sequestro de filho de empresário às 08:30 do dia 03/05/2017, vítima liberada após pagamento de resgate.",
    status: "fechado",
    agente_id: "835922bc-011a-4b18-b03a-fd43ca6578f1",
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
