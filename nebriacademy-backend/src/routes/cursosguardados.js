const express = require("express");
const router = express.Router();
const CursosGuardados = require("../models/CursosGuardados.js");
const Cursos = require("../models/Cursos.js");

// Obtener todos los cursos guardados (GET /cursosguardados)
router.get("/", async (req, res) => {
  try {
    const resultado = await CursosGuardados.findAll();
    res.json({
      "Numero de cursosGuardados": resultado.length,
      CursosGuardados: resultado,
    });
  } catch (error) {
    console.error("Error al obtener cursos guardados:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener cursos guardados de un alumno específico (GET /cursosguardados/alumno/:alumnoId)
router.get("/alumno/:alumnoId", async (req, res) => {
  try {
    const alumnoId = parseInt(req.params.alumnoId);
    const registros = await CursosGuardados.findAll({ where: { alumnoId } });
    
    // Obtener detalles de cada curso
    const cursosIds = registros.map(r => r.cursoId);
    const cursosDetails = await Cursos.findAll({ where: { id: cursosIds } });
    
    res.json({
      count: registros.length,
      Cursos: cursosDetails
    });
  } catch (error) {
    console.error("Error al obtener cursos guardados del alumno:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Guardar un curso como favorito (POST /cursosguardados)
router.post("/", async (req, res) => {
  try {
    const { cursoId, alumnoId } = req.body;
    
    // Verificar si ya está guardado
    const existe = await CursosGuardados.findOne({ where: { cursoId, alumnoId } });
    if (existe) {
      return res.status(400).json({ error: "El curso ya está guardado" });
    }
    
    const nuevo = await CursosGuardados.create({ cursoId, alumnoId });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al guardar curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar un curso de guardados (DELETE /cursosguardados/alumno/:alumnoId/curso/:cursoId)
router.delete("/alumno/:alumnoId/curso/:cursoId", async (req, res) => {
  try {
    const alumnoId = parseInt(req.params.alumnoId);
    const cursoId = parseInt(req.params.cursoId);
    
    const registro = await CursosGuardados.findOne({ where: { alumnoId, cursoId } });
    if (registro) {
      await registro.destroy();
      res.json({ mensaje: "Curso eliminado de guardados" });
    } else {
      res.status(404).json({ error: "No se encontró el curso guardado" });
    }
  } catch (error) {
    console.error("Error al eliminar curso guardado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
