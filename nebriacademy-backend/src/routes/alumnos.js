const express = require("express");
const router = express.Router();
const Alumnos = require("../models/Alumnos.js");

// Devuelve todos los alumnos registrados
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

// Busca un alumno por su ID
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

// Registra un nuevo alumno. Si el email o DNI ya existen, devuelve un 400 con el campo duplicado
router.post("/", async (req, res) => {
  try {
    console.log("POST /alumnos");
    const nuevo = await Alumnos.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear alumno:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      const campo = error.errors[0].path;
      return res.status(400).json({
        error: `El ${campo} ya está registrado`,
        mensaje: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ error: "Error interno del servidor al crear alumno" });
  }
});

// Actualiza los datos de un alumno (usado desde la página de perfil)
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

// Elimina un alumno por su ID
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`DELETE /alumnos/${id}`);
    const alumno = await Alumnos.findByPk(id);
    if (alumno) {
      await alumno.destroy();
      res.json({ mensaje: "Alumno eliminado" });
    } else {
      res.status(404).json({ error: "Alumno no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar alumno:", error);
    res.status(500).json({ error: "Error interno del servidor al eliminar alumno" });
  }
});

module.exports = router;
