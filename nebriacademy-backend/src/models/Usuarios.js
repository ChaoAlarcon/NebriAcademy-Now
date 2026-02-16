const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'usuarios'
// Tabla base para gestionar los roles de los usuarios
const Usuarios = sequelize.define('usuarios', {
  tipo: {
    type: DataTypes.ENUM('alumno', 'profesor', 'administrador'), // Roles permitidos
    allowNull: false
  }
}, { timestamps: false });


module.exports = Usuarios;
