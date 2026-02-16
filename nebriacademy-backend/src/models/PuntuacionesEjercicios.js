const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'puntuacionesejercicios'
// Almacena las calificaciones de los ejercicios entregados por los alumnos
const PuntuacionesEjercicios = sequelize.define('puntuacionesejercicios', {
  ejercicioId: DataTypes.INTEGER, // ID del ejercicio
  alumnoId: DataTypes.INTEGER,    // ID del alumno
  puntuacion: DataTypes.FLOAT     // Nota obtenida
}, { timestamps: false });

module.exports = PuntuacionesEjercicios;
