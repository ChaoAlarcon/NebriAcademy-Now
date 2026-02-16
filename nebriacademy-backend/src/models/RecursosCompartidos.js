const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Modelo para la tabla 'recursos_compartidos'
// Almacena recursos que pueden ser compartidos entre usuarios (apuntes, proyectos)
const RecursosCompartidos = sequelize.define('recursos_compartidos', {
  autorId: {
    type: DataTypes.INTEGER,
    allowNull: false // El recurso debe tener un autor
  },
  cursoId: {
    type: DataTypes.INTEGER,
    allowNull: false // Debe estar asociado a un curso
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false // Título del recurso
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true // Descripción opcional
  },
  tipo: {
    type: DataTypes.ENUM('apuntes', 'proyecto'), // Tipo de recurso
    allowNull: false
  },
  formato: {
    type: DataTypes.ENUM('archivo', 'url'), // Formato: archivo subido o enlace externo
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true // URL si el formato es 'url'
  },
  nombreArchivo: {
    type: DataTypes.STRING,
    allowNull: true // Nombre del archivo si el formato es 'archivo'
  },
  rutaArchivo: {
    type: DataTypes.STRING,
    allowNull: true // Ruta física donde se guardó el archivo
  }
}, { 
  timestamps: true, // Se guardan fechas de creación y actualización automáticamente
  tableName: 'recursos_compartidos' // Nombre explícito de la tabla
});

module.exports = RecursosCompartidos;
