const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'ejercicios'
// Almacena información sobre ejercicios entregados o disponibles
const Ejercicios = sequelize.define('ejercicios', {
  autor: DataTypes.INTEGER,     // ID del usuario autor (profesor o alumno)
  curso: DataTypes.INTEGER,     // ID del curso relacionado
  valoracion: DataTypes.FLOAT   // Calificación o valoración del ejercicio
}, { timestamps: false });


module.exports = Ejercicios;

