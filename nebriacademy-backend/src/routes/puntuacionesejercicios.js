const express = require("express");
const router = express.Router();
const PuntuacionesEjercicios = require("../models/PuntuacionesEjercicios.js");

// Devuelve todas las puntuaciones de ejercicios
router.get("/", (req, res) => {
  try {
    console.log("GET /puntuacionesejercicios");
    PuntuacionesEjercicios.findAll().then((resultado) => {
      res.json({ "Numero de puntuacionesEjercicios": resultado.length, PuntuacionesEjercicios: resultado });
    });
  } catch (error) {
    console.error("Error al obtener puntuaciones de ejercicios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Busca una puntuación de ejercicio por su ID
router.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`GET /puntuacionesejercicios/${id}`);
    PuntuacionesEjercicios.findAll().then((resultado) => {
      const puntuacion = resultado.find((p) => p.id === id);
      if (puntuacion) {
        res.json(puntuacion);
      } else {
        res.status(404).json({ error: "Puntuación no encontrada" });
      }
    });
  } catch (error) {
    console.error("Error al obtener puntuación de ejercicio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Registra la puntuación de un alumno en un ejercicio
router.post("/", (req, res) => {
  try {
    console.log("POST /puntuacionesejercicios");
    PuntuacionesEjercicios.create(req.body).then((nuevo) => {
      res.status(201).json(nuevo);
    });
  } catch (error) {
    console.error("Error al crear puntuación de ejercicio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualiza la puntuación de un ejercicio por su ID
router.put("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`PUT /puntuacionesejercicios/${id}`);
    PuntuacionesEjercicios.findAll().then((resultado) => {
      const puntuacion = resultado.find((p) => p.id === id);
      if (puntuacion) {
        puntuacion.update(req.body).then((actualizado) => res.json(actualizado));
      } else {
        res.status(404).json({ error: "Puntuación no encontrada" });
      }
    });
  } catch (error) {
    console.error("Error al actualizar puntuación de ejercicio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Elimina una puntuación de ejercicio por su ID
router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`DELETE /puntuacionesejercicios/${id}`);
    PuntuacionesEjercicios.findAll().then((resultado) => {
      const puntuacion = resultado.find((p) => p.id === id);
      if (puntuacion) {
        puntuacion.destroy().then(() => res.json({ mensaje: "Puntuación eliminada" }));
      } else {
        res.status(404).json({ error: "Puntuación no encontrada" });
      }
    });
  } catch (error) {
    console.error("Error al eliminar puntuación de ejercicio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
