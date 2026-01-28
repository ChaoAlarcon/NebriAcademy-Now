# NebriAcademy Now: Plataforma E-Learning Full Stack

![Estado del Proyecto](https://img.shields.io/badge/Status-En%20Desarrollo-red?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)
![Express](https://img.shields.io/badge/Framework-Express.js-000000?style=for-the-badge&logo=express)
![Sequelize](https://img.shields.io/badge/ORM-Sequelize-52B0E7?style=for-the-badge&logo=sequelize)

**NebriAcademy Now** es una plataforma de formación online integral diseñada como proyecto integrador para el ciclo de **Desarrollo de Aplicaciones Web (DAW)**. La plataforma ofrece una experiencia de aprendizaje completa, desde la gestión de profesores y cursos hasta un panel de control personalizado para el estudiante.

---

## 🚀 Características Principales

*   **Dashboard de Estudiante:** Panel principal dinámico que muestra estadísticas reales del backend (cursos, profesores, alumnos e incidencias) y acceso rápido a los cursos activos.
*   **Gestión de Cursos y Profesores:** Catálogos completos con vistas detalladas. La página de curso incluye información del profesor asignado mediante relaciones de datos.
*   **Autenticación Centralizada:** Sistema de login funcional que valida credenciales en múltiples tablas (Alumnos, Profesores, Administradores) mediante una búsqueda en cascada.
*   **Seguridad y Acceso:** Protección de rutas privadas (Home, Cursos, Profesores) con redirección automática al login para usuarios no autenticados.
*   **Interfaz Premium:** Diseño moderno y coherente utilizando variables CSS globales, transiciones suaves y una estética alineada con la identidad de Nebrija.
*   **Arquitectura REST:** Backend robusto desarrollado con Express y Sequelize ORM para una gestión eficiente de la base de datos MySQL.

---

## 📂 Estructura del Proyecto

El repositorio se divide en dos áreas principales:

```text
NebriAcademy-Now/
├── nebriacademy-frontend/    # Cliente (React + Vite)
│   ├── src/
│   │   ├── components/       # Nav, Footer, LoginGrid, etc.
│   │   ├── pages/            # Home (Dashboard), Cursos, Profesores, Curso Detalle...
│   │   ├── style/            # CSS organizado (Home.css, Login.css, etc.)
│   │   └── api/              # Helpers para peticiones al backend
├── nebriacademy-backend/     # Servidor (Node.js + Express)
│   ├── src/
│   │   ├── routes/           # Endpoints de la API (Cursos, Usuarios, Login...)
│   │   ├── models/           # Modelos de datos de Sequelize
│   │   └── database/         # Configuración de la conexión a DB
```

---

## 🛠️ Instalación y Ejecución

### Backend
1. Navega a `nebriacademy-backend`.
2. Instala las dependencias: `npm install`.
3. Configura el archivo `.env` con tus credenciales de base de datos.
4. Inicia el servidor: `npm run dev` (requiere nodemon) o `npm start`.

### Frontend
1. Navega a `nebriacademy-frontend`.
2. Instala las dependencias: `npm install`.
3. Inicia la aplicación: `npm run dev`.

---

## 📝 Notas de Implementación
Para detalles técnicos profundos sobre el sistema de login y seguridad, consulta los [apuntes de implementación](file:///c:/GitHub/NebriAcademy-Now/nebriacademy-frontend/docs/login_implementation_notes.md).

## 📝 Notas de los desarrolladores:

- Usar Zustand para un diferente Home tanto para Alumnos como para Profesores