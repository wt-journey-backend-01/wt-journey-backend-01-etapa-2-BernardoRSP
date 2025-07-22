const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController.js");

router.get("/casos", casosController.getAllCasos);
router.get("/casos/:id", casosController.getCasoById);
router.post("/casos", casosController.adicionarCaso);
router.put("/casos/:id", casosController.atualizarCaso);
router.patch("/casos/:id", casosController.atualizarCasoParcial);
router.delete("/casos/:id", casosController.deleteCasoById);

module.exports = router;
