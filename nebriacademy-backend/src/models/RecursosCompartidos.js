const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const RecursosCompartidos = sequelize.define('recursos_compartidos', {
  autorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cursoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tipo: {
    type: DataTypes.ENUM('apuntes', 'proyecto'),
    allowNull: false
  },
  formato: {
    type: DataTypes.ENUM('archivo', 'url'),
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nombreArchivo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rutaArchivo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, { 
  timestamps: true,
  tableName: 'recursos_compartidos'
});

module.exports = RecursosCompartidos;
