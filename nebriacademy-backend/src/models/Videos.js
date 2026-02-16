const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'videos'
// Almacena información sobre videos educativos
const Videos = sequelize.define('videos', {
  autor: DataTypes.INTEGER,     // ID del autor
  curso: DataTypes.INTEGER,     // ID del curso asociado
  duracion: DataTypes.INTEGER,  // Duración en segundos o minutos
  valoracion: DataTypes.FLOAT   // Calificación del video
}, { timestamps: false });

module.exports = Videos;

