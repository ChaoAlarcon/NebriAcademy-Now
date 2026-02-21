const express = require("express");
const router = express.Router();
const ProfesoresCursos = require("../models/ProfesoresCursos.js");

// Devuelve todas las asignaciones entre profesores y cursos
router.get("/", (req, res) => {
  try {
    console.log("GET /profesorescursos");
    ProfesoresCursos.findAll().then((resultado) => {
      res.json({ "Numero de profesoresCursos": resultado.length, ProfesoresCursos: resultado });
    });
  } catch (error) {
    console.error("Error al obtener profesores-cursos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Busca una asignación por su ID
router.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`GET /profesorescursos/${id}`);
    ProfesoresCursos.findAll().then((resultado) => {
      const registro = resultado.find((r) => r.id === id);
      if (registro) {
        res.json(registro);
      } else {
        res.status(404).json({ error: "Registro profesor-curso no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al obtener registro profesor-curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Asigna un profesor a un curso
router.post("/", (req, res) => {
  try {
    console.log("POST /profesorescursos");
    ProfesoresCursos.create(req.body).then((nuevo) => {
      res.status(201).json(nuevo);
    });
  } catch (error) {
    console.error("Error al crear registro profesor-curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualiza una asignación profesor-curso por su ID
router.put("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`PUT /profesorescursos/${id}`);
    ProfesoresCursos.findAll().then((resultado) => {
      const registro = resultado.find((r) => r.id === id);
      if (registro) {
        registro.update(req.body).then((actualizado) => res.json(actualizado));
      } else {
        res.status(404).json({ error: "Registro profesor-curso no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al actualizar registro profesor-curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Elimina una asignación profesor-curso por su ID
router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`DELETE /profesorescursos/${id}`);
    ProfesoresCursos.findAll().then((resultado) => {
      const registro = resultado.find((r) => r.id === id);
      if (registro) {
        registro.destroy().then(() => res.json({ mensaje: "Registro profesor-curso eliminado" }));
      } else {
        res.status(404).json({ error: "Registro profesor-curso no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al eliminar registro profesor-curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
