const express = require("express");
const router = express.Router();
const PuntuacionesCursos = require("../models/PuntuacionesCursos.js");
const Cursos = require("../models/Cursos.js");

// Obtener todas las puntuaciones de los cursos (GET /puntuacionescursos)
router.get("/", async (req, res) => {
  try {
    const resultado = await PuntuacionesCursos.findAll();
    res.json({
      "Numero de puntuacionesCursos": resultado.length,
      PuntuacionesCursos: resultado,
    });
  } catch (error) {
    console.error("Error al obtener puntuaciones de cursos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener una puntuación de curso por ID (GET /puntuacionescursos/:id)
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

// Función auxiliar para recalcular y actualizar la valoración media de un curso
// Se ejecuta después de crear, actualizar o eliminar una puntuación
const actualizarValoracionCurso = async (cursoId) => {
  const puntuaciones = await PuntuacionesCursos.findAll({ where: { cursoId } });
  if (puntuaciones.length > 0) {
    const suma = puntuaciones.reduce((acc, p) => acc + p.puntuacion, 0);
    const media = parseFloat((suma / puntuaciones.length).toFixed(2));
    await Cursos.update({ valoracion: media }, { where: { id: cursoId } });
  } else {
    await Cursos.update({ valoracion: 0 }, { where: { id: cursoId } });
  }
};

// Crear o actualizar una puntuación de curso (POST /puntuacionescursos)
// Si el alumno ya valoró el curso, se actualiza su valoración existente
router.post("/", async (req, res) => {
  try {
    const { cursoId, alumnoId, puntuacion, comentario } = req.body;
    
    // Verificar si el alumno ya ha valorado este curso
    let puntuacionExistente = await PuntuacionesCursos.findOne({
      where: { cursoId, alumnoId }
    });

    if (puntuacionExistente) {
      // Si ya existe, la actualizamos
      puntuacionExistente.puntuacion = puntuacion;
      puntuacionExistente.comentario = comentario;
      await puntuacionExistente.save();
      await actualizarValoracionCurso(cursoId);
      return res.json(puntuacionExistente);
    }

    // Si no existe, creamos una nueva
    const nuevo = await PuntuacionesCursos.create(req.body);
    await actualizarValoracionCurso(cursoId);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear puntuación de curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar una puntuación por ID (PUT /puntuacionescursos/:id)
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

// Obtener todas las puntuaciones de cursos de un alumno específico (GET /puntuacionescursos/alumno/:alumnoId)
router.get("/alumno/:alumnoId", async (req, res) => {
  try {
    const alumnoId = parseInt(req.params.alumnoId);
    const puntuaciones = await PuntuacionesCursos.findAll({ where: { alumnoId } });
    
    // Si queremos incluir el nombre del curso, podemos hacerlo aquí
    const puntuacionesConCurso = await Promise.all(puntuaciones.map(async (p) => {
      const curso = await Cursos.findByPk(p.cursoId);
      return {
        ...p.toJSON(),
        nombreCurso: curso ? curso.nombreCurso : 'Curso no encontrado'
      };
    }));

    res.json({
      "Numero de puntuacionesCursos": puntuacionesConCurso.length,
      PuntuacionesCursos: puntuacionesConCurso,
    });
  } catch (error) {
    console.error("Error al obtener puntuaciones de cursos del alumno:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar una puntuación por ID (DELETE /puntuacionescursos/:id)
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const puntuacion = await PuntuacionesCursos.findByPk(id);
    if (puntuacion) {
      const cursoId = puntuacion.cursoId;
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
