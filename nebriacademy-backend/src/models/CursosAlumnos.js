const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'cursosalumnos'
// Tabla pivote para la relación N:M entre Cursos y Alumnos (inscripciones)
const CursosAlumnos = sequelize.define('cursosalumnos', {
  cursoId: DataTypes.INTEGER,   // ID del curso
  alumnoId: DataTypes.INTEGER   // ID del alumno inscrito
}, { timestamps: false });

module.exports = CursosAlumnos;

