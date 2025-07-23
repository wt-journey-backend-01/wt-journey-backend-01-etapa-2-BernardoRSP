const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController.js");

router.get("/", casosController.getAllCasos);
router.get("/:id", casosController.getCasoById);
router.post("/", casosController.adicionarCaso);
router.put("/:id", casosController.atualizarCaso);
router.patch("/:id", casosController.atualizarCasoParcial);
router.delete("/:id", casosController.deleteCasoById);

module.exports = router;
