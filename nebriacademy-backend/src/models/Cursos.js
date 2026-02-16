const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'cursos'
// Representa los cursos disponibles en la plataforma
const Cursos = sequelize.define('cursos', {
  nombreCurso: DataTypes.STRING, // Título del curso
  categoria: DataTypes.STRING,   // Categoría (ej. Programación, Matemáticas)
  profesor: DataTypes.INTEGER,   // ID del profesor que imparte el curso
  nivel: DataTypes.STRING,       // Nivel de dificultad (ej. Básico, Avanzado)
  valoracion: DataTypes.FLOAT,   // Puntuación media del curso
  comentarios: DataTypes.TEXT,   // Comentarios generales o JSON de comentarios
  descripcion: DataTypes.TEXT,   // Descripción detallada del curso
  icono: DataTypes.STRING,       // Ruta o nombre del icono/imagen del curso
  videoUrl: DataTypes.STRING     // URL del video de presentación o intro
}, { timestamps: false });

module.exports = Cursos;

