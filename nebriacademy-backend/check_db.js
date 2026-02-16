const Cursos = require('./src/models/Cursos');
const sequelize = require('./src/database/connection');

// Script para verificar los datos de la tabla 'cursos'
async function checkCursos() {
    try {
        const cursos = await Cursos.findAll();
        console.log('--- CURSOS DATA ---');
        // Imprimir datos básicos de cada curso
        cursos.forEach(c => {
            console.log(`ID: ${c.id}, Nombre: ${c.nombreCurso}, VideoUrl: ${c.videoUrl || 'NULL'}`);
        });
        console.log('--- END ---');
    } catch (err) {
        console.error('Error checking cursos:', err);
    } finally {
        await sequelize.close(); // Cerrar conexión
    }
}

checkCursos();

