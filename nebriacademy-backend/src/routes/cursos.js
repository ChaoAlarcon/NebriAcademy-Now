const express = require("express");
const router = express.Router();
const Cursos = require("../models/Cursos.js");

// Obtener todos los cursos (GET /cursos)
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

// Obtener un curso por ID (GET /cursos/:id)
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

// Crear un nuevo curso (POST /cursos)
router.post("/", async (req, res) => {
  try {
    console.log("POST /cursos", req.body);
    const nuevo = await Cursos.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear curso:", error);
    // Provide more specific error if it's a database schema issue
    const message = error.name === 'SequelizeDatabaseError' 
      ? `Error de base de datos: ${error.message}. Asegúrate de que la tabla 'cursos' tenga la columna 'icono'.`
      : "Error interno del servidor al crear el curso";
    res.status(500).json({ error: message, details: error.message });
  }
});

// Actualizar un curso existente por ID (PUT /cursos/:id)
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`PUT /cursos/${id}`, req.body);
    const curso = await Cursos.findByPk(id);
    if (curso) {
      // Evitar que la valoración se actualice manualmente, ya que es la media
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

// Eliminar un curso por ID (DELETE /cursos/:id)
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
