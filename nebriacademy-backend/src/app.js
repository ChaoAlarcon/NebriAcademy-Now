// Importar módulos necesarios
const path = require('path');
// Cargar variables de entorno desde el archivo .env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');

// Inicializar la aplicación Express
const app = express();

// Middleware: Habilitar CORS para permitir peticiones desde otros dominios (frontend)
app.use(cors());

// Middleware: Habilitar parsing de JSON en el cuerpo de las peticiones
app.use(express.json());


// Rutas por recurso (Definición de endpoints)
// Cada 'use' asocia una ruta base a un archivo de rutas específico
app.use('/', require('./routes/index'));
app.use('/administradores', require('./routes/administradores'));
app.use('/alumnos', require('./routes/alumnos'));
app.use('/apuntes', require('./routes/apuntes'));
app.use('/cursos', require('./routes/cursos'));
app.use('/cursosalumnos', require('./routes/cursosalumnos'));
app.use('/ejercicios', require('./routes/ejercicios'));
app.use('/incidencias', require('./routes/incidencias'));
app.use('/profesores', require('./routes/profesores'));
app.use('/profesorescursos', require('./routes/profesorescursos'));
app.use('/puntuacionesejercicios', require('./routes/puntuacionesejercicios'));
app.use('/puntuacionescursos', require('./routes/puntuacionescursos'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/videos', require('./routes/videos'));
app.use('/recursos', require('./routes/recursos'));
app.use('/cursosguardados', require('./routes/cursosguardados'));

// Servir archivos estáticos de la carpeta uploads (ubicada en el root del backend)
// Esto permite acceder a los archivos subidos (imágenes, documentos) vía URL
const uploadsPath = path.resolve(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// Importar la conexión a la base de datos
const sequelize = require('./database/connection');

// Sincronizar modelos con la base de datos (añade columnas nuevas si faltan)
// 'alter: true' actualiza las tablas existentes para que coincidan con los modelos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
    // Inicia el servidor en el puerto 3000
    app.listen(3000, () => console.log('Servidor ejecutándose en http://localhost:3000'));
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
    // Intentar iniciar el servidor de todos modos en caso de error de sincronización
    app.listen(3000, () => console.log('Servidor ejecutándose en http://localhost:3000 con errores de sincronización'));
  });
