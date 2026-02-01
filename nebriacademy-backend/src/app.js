const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());


// Rutas por recurso
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
app.use('/usuarios', require('./routes/usuarios'));
app.use('/videos', require('./routes/videos'));

const sequelize = require('./database/connection');

// Sincronizar modelos con la base de datos (añade columnas nuevas si faltan)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
    // Inicia el servidor
    app.listen(3000, () => console.log('Servidor ejecutándose en http://localhost:3000'));
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
    // Iniciar de todos modos o manejar error
    app.listen(3000, () => console.log('Servidor ejecutándose en http://localhost:3000 con errores de sincronización'));
  });