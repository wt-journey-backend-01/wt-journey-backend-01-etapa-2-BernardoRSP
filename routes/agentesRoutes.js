const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController.js");

router.get("/", agentesController.getAllAgentes);
router.get("/:id", agentesController.getAgenteById);
router.post("/", agentesController.adicionarAgente);
router.put("/:id", agentesController.atualizarAgente);
router.patch("/:id", agentesController.atualizarAgenteParcial);
router.delete("/:id", agentesController.deleteAgenteById);

module.exports = router;
