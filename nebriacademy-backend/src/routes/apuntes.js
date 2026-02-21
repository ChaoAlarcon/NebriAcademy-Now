const express = require("express");
const router = express.Router();
const Apuntes = require("../models/Apuntes.js");

// Devuelve todos los apuntes
router.get("/", (req, res) => {
  try {
    console.log("GET /apuntes");
    Apuntes.findAll().then((resultado) => {
      res.json({ "Numero de apuntes": resultado.length, Apuntes: resultado });
    });
  } catch (error) {
    console.error("Error al obtener apuntes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Busca un apunte por su ID
router.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`GET /apuntes/${id}`);
    Apuntes.findAll().then((resultado) => {
      const apunte = resultado.find((a) => a.id === id);
      if (apunte) {
        res.json(apunte);
      } else {
        res.status(404).json({ error: "Apunte no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al obtener apunte:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crea un nuevo apunte
router.post("/", (req, res) => {
  try {
    console.log("POST /apuntes");
    Apuntes.create(req.body).then((nuevo) => {
      res.status(201).json(nuevo);
    });
  } catch (error) {
    console.error("Error al crear apunte:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualiza un apunte por su ID
router.put("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`PUT /apuntes/${id}`);
    Apuntes.findAll().then((resultado) => {
      const apunte = resultado.find((a) => a.id === id);
      if (apunte) {
        apunte.update(req.body).then((actualizado) => res.json(actualizado));
      } else {
        res.status(404).json({ error: "Apunte no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al actualizar apunte:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Elimina un apunte por su ID
router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`DELETE /apuntes/${id}`);
    Apuntes.findAll().then((resultado) => {
      const apunte = resultado.find((a) => a.id === id);
      if (apunte) {
        apunte.destroy().then(() => res.json({ mensaje: "Apunte eliminado" }));
      } else {
        res.status(404).json({ error: "Apunte no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al eliminar apunte:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
