const express = require("express");
const router = express.Router();
const Cursos = require("../models/Cursos.js");

// Devuelve todos los cursos de la base de datos
router.get("/", (req, res) => {
  try {
    console.log("GET /cursos");
    Cursos.findAll().then((resultado) => {
      res.json({ "Numero de cursos": resultado.length, Cursos: resultado });
    });
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Busca un curso por su ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`GET /cursos/${id}`);
    const curso = await Cursos.findByPk(id);
    if (curso) {
      res.json(curso);
    } else {
      res.status(404).json({ error: "Curso no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener curso:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener el curso" });
  }
});

// Crea un nuevo curso. Si la columna 'icono' no existe en la BD, devuelve un mensaje de error claro
router.post("/", async (req, res) => {
  try {
    console.log("POST /cursos", req.body);
    const nuevo = await Cursos.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear curso:", error);
    const message = error.name === 'SequelizeDatabaseError'
      ? `Error de base de datos: ${error.message}. Asegúrate de que la tabla 'cursos' tenga la columna 'icono'.`
      : "Error interno del servidor al crear el curso";
    res.status(500).json({ error: message, details: error.message });
  }
});

// Actualiza un curso. El campo 'valoracion' se ignora para que no se toque manualmente
// (se actualiza solo como media a través de puntuacionescursos)
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`PUT /cursos/${id}`, req.body);
    const curso = await Cursos.findByPk(id);
    if (curso) {
      const { valoracion, ...datosAActualizar } = req.body;
      await curso.update(datosAActualizar);
      res.json(curso);
    } else {
      res.status(404).json({ error: "Curso no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar curso:", error);
    res.status(500).json({ error: "Error interno del servidor al actualizar el curso" });
  }
});

// Elimina un curso por su ID
router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`DELETE /cursos/${id}`);
    Cursos.findAll().then((resultado) => {
      const curso = resultado.find((c) => c.id === id);
      if (curso) {
        curso.destroy().then(() => res.json({ mensaje: "Curso eliminado" }));
      } else {
        res.status(404).json({ error: "Curso no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al eliminar curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
