const Alumnos = require('./src/models/Alumnos');
const sequelize = require('./src/database/connection');

async function checkAlumnos() {
    try {
        const alumnos = await Alumnos.findAll();
        console.log('--- ALUMNOS DATA ---');
        alumnos.forEach(a => {
            console.log(`ID: ${a.id}, Nombre: ${a.nombre}, Email: ${a.email}, DNI: ${a.dni}`);
        });
        console.log('--- END ---');
    } catch (err) {
        console.error('Error checking alumnos:', err);
    } finally {
        await sequelize.close();
    }
}

checkAlumnos();
