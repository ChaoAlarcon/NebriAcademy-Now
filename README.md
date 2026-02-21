# NebriAcademy Now: Plataforma E-Learning Full Stack

![Estado del Proyecto](https://img.shields.io/badge/Status-En%20Desarrollo-red?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)
![Express](https://img.shields.io/badge/Framework-Express.js-000000?style=for-the-badge&logo=express)
![Sequelize](https://img.shields.io/badge/ORM-Sequelize-52B0E7?style=for-the-badge&logo=sequelize)

**NebriAcademy Now** es una plataforma de formación online integral diseñada como proyecto intermodular para el ciclo de **Desarrollo de Aplicaciones Web (DAW)**. La plataforma ofrece una experiencia de aprendizaje completa, desde la gestión de profesores y cursos hasta un DashBoard personalizado para el usuario.

---

## 🚀 Características Principales

*   **Registro y Login Detallado:** Sistema de acceso diferenciado para tres perfiles (Alumno Interno, Alumno Externo y Profesor), con validación en cascada y registro completo para usuarios externos.
*   **Dashboard de Estudiante Real:** Panel dinámico que muestra estadísticas en tiempo real (cursos, profesores, alumnos) y un sistema de seguimiento de **Cursos Guardados**.
*   **Sistema de Reseñas y Puntuaciones:** Los estudiantes pueden puntuar cursos y dejar comentarios detallados sobre su experiencia.
*   **Gestión de Cursos y Profesores:** Catálogos completos con vistas detalladas. La página de curso incluye información del profesor asignado mediante relaciones de datos complejas.
*   **Seguridad Avanzada:** Protección de rutas privadas (Home, Cursos, Profesores) mediante persistencia en `localStorage` y redirección inteligente.
*   **Interfaz Premium:** Diseño moderno y coherente utilizando variables CSS globales, transiciones suaves y una estética profesional alineada con la identidad institucional.
*   **Arquitectura REST Robust:** Backend desarrollado con Node.js, Express y Sequelize ORM para una gestión eficiente de la base de datos MySQL.

---

## 📂 Estructura del Proyecto

/Documents → Recursos de datos (SQL) y documentación 

/nebriacademy-backend 

- src/database → Conexión a la base de datos 

- src/models → Modelos de datos 

- src/routes → Definición de endpoints 

- app.js → Archivo principal de la aplicación 

/nebriacademy-frontend 

- /public→ Recursos multimedia utilizados  

- src/api → Modelos de datos 

- src/components→ UI Reutilizable 

- src/pages→ Dashboards y Vistas 

- src/router → Definición de endpoints 

- src/style→ Hojas de estilo globales y locales 

- App.jsx → Archivo principal de la aplicación React 

- main.jsx → Punto de entrada de la aplicación React 

---

## 🛠️ Instalación y Ejecución

### Backend
1. Navega a `nebriacademy-backend/src`.
2. Instala las dependencias: `npm install`.
3. Inicia la base de datos.
4. Inicia el servidor: `nodemon app.js`.

### Frontend
1. Navega a `nebriacademy-frontend/src`.
2. Instala las dependencias: `npm install`.
3. Inicia la aplicación: `npm run dev`.

---
