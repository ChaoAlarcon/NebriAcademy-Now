// Cargar variables de entorno si no se han cargado (opcional aquí si se carga en app.js, pero buena práctica para scripts sueltos)
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require('sequelize');

// Configuración de conexión a la base de datos MySQL
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER,  
    process.env.DB_PASSWORD, 
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT
    });

// Verifica la conexión a la base de datos
sequelize.authenticate().then(() => {
    console.log('Conexión establecida correctamente.');

}).catch((error) => {
    console.error('No se pudo conectar a la base de datos.', error);
});

module.exports = sequelize;
