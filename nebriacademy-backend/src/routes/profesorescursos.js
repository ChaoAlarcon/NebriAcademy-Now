const express = require("express");
const router = express.Router();
const ProfesoresCursos = require("../models/ProfesoresCursos.js");

// Obtener todas las asignaciones profesor-curso (GET /profesorescursos)
router.get("/", (req, res) => {
  try {
    console.log("GET /profesorescursos");
    ProfesoresCursos.findAll().then((resultado) => {
      res.json({
        "Numero de profesoresCursos": resultado.length,
        ProfesoresCursos: resultado,
      });
    });
  } catch (error) {
    console.error("Error al obtener profesores-cursos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener una asignación profesor-curso por ID (GET /profesorescursos/:id)
router.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`GET /profesorescursos/${id}`);
    ProfesoresCursos.findAll().then((resultado) => {
      const registro = resultado.find((r) => r.id === id);
      if (registro) {
        res.json(registro);
      } else {
        res
          .status(404)
          .json({ error: "Registro profesor-curso no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al obtener registro profesor-curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crear una nueva asignación profesor-curso (POST /profesorescursos)
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

// Actualizar una asignación profesor-curso por ID (PUT /profesorescursos/:id)
router.put("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`PUT /profesorescursos/${id}`);
    ProfesoresCursos.findAll().then((resultado) => {
      const registro = resultado.find((r) => r.id === id);
      if (registro) {
        registro.update(req.body).then((actualizado) => res.json(actualizado));
      } else {
        res
          .status(404)
          .json({ error: "Registro profesor-curso no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al actualizar registro profesor-curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar una asignación profesor-curso por ID (DELETE /profesorescursos/:id)
router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`DELETE /profesorescursos/${id}`);
    ProfesoresCursos.findAll().then((resultado) => {
      const registro = resultado.find((r) => r.id === id);
      if (registro) {
        registro
          .destroy()
          .then(() =>
            res.json({ mensaje: "Registro profesor-curso eliminado" })
          );
      } else {
        res
          .status(404)
          .json({ error: "Registro profesor-curso no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al eliminar registro profesor-curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
