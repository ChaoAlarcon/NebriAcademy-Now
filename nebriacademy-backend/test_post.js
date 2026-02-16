const fetch = require('node-fetch');

const API_URL = "http://localhost:3000";

// Script de prueba para verificar endpoint POST usando fetch
async function testPost() {
  try {
    console.log("Testeando POST /cursosguardados...");
    // Realizar POST para guardar un curso
    const res = await fetch(`${API_URL}/cursosguardados`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cursoId: 1, alumnoId: 1 })
    });
    
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Response:", JSON.stringify(data, null, 2));
    
    // Verificar si se guardó correctamente consultando los cursos del alumno
    const checkRes = await fetch(`${API_URL}/cursosguardados/alumno/1`);
    const checkData = await checkRes.json();
    console.log("Saved Courses for pupil 1:", JSON.stringify(checkData, null, 2));
    
  } catch (error) {
    console.error("Error:", error);
  }
}

testPost();

