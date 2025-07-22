const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController.js");

router.get("/agentes", agentesController.getAllAgentes);
router.get("/agentes/:id", agentesController.getAgenteById);
router.post("/agentes", agentesController.adicionarAgente);
//router.put("/agentes/:id", agentesController.atualizarAgente);
//router.patch("/agentes/:id", agentesController.atualizarAgenteParcial);
router.delete("/agentes/:id", agentesController.deleteAgenteById);

module.exports = router;
