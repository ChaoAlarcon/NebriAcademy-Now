# NebriAcademy Now: Plataforma E-Learning Full Stack

![Estado del Proyecto](https://img.shields.io/badge/Status-En%20Desarrollo-orange?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)
![Express](https://img.shields.io/badge/Framework-Express.js-000000?style=for-the-badge&logo=express)
![Sequelize](https://img.shields.io/badge/ORM-Sequelize-52B0E7?style=for-the-badge&logo=sequelize)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql)

**NebriAcademy Now** es una solución e-learning integral diseñada como proyecto intermodular para el ciclo de **Desarrollo de Aplicaciones Web (DAW)**. La plataforma facilita la administración completa de un centro educativo en línea, posibilitando a alumnos cursar asignaturas, a profesores gestionar el material didáctico y a administradores controlar la consistencia de los datos del sistema.

---

## 🚀 Características Principales

*   **Autenticación en Cascada por Perfiles:** Mecanismo de inicio de sesión único y secuencial que discrimina automáticamente entre tres tipos de usuario: Alumno, Profesor y Administrador.
*   **Gestión de Perfil y Baja de Usuario:** Los usuarios pueden ver sus datos personales y solicitar la eliminación segura de su cuenta de la base de datos de manera definitiva.
*   **Dashboards Dinámicos Personalizados:**
    *   *Estudiante:* Seguimiento de cursos activos, almacenamiento de cursos favoritos en la lista de "Guardados", visualización de apuntes, vídeos didácticos y subida de tareas.
    *   *Profesor:* Panel de control para la publicación de temarios (cursos), administración de apuntes, vídeos (galería de YouTube) y recursos compartidos.
    *   *Administrador:* Acceso a métricas globales de la plataforma y herramientas avanzadas de supervisión y gestión.
*   **Catálogo de Aprendizaje Interactivo:** Detalle estructurado de cursos con visualización del docente asignado, recursos en formato PDF/documento y enlaces multimedia.
*   **Sistema de Reseñas y Puntuaciones:** Los alumnos pueden calificar los cursos mediante un selector de estrellas y añadir valoraciones textuales detalladas.
*   **Validación de Seguridad por reCAPTCHA:** Formulario de registro y accesos protegidos mediante Google reCAPTCHA v2 para evitar interacciones automatizadas (bots).
*   **Rutas Protegidas:** Persistencia del estado de sesión basada en `localStorage` con redirecciones automáticas para accesos no autorizados a páginas privadas.

---

## 🛠️ Stack Tecnológico

### Frontend
*   **Librería Principal:** React ^19.2.0 (Componentes Funcionales y Hooks)
*   **Compilador & Bundler:** Vite ^7.3.1
*   **Enrutado:** React Router DOM v7 (^7.11.0) con configuración declarativa mediante `createBrowserRouter`
*   **Seguridad:** Google reCAPTCHA v2 (`react-google-recaptcha` ^3.1.0)
*   **Diseño:** CSS3 Puro con variables personalizadas y animaciones optimizadas para una interfaz premium

### Backend
*   **Entorno de Ejecución:** Node.js v18+
*   **Framework Web:** Express.js ^5.2.1
*   **ORM:** Sequelize ^6.37.7
*   **Driver BD:** `mysql2` para conexión directa y eficiente a MySQL
*   **Gestión de Ficheros:** `multer` ^2.0.2 para la subida y almacenamiento local de recursos docentes y portadas
*   **Variables de Entorno:** `dotenv` ^17.2.3 para configuración segura de credenciales

---

## 📂 Estructura del Proyecto

```
NebriAcademy-Now/
│
├── Documents/                      → Planificación, diagramas ER, Casos de Uso y scripts SQL
│   ├── Modulado_de_datos/
│   │   ├── nebriacademy.sql        → Script de creación y carga de datos de prueba
│   │   ├── Diagrama_ER_NebriAcademy.drawio
│   │   └── Diagrama_ER_NebriAcademy.png
│   └── Memoria del Proyecto - NebriAcademy Now.pdf
│
├── nebriacademy-backend/           → Servidor API REST Express
│   ├── src/
│   │   ├── database/               → Conexión a MySQL e inicialización de Sequelize
│   │   │   └── connection.js
│   │   ├── models/                 → Modelos ORM (Usuarios, Alumnos, Cursos, etc.)
│   │   ├── routes/                 → Endpoints modularizados por recurso
│   │   └── app.js                  → Archivo principal y arranque del servidor
│   ├── uploads/                    → Almacenamiento estático de ficheros subidos
│   └── .env                        → Configuración local de base de datos y puertos
│
└── nebriacademy-frontend/          → Aplicación Single Page Application (SPA) React
    ├── public/                     → Activos estáticos públicos (logos, placeholders)
    └── src/
        ├── api/                    → Cliente HTTP (fetch) unificado en `api.js`
        ├── components/             → Componentes UI reutilizables (Navegación, Formularios, Estrellas)
        ├── pages/                  → Vistas principales y Dashboards condicionales
        ├── router/                 → Enrutador declarativo (`AppRouter.jsx`)
        ├── style/                  → Estilos globales (`global.css`) y locales por componente
        ├── App.jsx                 → Punto de anclaje de rutas privadas y diseño general
        └── main.jsx                → Punto de entrada del compilador React/Vite
```

---

## 📄 Mapa de Navegación (Rutas Frontend)

Todas las vistas privadas están envueltas en un componente protector (`ProtectedRoute`) que evalúa la presencia de credenciales del usuario:

| Vista | Ruta | Acceso | Propósito |
|---|---|---|---|
| **Selección de Login** | `/login` | Público | Pantalla para elegir inicio de sesión como Alumno o Profesor |
| **Login Alumnos** | `/login-form` | Público | Acceso específico para estudiantes y administrador |
| **Login Profesores** | `/login-profesor` | Público | Acceso exclusivo para perfiles docentes |
| **Registro** | `/register` | Público | Alta de nuevos Alumnos Externos con reCAPTCHA |
| **Inicio (Dashboard)** | `/` | Privado | Muestra condicionalmente `StudentDashboard`, `ProfessorDashboard` o `AdminDashboard` |
| **Catálogo** | `/cursos` | Privado | Catálogo general de asignaturas formativas |
| **Detalle de Curso** | `/cursos/:id` | Privado | Ficha detallada de un curso (recursos, profesor, opiniones) |
| **Nuevo Curso** | `/nuevo-curso` | Privado | Formulario de creación de cursos para profesores/administradores |
| **Profesores** | `/profesores` | Privado | Visualización y listado de profesores disponibles |
| **Gestión Alumnos** | `/alumnos` | Privado | Tabla administrativa para gestionar altas y bajas de alumnos |
| **MasterClass** | `/masterclass` | Privado | Acceso a emisiones y contenido de clases magistrales |
| **Perfil** | `/perfil` | Privado | Panel de datos del usuario autenticado con opción de eliminación de cuenta |

---

## 🔌 Endpoints de la API REST (Backend)

La API corre por defecto en `http://localhost:3000` y expone las siguientes rutas:

*   **Autenticación**
    *   `POST /usuarios/login` - Valida las credenciales de forma secuencial por tabla.
*   **Usuarios & Perfiles**
    *   `GET/POST/PUT/DELETE /usuarios` - Gestión global de usuarios.
    *   `GET/POST/PUT/DELETE /alumnos` - Datos específicos de estudiantes.
    *   `GET/POST/PUT/DELETE /profesores` - Datos específicos del profesorado.
    *   `GET/POST/PUT/DELETE /administradores` - Acciones de administración general.
*   **Cursos & Contenidos**
    *   `GET/POST/PUT/DELETE /cursos` - Administración de cursos.
    *   `GET/POST/PUT/DELETE /cursosguardados` - Cursos guardados en favoritos de cada alumno.
    *   `GET/POST/PUT/DELETE /recursos` - Ficheros y apuntes adicionales de cada asignatura.
    *   `GET/POST/PUT/DELETE /videos` - Enlaces y metadatos de vídeos (galería multimedia).
*   **Interacciones & Calificaciones**
    *   `GET/POST/PUT/DELETE /puntuacionescursos` - Reseñas y estrellas otorgadas por alumnos a cursos.
    *   `GET/POST/PUT/DELETE /incidencias` - Gestión de incidencias técnicas.

---

## ⚙️ Instalación y Ejecución

### Prerrequisitos
*   **Node.js** (v18 o superior)
*   **MySQL Server** configurado y en ejecución
*   **Gestor de paquetes** `npm`

### 1. Clonar el repositorio
```bash
git clone https://github.com/ChaoAlarcon/NebriAcademy-Now.git
cd NebriAcademy-Now
```

### 2. Configurar el Backend (Servidor Express)
1. Navega a la carpeta correspondiente:
   ```bash
   cd nebriacademy-backend
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz de `nebriacademy-backend/` y ajusta tus credenciales de MySQL:
   ```env
   DB_NAME=nebriacademy
   DB_USER=tu_usuario_mysql
   DB_PASSWORD=tu_contraseña_mysql
   DB_HOST=localhost
   DB_DIALECT=mysql
   PORT=3000
   RECAPTCHA_SECRET_KEY=clave_secreta_recaptcha
   ```
4. Sincroniza la base de datos e inicia el backend en modo desarrollo:
   ```bash
   npm run dev
   ```
   *(El servidor utilizará automáticamente Sequelize con `alter: true` para estructurar la base de datos y se ejecutará en `http://localhost:3000`)*.

### 3. Configurar el Frontend (Vite + React)
1. Desde la raíz de la solución, navega a la carpeta de frontend:
   ```bash
   cd ../nebriacademy-frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
4. Abre tu navegador en **`http://localhost:5173`** para interactuar con la aplicación.

---

## 🗄️ Inicialización de la Base de Datos

Si necesitas poblar la base de datos inicialmente con registros de prueba, importa el fichero SQL que se encuentra en la carpeta de documentación:
`Documents/Modulado_de_datos/nebriacademy.sql`

---

## 👤 Autor

**Chao Alarcón** — Proyecto Intermodular DAW

---

*© 2026 NebriAcademy Now. Proyecto académico.*
