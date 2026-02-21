const express = require("express");
const router = express.Router();
const CursosGuardados = require("../models/CursosGuardados.js");
const Cursos = require("../models/Cursos.js");

// Devuelve todos los registros de la tabla de favoritos
router.get("/", async (req, res) => {
  try {
    const resultado = await CursosGuardados.findAll();
    res.json({ "Numero de cursosGuardados": resultado.length, CursosGuardados: resultado });
  } catch (error) {
    console.error("Error al obtener cursos guardados:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Devuelve los cursos completos que un alumno tiene guardados como favoritos
// (usado en el dashboard del alumno)
router.get("/alumno/:alumnoId", async (req, res) => {
  try {
    const alumnoId = parseInt(req.params.alumnoId);
    const registros = await CursosGuardados.findAll({ where: { alumnoId } });

    // Sacamos los IDs y buscamos los datos completos de cada curso
    const cursosIds = registros.map(r => r.cursoId);
    const cursosDetails = await Cursos.findAll({ where: { id: cursosIds } });

    res.json({ count: registros.length, Cursos: cursosDetails });
  } catch (error) {
    console.error("Error al obtener cursos guardados del alumno:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Guarda un curso como favorito. Rechaza si ya estaba guardado (evita duplicados)
router.post("/", async (req, res) => {
  try {
    const { cursoId, alumnoId } = req.body;
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

// Elimina un curso de favoritos identificando el par alumno+curso
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
