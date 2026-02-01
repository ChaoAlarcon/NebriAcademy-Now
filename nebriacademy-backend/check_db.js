const Cursos = require('./src/models/Cursos');
const sequelize = require('./src/database/connection');

async function checkCursos() {
    try {
        const cursos = await Cursos.findAll();
        console.log('--- CURSOS DATA ---');
        cursos.forEach(c => {
            console.log(`ID: ${c.id}, Nombre: ${c.nombreCurso}, VideoUrl: ${c.videoUrl || 'NULL'}`);
        });
        console.log('--- END ---');
    } catch (err) {
        console.error('Error checking cursos:', err);
    } finally {
        await sequelize.close();
    }
}

checkCursos();
