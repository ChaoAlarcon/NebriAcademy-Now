const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'cursosguardados'
// Almacena los cursos que los alumnos han guardado como favoritos
const CursosGuardados = sequelize.define('cursosguardados', {
  cursoId: {
    type: DataTypes.INTEGER,
    allowNull: false // El curso es obligatorio
  },
  alumnoId: {
    type: DataTypes.INTEGER,
    allowNull: false // El alumno es obligatorio
  }
}, { 
  timestamps: false // No se guardan fechas de creación/modificación
});

module.exports = CursosGuardados;

