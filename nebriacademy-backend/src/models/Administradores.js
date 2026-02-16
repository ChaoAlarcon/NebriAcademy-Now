const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'administradores'
// Representa a los usuarios con privilegios de administración
const Administradores = sequelize.define('administradores', {
  usuarioId: DataTypes.INTEGER, // ID único del usuario
  dni: { type: DataTypes.STRING, unique: true }, // Documento de identidad (único)
  nombre: DataTypes.STRING,     // Nombre del administrador
  apellidos: DataTypes.STRING,  // Apellidos del administrador
  email: { type: DataTypes.STRING, unique: true }, // Correo electrónico (único)
  contrasena: DataTypes.STRING, // Contraseña (debería estar hasheada)
  numTelefono: DataTypes.STRING, // Número de teléfono
  redes: DataTypes.STRING,      // Enlaces a redes sociales
  pais: DataTypes.STRING,       // País de residencia
  localidad: DataTypes.STRING   // Localidad o ciudad
}, { timestamps: false }); // No añadir columnas de createdAt y updatedAt


module.exports = Administradores;

