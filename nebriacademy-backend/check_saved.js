const CursosGuardados = require('./src/models/CursosGuardados');
const sequelize = require('./src/database/connection');

// Script para verificar la tabla 'cursosguardados' y probar la conexión
async function checkDB() {
  try {
    // Verificar conexión
    await sequelize.authenticate();
    console.log('Conexión establecida.');
    
    // Sincronizar modelos (crea la tabla si no existe o la actualiza)
    await sequelize.sync({ alter: true });
    
    // Contar registros existentes
    const count = await CursosGuardados.count();
    console.log(`Número de registros en CursosGuardados: ${count}`);
    
    // Mostrar todos los registros encontrados
    const all = await CursosGuardados.findAll();
    console.log('Registros:', JSON.stringify(all, null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkDB();

