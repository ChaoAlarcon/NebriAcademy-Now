const express = require("express");
const router = express.Router();
const Profesores = require("../models/Profesores.js");

// Obtener todos los profesores
router.get("/", async (req, res) => {
  try {
    console.log("GET /profesores");
    const resultado = await Profesores.findAll();
    res.json({
      "Numero de profesores": resultado.length,
      Profesores: resultado,
    });
  } catch (error) {
    console.error("Error al obtener profesores:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener profesores" });
  }
});

// Obtener por ID un profesor
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`GET /profesores/${id}`);
    const profesor = await Profesores.findByPk(id);
    if (profesor) {
      res.json(profesor);
    } else {
      res.status(404).json({ error: "Profesor no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener profesor:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener profesor" });
  }
});

// Crear un profesor
router.post("/", (req, res) => {
  try {
    console.log("POST /profesores");
    Profesores.create(req.body).then((nuevo) => {
      res.status(201).json(nuevo);
    });
  } catch (error) {
    console.error("Error al crear profesor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar un profesor por ID
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`PUT /profesores/${id}`);
    const profesor = await Profesores.findByPk(id);
    if (profesor) {
      await profesor.update(req.body);
      res.json(profesor);
    } else {
      res.status(404).json({ error: "Profesor no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar profesor:", error);
    res.status(500).json({ error: "Error interno del servidor al actualizar profesor" });
  }
});

// Eliminar un profesor por ID
router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`DELETE /profesores/${id}`);
    Profesores.findAll().then((resultado) => {
      const profesor = resultado.find((p) => p.id === id);
      if (profesor) {
        profesor
          .destroy()
          .then(() => res.json({ mensaje: "Profesor eliminado" }));
      } else {
        res.status(404).json({ error: "Profesor no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al eliminar profesor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
