const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'profesores'
// Representa a los docentes de la plataforma
const Profesores = sequelize.define('profesores', {
  usuarioId: DataTypes.INTEGER, // ID único del usuario
  dni: { type: DataTypes.STRING, unique: true }, // Documento de identidad (único)
  nombre: DataTypes.STRING,     // Nombre del profesor
  apellidos: DataTypes.STRING,  // Apellidos del profesor
  email: { type: DataTypes.STRING, unique: true }, // Correo electrónico (único)
  contrasena: DataTypes.STRING, // Contraseña
  numCuentaBancaria: { type: DataTypes.STRING, unique: true }, // Cuenta bancaria para pagos
  numTelefono: DataTypes.STRING, // Número de teléfono de contacto
  redes: DataTypes.TEXT,        // Redes sociales
  pais: DataTypes.STRING,       // País de residencia
  localidad: DataTypes.STRING,  // Localidad
  especializacion: DataTypes.STRING // Área de especialización del profesor
}, { timestamps: false });

module.exports = Profesores;

