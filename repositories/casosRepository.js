const casos = [];

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
    casos[indice] = { id, ...caso };
    return casos[indice];
  }
  return null;
}

function atualizarParcial(caso, id) {
  const index = casos.findIndex((c) => c.id === id);
  if (index === -1) return null;

  casos[index] = { ...casos[index], ...caso };
  return casos[index];
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
