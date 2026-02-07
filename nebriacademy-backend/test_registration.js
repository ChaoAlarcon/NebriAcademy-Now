async function testRegistration() {
    const data = {
        nombre: "Test",
        apellidos: "User",
        email: "test_" + Date.now() + "@example.com",
        contrasena: "password123",
        dni: "DNI" + Date.now(),
        numTelefono: "600000000",
        pais: "España",
        localidad: "Madrid"
    };

    try {
        console.log("Enviando petición de registro...");
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
        
        if (response.status === 201) {
            console.log("¡Registro exitoso!");
        } else {
            console.log("El registro falló con status:", response.status);
        }
    } catch (error) {
        console.error("Error en el registro:", error.message);
    }
}

testRegistration();
