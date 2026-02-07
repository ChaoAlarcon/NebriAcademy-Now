async function testDuplicateRegistration() {
    const email = "nico@example.com"; // Este email ya existe según check_alumnos.js
    const data = {
        nombre: "Test Duplicate",
        apellidos: "User",
        email: email,
        contrasena: "password123",
        dni: "DNI_TEMP_" + Date.now(),
        numTelefono: "600000000",
        pais: "España",
        localidad: "Madrid"
    };

    try {
        console.log(`Intentando registrar usuario con email duplicado: ${email}`);
        const response = await fetch("http://localhost:3000/alumnos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        console.log("Respuesta del servidor:", response.status);
        const responseData = await response.json();
        console.log("Datos recibidos:", responseData);
        
        if (response.status === 400 && responseData.error.includes("ya está registrado")) {
            console.log("¡ÉXITO! El servidor detectó correctamente el duplicado y devolvió 400.");
        } else {
            console.log("FALLO: El servidor no manejó el duplicado como se esperaba. Status:", response.status);
        }
    } catch (error) {
        console.error("Error en la prueba:", error.message);
    }
}

testDuplicateRegistration();
