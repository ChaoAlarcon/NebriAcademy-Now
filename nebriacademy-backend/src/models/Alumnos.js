const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'alumnos'
// Representa a los estudiantes registrados en la plataforma
const Alumnos = sequelize.define('alumnos', {
  usuarioId: DataTypes.INTEGER, // ID único del usuario
  dni: { type: DataTypes.STRING, unique: true }, // Documento de identidad (único)
  nombre: DataTypes.STRING,     // Nombre del alumno
  apellidos: DataTypes.STRING,  // Apellidos del alumno
  email: { type: DataTypes.STRING, unique: true }, // Correo electrónico (único)
  contrasena: DataTypes.STRING, // Contraseña
  numeroTarjeta: { type: DataTypes.STRING, unique: true }, // Número de tarjeta (para pagos o identificación)
  numTelefono: DataTypes.STRING, // Número de teléfono
  redes: DataTypes.TEXT,        // Redes sociales (tipo TEXT para mayor longitud)
  pais: {
    type: DataTypes.STRING,
    validate: {
      isIn: {
        args: [['España', 'México', 'Colombia', 'Argentina', 'Perú', 'Venezuela', 'Chile', 'Ecuador', 'Guatemala', 'Cuba', 'Bolivia', 'República Dominicana', 'Honduras', 'Paraguay', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Puerto Rico', 'Panamá', 'Uruguay', 'Guinea Ecuatorial']],
        msg: "El país debe ser de habla hispana válido."
      }
    }
  },       // País
  localidad: DataTypes.STRING   // Localidad
}, { timestamps: false });

module.exports = Alumnos;

