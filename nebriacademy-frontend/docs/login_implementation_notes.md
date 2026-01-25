# Apuntes Técnicos: Implementación del Login Funcional

Esta guía detalla paso a paso cómo se transformó el sistema de login de una maqueta visual a una funcionalidad real y segura.

---

## 1. El Backend: Autenticación Centralizada

Dado que los usuarios de la plataforma se dividen en tres tablas (`Alumnos`, `Profesores`, `Administradores`), se implementó una lógica de búsqueda secuencial.

### Archivo: `backend/src/routes/usuarios.js`
Se creó una nueva ruta `POST /login` que realiza lo siguiente:
1. **Extracción de datos**: Obtiene `email` y `contrasena` del cuerpo de la petición.
2. **Búsqueda en cascada**:
   - Primero busca en la base de datos de **Alumnos**.
   - Si no hay éxito, busca en **Profesores**.
   - Finalmente, busca en **Administradores**.
3. **Respuesta**: 
   - Si encuentra el usuario, devuelve un objeto JSON con sus datos básicos y una propiedad `tipo` (el rol).
   - Si no, devuelve un error `401 Unauthorized`.

```javascript
// Ejemplo de búsqueda en cascada
let usuario = await Alumnos.findOne({ where: { email, contrasena } });
if (usuario) return res.json({ ...usuarioData, tipo: 'alumno' });
// ... repite para Profesores y Administradores
```

---

## 2. El Puente: API en el Frontend

Para facilitar el envío de datos desde React, se actualizó el helper de red.

### Archivo: `frontend/src/api/api.js`
Se añadió la función `postData` que configura automáticamente las cabeceras `Content-Type: application/json` y el método `POST`.

---

## 3. El Frontend: Gestión de Estado y Persistencia

El componente del formulario fue el encargado de la interactividad.

### Archivo: `frontend/src/components/LoginGrid.jsx`
- **Estado Local**: Se usa `useState` para capturar lo que el usuario escribe en tiempo real.
- **Envío de Formulario**: Al pulsar el botón, se llama a `postData`.
- **Persistencia (localStorage)**: Si el backend da el visto bueno, guardamos los datos del usuario en el navegador:
  ```javascript
  localStorage.setItem("usuario", JSON.stringify(data));
  ```
- **Redirección**: Tras el éxito, se usa `useNavigate('/')` para enviar al usuario al panel principal.

---

## 4. UI Dinámica: El Navbar

El Navbar debe saber si hay alguien "al mando" para cambiar lo que muestra.

### Archivo: `frontend/src/components/Nav.jsx`
Se implementó un `useEffect` que revisa el `localStorage` al cargar la aplicación:
- **Si hay usuario**: Muestra "Hola, [Nombre]" y un botón de **Salir**.
- **Si NO hay**: Muestra los enlaces de **Login** y **Registro**.
- **Logout**: Al cerrar sesión, simplemente borra el `localStorage` y recarga la página para limpiar el estado global.

---

## 5. Seguridad: Redirecciones y Protección de Páginas

Para evitar que alguien entre en secciones privadas escribiendo la URL directamente, se añadieron "guardias".

### Archivos: `Home.jsx`, `Profesores.jsx`, `Curso.jsx`
En cada una de estas páginas se añadió una comprobación de seguridad en el `useEffect`:
1. Revisa si existe la clave `"usuario"` en el `localStorage`.
2. **Redirección Forzosa**: Si no existe, invoca `navigate('/login')` inmediatamente.
3. **Ocultamiento**: Mientras se comprueba o si falla, la página retorna `null` para no mostrar ni un píxel del contenido privado.

```javascript
useEffect(() => {
    const userStr = localStorage.getItem("usuario");
    if (!userStr) {
        navigate('/login');
        return;
    }
}, []);
```

---

### Resumen del Flujo de Datos
1. **User** -> Escribe credenciales -> **Frontend**.
2. **Frontend** -> `POST` -> **Backend**.
3. **Backend** -> Query DB -> **Respuesta OK/Error**.
4. **Frontend** -> Guarda en `localStorage` -> Redirige.
5. **Vistas Protegidas** -> Comprueban `localStorage` -> Muestran Contenido.
