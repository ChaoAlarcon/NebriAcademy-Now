const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'incidencias'
// Registra reportes de problemas técnicos o quejas
const Incidencias = sequelize.define('incidencias', {
  tipo: DataTypes.STRING,       // Tipo de incidencia (técnica, contenido, etc.)
  descripcion: DataTypes.TEXT,  // Descripción detallada del problema
  resuelto: DataTypes.BOOLEAN,  // Estado de la incidencia (true: resuelto, false: pendiente)
  usuario: DataTypes.INTEGER    // ID del usuario que reportó la incidencia
}, { timestamps: false });


module.exports = Incidencias;

