// Cargar variables de entorno si no se han cargado (opcional aquí si se carga en app.js, pero buena práctica para scripts sueltos)
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require('sequelize');

// Configuración de la conexión a la base de datos MySQL usando Sequelize
// Se obtienen los parámetros de conexión desde las variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Nombre de la base de datos
    process.env.DB_USER,      // Usuario de la base de datos
    process.env.DB_PASSWORD,  // Contraseña del usuario
    {
      host: process.env.DB_HOST,      // Host de la base de datos (ej. localhost)
      dialect: process.env.DB_DIALECT // Dialecto de la base de datos (ej. mysql)
    });

// Verificar que la conexión a la base de datos es correcta
sequelize.authenticate().then(() => {
    console.log('Conexión establecida correctamente.');

}).catch((error) => {
    console.error('No se pudo conectar a la base de datos.', error);
});

// Exportar la instancia de sequelize para usarla en otros archivos (modelos, etc.)
module.exports = sequelize;
