const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Cursos = sequelize.define('cursos', {
  nombreCurso: DataTypes.STRING,
  categoria: DataTypes.STRING,
  profesor: DataTypes.INTEGER,
  nivel: DataTypes.STRING,
  valoracion: DataTypes.FLOAT,
  comentarios: DataTypes.TEXT,
  descripcion: DataTypes.TEXT,
  icono: DataTypes.STRING,
  videoUrl: DataTypes.STRING
}, { timestamps: false });

module.exports = Cursos;
