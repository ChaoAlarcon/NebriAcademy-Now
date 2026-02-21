const express = require("express");
const router = express.Router();
const PuntuacionesCursos = require("../models/PuntuacionesCursos.js");
const Cursos = require("../models/Cursos.js");

// Devuelve todas las valoraciones de todos los cursos
router.get("/", async (req, res) => {
  try {
    const resultado = await PuntuacionesCursos.findAll();
    res.json({ "Numero de puntuacionesCursos": resultado.length, PuntuacionesCursos: resultado });
  } catch (error) {
    console.error("Error al obtener puntuaciones de cursos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Busca una valoración por su ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const puntuacion = await PuntuacionesCursos.findByPk(id);
    if (puntuacion) {
      res.json(puntuacion);
    } else {
      res.status(404).json({ error: "Puntuación no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener puntuación de curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Recalcula y guarda la media de valoraciones de un curso.
// Se llama automáticamente tras cualquier cambio en las puntuaciones.
const actualizarValoracionCurso = async (cursoId) => {
  const puntuaciones = await PuntuacionesCursos.findAll({ where: { cursoId } });
  if (puntuaciones.length > 0) {
    const suma = puntuaciones.reduce((acc, p) => acc + p.puntuacion, 0);
    const media = parseFloat((suma / puntuaciones.length).toFixed(2));
    await Cursos.update({ valoracion: media }, { where: { id: cursoId } });
  } else {
    // Si no quedan valoraciones, resetea a 0
    await Cursos.update({ valoracion: 0 }, { where: { id: cursoId } });
  }
};

// Crea una valoración. Si el alumno ya valoró ese curso, actualiza la existente (upsert manual)
router.post("/", async (req, res) => {
  try {
    const { cursoId, alumnoId, puntuacion, comentario } = req.body;

    let puntuacionExistente = await PuntuacionesCursos.findOne({ where: { cursoId, alumnoId } });

    if (puntuacionExistente) {
      // Ya tiene una valoración: la sobreescribimos
      puntuacionExistente.puntuacion = puntuacion;
      puntuacionExistente.comentario = comentario;
      await puntuacionExistente.save();
      await actualizarValoracionCurso(cursoId);
      return res.json(puntuacionExistente);
    }

    // Primera vez que valora este curso
    const nuevo = await PuntuacionesCursos.create(req.body);
    await actualizarValoracionCurso(cursoId);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear puntuación de curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualiza una valoración por su ID y recalcula la media del curso
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const puntuacion = await PuntuacionesCursos.findByPk(id);
    if (puntuacion) {
      await puntuacion.update(req.body);
      await actualizarValoracionCurso(puntuacion.cursoId);
      res.json(puntuacion);
    } else {
      res.status(404).json({ error: "Puntuación no encontrada" });
    }
  } catch (error) {
    console.error("Error al actualizar puntuación de curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Devuelve las valoraciones de un alumno concreto, con el nombre del curso incluido
// (usado en el dashboard del alumno para mostrar "Mis Reseñas")
router.get("/alumno/:alumnoId", async (req, res) => {
  try {
    const alumnoId = parseInt(req.params.alumnoId);
    const puntuaciones = await PuntuacionesCursos.findAll({ where: { alumnoId } });

    // Añadimos el nombre del curso a cada valoración (join manual)
    const puntuacionesConCurso = await Promise.all(puntuaciones.map(async (p) => {
      const curso = await Cursos.findByPk(p.cursoId);
      return { ...p.toJSON(), nombreCurso: curso ? curso.nombreCurso : 'Curso no encontrado' };
    }));

    res.json({ "Numero de puntuacionesCursos": puntuacionesConCurso.length, PuntuacionesCursos: puntuacionesConCurso });
  } catch (error) {
    console.error("Error al obtener puntuaciones de cursos del alumno:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Elimina una valoración y recalcula la media del curso afectado
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const puntuacion = await PuntuacionesCursos.findByPk(id);
    if (puntuacion) {
      const cursoId = puntuacion.cursoId; // lo guardamos antes de borrar
      await puntuacion.destroy();
      await actualizarValoracionCurso(cursoId);
      res.json({ mensaje: "Puntuación eliminada" });
    } else {
      res.status(404).json({ error: "Puntuación no encontrada" });
    }
  } catch (error) {
    console.error("Error al eliminar puntuación de curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
