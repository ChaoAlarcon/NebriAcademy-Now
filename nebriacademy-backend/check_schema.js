const sequelize = require('./src/database/connection');

// Script para inspeccionar el esquema de la base de datos (columnas de tablas)
async function checkSchema() {
  try {
    // Describir tabla 'cursos'
    const [results] = await sequelize.query("DESCRIBE cursos");
    console.log('Schema for cursos:', JSON.stringify(results, null, 2));
    
    // Describir tabla 'cursosguardados'
    const [results2] = await sequelize.query("DESCRIBE cursosguardados");
    console.log('Schema for cursosguardados:', JSON.stringify(results2, null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkSchema();

