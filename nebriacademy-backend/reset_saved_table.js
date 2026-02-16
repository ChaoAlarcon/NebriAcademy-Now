const CursosGuardados = require('./src/models/CursosGuardados');
const sequelize = require('./src/database/connection');

// Script para reiniciar (borrar y crear de nuevo) la tabla 'cursosguardados'
async function resetTable() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida.');
    
    // Eliminar y recrear la tabla (force: true)
    await CursosGuardados.sync({ force: true });
    console.log('Tabla CursosGuardados recreada con éxito.');
    
    // Insertar un registro de prueba
    await CursosGuardados.create({ cursoId: 1, alumnoId: 1 });
    console.log('Registro de prueba insertado.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetTable();

