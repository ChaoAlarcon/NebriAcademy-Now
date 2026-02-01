const express = require("express");
const router = express.Router();
const Alumnos = require("../models/Alumnos.js");

// Obtener todos los alumnos
router.get("/", async (req, res) => {
  try {
    console.log("GET /alumnos");
    const resultado = await Alumnos.findAll();
    res.json({
      "Numero de alumnos": resultado.length,
      Alumnos: resultado,
    });
  } catch (error) {
    console.error("Error al obtener alumnos:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener alumnos" });
  }
});

// Obtener por ID un alumno
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`GET /alumnos/${id}`);
    const alumno = await Alumnos.findByPk(id);
    if (alumno) {
      res.json(alumno);
    } else {
      res.status(404).json({ error: "Alumno no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener alumno:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener alumno" });
  }
});

// Crear un alumno
router.post("/", (req, res) => {
  try {
    console.log("POST /alumnos");
    Alumnos.create(req.body).then((nuevo) => {
      res.status(201).json(nuevo);
    });
  } catch (error) {
    console.error("Error al crear alumno:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar un alumno por ID
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`PUT /alumnos/${id}`);
    const alumno = await Alumnos.findByPk(id);
    if (alumno) {
      await alumno.update(req.body);
      res.json(alumno);
    } else {
      res.status(404).json({ error: "Alumno no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar alumno:", error);
    res.status(500).json({ error: "Error interno del servidor al actualizar alumno" });
  }
});

// Eliminar un alumno por ID
router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`DELETE /alumnos/${id}`);
    Alumnos.findAll().then((resultado) => {
      const alumno = resultado.find((a) => a.id === id);
      if (alumno) {
        alumno.destroy().then(() => res.json({ mensaje: "Alumno eliminado" }));
      } else {
        res.status(404).json({ error: "Alumno no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al eliminar alumno:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
