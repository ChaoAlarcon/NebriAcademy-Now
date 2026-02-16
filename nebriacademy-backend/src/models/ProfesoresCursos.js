const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'profesorescursos'
// Tabla pivote para la relación N:M entre Profesores y Cursos
const ProfesoresCursos = sequelize.define('profesorescursos', {
  profesorId: DataTypes.INTEGER, // ID del profesor
  cursoId: DataTypes.INTEGER     // ID del curso que imparte
}, { timestamps: false });

module.exports = ProfesoresCursos;

