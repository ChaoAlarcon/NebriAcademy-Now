const express = require('express');
const router = express.Router();

// Página de bienvenida de la API. Muestra todos los endpoints disponibles en HTML.
// Útil para explorar rápidamente la API desde el navegador.
router.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>NebriAcademy Now API</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 40px auto;
                        padding: 20px;
                        background-color: #f4f4f9;
                    }
                    h1 { color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px; }
                    .info { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                    code { background: #eee; padding: 2px 5px; border-radius: 4px; font-family: monospace; }
                    ul { list-style: none; padding: 0; }
                    li { margin-bottom: 8px; }
                    a { color: #1976d2; text-decoration: none; font-weight: bold; }
                    a:hover { text-decoration: underline; }
                    .endpoint { font-family: monospace; color: #d32f2f; }
                </style>
            </head>
            <body>
                <div class="info">
                    <h1>Bienvenido a la API de NebriAcademy Now</h1>
                    <p>Utiliza los siguientes endpoints para acceder a los datos en formato JSON:</p>
                    <ul>
                        <li>Para ver una tabla completa: <code>localhost:3000/&lt;nombre_tabla&gt;</code></li>
                        <li>Para ver un registro único: <code>localhost:3000/&lt;nombre_tabla&gt;/&lt;id&gt;</code></li>
                    </ul>

                    <h3>Endpoints Disponibles:</h3>
                    <ul>
                        <li><a href="/administradores" class="endpoint">/administradores</a></li>
                        <li><a href="/alumnos" class="endpoint">/alumnos</a></li>
                        <li><a href="/apuntes" class="endpoint">/apuntes</a></li>
                        <li><a href="/cursos" class="endpoint">/cursos</a></li>
                        <li><a href="/cursosalumnos" class="endpoint">/cursosalumnos</a></li>
                        <li><a href="/cursosguardados" class="endpoint">/cursosguardados</a></li>
                        <li><a href="/ejercicios" class="endpoint">/ejercicios</a></li>
                        <li><a href="/incidencias" class="endpoint">/incidencias</a></li>
                        <li><a href="/profesores" class="endpoint">/profesores</a></li>
                        <li><a href="/profesorescursos" class="endpoint">/profesorescursos</a></li>
                        <li><a href="/puntuacionescursos" class="endpoint">/puntuacionescursos</a></li>
                        <li><a href="/puntuacionesejercicios" class="endpoint">/puntuacionesejercicios</a></li>
                        <li><a href="/recursos" class="endpoint">/recursos</a></li>
                        <li><a href="/usuarios" class="endpoint">/usuarios</a></li>
                        <li><a href="/videos" class="endpoint">/videos</a></li>
                    </ul>
                </div>
            </body>
        </html>
    `);
});

module.exports = router;
