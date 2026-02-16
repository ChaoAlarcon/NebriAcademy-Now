const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'puntuacionescursos'
// Almacena las valoraciones y comentarios de los alumnos sobre los cursos
const PuntuacionesCursos = sequelize.define('puntuacionescursos', {
  cursoId: DataTypes.INTEGER,   // ID del curso valorado
  alumnoId: DataTypes.INTEGER,  // ID del alumno que valora
  puntuacion: DataTypes.FLOAT,  // Puntuación numérica (ej. 1-5)
  comentario: DataTypes.TEXT    // Opinión escrita (opcional)
}, { timestamps: false });

module.exports = PuntuacionesCursos;

