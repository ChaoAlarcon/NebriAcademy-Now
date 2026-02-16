const http = require('http');

// Configuración de la petición HTTP (sin dependencias externas)
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/cursosguardados',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

// Crear la solicitud
const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Escribir datos en el cuerpo de la petición
req.write(JSON.stringify({ cursoId: 1, alumnoId: 1 }));
req.end();

