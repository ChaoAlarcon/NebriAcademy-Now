const Alumnos = require('./src/models/Alumnos');
const sequelize = require('./src/database/connection');

// Script para verificar los datos de la tabla 'alumnos'
async function checkAlumnos() {
    try {
        const alumnos = await Alumnos.findAll();
        console.log('--- ALUMNOS DATA ---');
        // Imprimir datos básicos de cada alumno
        alumnos.forEach(a => {
            console.log(`ID: ${a.id}, Nombre: ${a.nombre}, Email: ${a.email}, DNI: ${a.dni}`);
        });
        console.log('--- END ---');
    } catch (err) {
        console.error('Error checking alumnos:', err); // Manejo de errores
    } finally {
        await sequelize.close(); // Cerrar conexión
    }
}

checkAlumnos();

