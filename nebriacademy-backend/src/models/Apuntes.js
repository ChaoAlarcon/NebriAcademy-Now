const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'apuntes'
// Almacena información sobre apuntes o notas subidas
const Apuntes = sequelize.define('apuntes', {
  autor: DataTypes.INTEGER,     // ID del usuario que subió el apunte
  curso: DataTypes.INTEGER,     // ID del curso al que pertenece
  contenido: DataTypes.TEXT,    // Contenido del apunte (texto o referencia)
  valoracion: DataTypes.FLOAT   // Valoración media del apunte
}, { timestamps: false });

module.exports = Apuntes;

