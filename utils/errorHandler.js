function errorHandler(err, req, res, next) {
  console.error("Erro capturado pelo errorHandler:", err);

  const statusCode = err.statusCode || 500;
  const mensagem = err.message || "Erro interno do servidor";

  res.status(statusCode).json({
    status: statusCode,
    mensagem,
  });
}

module.exports = errorHandler;
