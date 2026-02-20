# PORTADA

<br><br><br><br>

# NebriAcademy Now
## Plataforma Web de E-Learning Full Stack

<br><br><br><br><br><br>

**Nombre del desarrollador:** Chao An Alarcón Chen  
**Curso académico:** 2º DAW  
**Tutora/Tutor del proyecto:** Rubén Gonzalez Martín  

---

## ÍNDICE

1. [JUSTIFICACIÓN DEL PROYECTO](#1-justificación-del-proyecto)
2. [INTRODUCCIÓN](#2-introducción)
3. [OBJETIVOS](#3-objetivos)
    * 3.1 [Objetivo General](#31-objetivo-general)
    * 3.2 [Objetivos Específicos](#32-objetivos-específicos)
4. [DESARROLLO](#4-desarrollo)
    * 4.1 [Fundamentación Teórica](#41-fundamentación-teórica)
    * 4.2 [Modelos (Base de Datos)](#42-modelos-base-de-datos)
    * 4.3 [Rutas (API REST)](#43-rutas-api-rest)
    * 4.4 [Estructura del Proyecto](#44-estructura-del-proyecto)
5. [MATERIALES Y MÉTODOS](#5-materiales-y-métodos)
6. [RESULTADOS Y ANÁLISIS](#6-resultados-y-análisis)
7. [CONCLUSIONES](#7-conclusiones)
8. [LÍNEAS DE INVESTIGACIÓN FUTURAS](#8-líneas-de-investigación-futuras)
9. [BIBLIOGRAFÍA](#9-bibliografía)
10. [ANEXOS](#10-anexos)
11. [AGRADECIMIENTOS](#11-agradecimientos)

---

## 1. JUSTIFICACIÓN DEL PROYECTO

El proyecto **NebriAcademy Now** se concibe como una plataforma de E-learning integral, inspirada en servicios líderes como Coursera o Udemy, orientada a la gestión de contenidos educativos, usuarios y relaciones académicas. Si bien en fases anteriores el desarrollo se centró exclusivamente en el backend, la versión actual evoluciona hacia una solución **Full Stack** completa.

El objetivo principal es proporcionar no solo una API REST sólida y escalable mediante Node.js y Express, sino también una interfaz de usuario dinámica y moderna construida con React. Esta evolución permite una gestión académica real, donde alumnos y profesores pueden interactuar con el sistema de forma intuitiva, permitiendo la consulta estructurada y la manipulación de información relacionada con cursos, materiales y evaluaciones.

Este proyecto aplica de forma práctica los conocimientos avanzados del ciclo de Desarrollo de Aplicaciones Web, integrando el lado servidor (Node.js/Sequelize/MySQL) con el lado cliente (React/Vite), bajo una arquitectura modular y profesional.

---

## 2. INTRODUCCIÓN

**NebriAcademy Now** es una aplicación Full Stack que sirve como núcleo funcional de una plataforma de formación online. El sistema permite gestionar el ciclo de vida educativo desde dos perspectivas principales: un **Dashboard de Estudiante** para el seguimiento y consumo de cursos, y un **Dashboard de Profesor** para la gestión de materiales y alumnos.

La arquitectura se sustenta en una **API REST** robusta que entrega datos en formato JSON, permitiendo operaciones CRUD completas sobre las diversas entidades del sistema. En esta etapa, el proyecto ha madurado desde la simple lectura de datos hacia una interacción compleja que incluye autenticación de roles, guardado de favoritos y gestión de recursos multimedia.

La plataforma es accesible localmente mediante:
*   **Backend:** `http://localhost:3000` (API informativa y endpoints de datos)
*   **Frontend:** `http://localhost:5173` (Interfaz de usuario React)

---

## 3. OBJETIVOS

### 3.1 OBJETIVO GENERAL
Desarrollar una plataforma Full Stack de E-learning mediante una infraestructura de API REST y un cliente web dinámico que permita gestionar de forma integral la experiencia académica de usuarios, profesores y administradores.

### 3.2 OBJETIVOS ESPECÍFICOS
*   Consolidar una API REST con Node.js, Express.js y Sequelize ORM.
*   Desarrollar una interfaz de usuario interactiva y "Single Page Application" (SPA) con React y Vite.
*   Implementar un sistema de autenticación centralizada capaz de discernir entre múltiples roles (Alumno, Profesor, Administrador).
*   Garantizar la persistencia de datos mediante una base de datos relacional MySQL/MariaDB bien estructurada.
*   Ofrecer funcionalidades avanzadas como la gestión de recursos compartidos (subida de archivos), valoraciones de cursos y Dashboard personalizados.
*   Aplicar buenas prácticas de diseño UI/UX siguiendo la identidad institucional ("Look & Feel" Nebrija).

---

## 4. DESARROLLO

### 4.1 FUNDAMENTACIÓN TEÓRICA
El proyecto se fundamenta en principios de arquitectura modular y desacoplamiento. El **Backend** utiliza Node.js bajo el framework Express para gestionar la lógica de negocio y la seguridad. El uso de **Sequelize ORM** permite una abstracción de la base de datos, facilitando el manejo de relaciones complejas entre entidades.

El **Frontend** implementa React para la creación de componentes reutilizables y reactivos, optimizando la experiencia de usuario mediante transiciones suaves y estados compartidos. La comunicación entre ambos se realiza mediante peticiones asíncronas HTTP, manteniendo una separación clara de responsabilidades.

### 4.2 MODELOS (BASE DE DATOS)
Las entidades principales que estructuran el sistema son:
*   **Administradores**: Gestión de control total.
*   **Alumnos**: Gestión de perfiles de estudiantes y matrículas.
*   **Apuntes**: Notas académicas compartidas.
*   **Cursos**: Catálogo formativo (Categorías, niveles, valoraciones).
*   **CursosAlumnos / ProfesoresCursos**: Tablas relacionales para matrículas y asignaciones.
*   **CursosGuardados**: Marcadores y favoritos del alumno.
*   **Ejercicios / PuntuacionesEjercicios**: Evaluaciones y seguimiento del progreso.
*   **Incidencias**: Soporte técnico y reportes.
*   **Profesores**: Gestión de docentes y especializaciones.
*   **RecursosCompartidos**: Almacenamiento de documentos (PDF, ZIP) mediante Multer.
*   **Usuarios**: Tabla base para el sistema de login.
*   **Videos**: Contenido multimedia asociado a cursos.

### 4.3 RUTAS (API REST)
Cada recurso cuenta con su propio endpoint estructurado bajo `/src/routes/`:
*   `/login`: Autenticación y asignación de rol.
*   `/alumnos`, `/profesores`, `/administradores`: CRUD de usuarios.
*   `/cursos`: Gestión y consulta de materiales didácticos.
*   `/recursos`: Gestión de archivos físicos en el servidor.
*   `/incidencias`: Seguimiento de soporte.

### 4.4 ESTRUCTURA DEL PROYECTO
```text
NebriAcademy-Now/
├── nebriacademy-backend/      # Lógica del servidor
│   ├── uploads/               # Almacenamiento de archivos físicos
│   └── src/
│       ├── database/          # Conexión Sequelize
│       ├── models/            # Definiciones de modelos (Tablas)
│       └── routes/            # Definición de Endpoints
├── nebriacademy-frontend/     # Interfaz React
│   └── src/
│       ├── components/        # UI Reutilizable
│       ├── pages/             # Dashboards y Vistas
│       └── style/             # Hojas de estilo globales y locales
└── Documents/                 # Recursos de datos (SQL) y documentación
```

---

## 5. MATERIALES Y MÉTODOS

**Tecnologías utilizadas:**
*   **Node.js & Express**: Núcleo del servidor.
*   **React (Vite)**: Motor del frontend.
*   **Sequelize & MySQL**: Capa de datos y persistencia.
*   **Multer**: Procesamiento de archivos adjuntos.
*   **Vanilla CSS / CSS Modules**: Diseño visual premium.
*   **Postman**: Validación de la API durante el desarrollo.
*   **GitHub**: Control de versiones y colaboración.

**Metodología:**
*   **Desarrollo Modular**: Componentización de funcionalidades tanto en cliente como en servidor.
*   **Arquitectura basada en Roles**: Diseño centrado en la experiencia específica de cada tipo de usuario.
*   **Iteración constante**: Evolución desde una API GET inicial hacia un sistema Full Stack interactivo.

---

## 6. RESULTADOS Y ANÁLISIS

El resultado final es una plataforma **NebriAcademy Now** operativa que ofrece:
*   Un **Backend funcional** capaz de gestionar 16 tablas relacionales y servir archivos estáticos.
*   Una **Interfaz de Usuario moderna** que reacciona en tiempo real a los datos de la base de datos.
*   Un sistema de **Autenticación en Cascada** que valida credenciales en diferentes perfiles de usuario.
*   Capacidad de **interacción real**: los alumnos ya no solo "ven" datos, sino que pueden matricularse, valorar y guardar cursos.

El análisis técnico demuestra que la separación de frontend y backend permite una mantenibilidad superior y una escalabilidad inmediata hacia entornos productivos (Cloud).

---

## 7. CONCLUSIONES

El desarrollo de **NebriAcademy Now** ha permitido transformar una API de consulta inicial en una solución educativa integral. Se han sentado las bases técnicas de una plataforma potente, organizada y funcional.

El proyecto ha reforzado el dominio sobre el stack MERN adaptado a bases relacionales, permitiendo entender la complejidad de la gestión de roles y la seguridad en aplicaciones web modernas. Esta versión constituye una base sólida y profesional, lista para ser ampliada con funcionalidades de mayor escala.

---

## 8. LÍNEAS DE INVESTIGACIÓN FUTURAS

*   **Implementación de WebSockets**: Para habilitar chats y notificaciones en tiempo real.
*   **Pasarela de Pago**: Integración con Stripe para cursos premium.
*   **Microservicios**: Explorar la extracción de módulos (como el de video o recursos) a servicios independientes.
*   **Certificación Automática**: Generación de diplomas en PDF al completar hitos del curso.

---

## 9. BIBLIOGRAFÍA

*   **Node.js Documentation**: https://nodejs.org/docs/latest/api/
*   **Express.js Routing**: https://expressjs.com/en/guide/routing.html
*   **React Documentation**: https://react.dev/
*   **Sequelize ORM**: https://sequelize.org/

---

## 10. ANEXOS

*(Nota: Referencias a las capturas y diagramas que se encuentran en la carpeta Documents)*
*   Captura de Página Principal (Backend y Frontend).
*   Visualización de JSON de tablas (`Administradores`, `Cursos`).
*   Mockups de Dashboard de Estudiante y Profesor.
*   Diagrama de Entidad-Relación (Base de Datos).
*   Diagrama de Casos de Uso del Sistema.

---

## 11. AGRADECIMIENTOS

Queríamos agradecer a nuestros profesores **Rubén Gonzalez Martín** y **Francisco Albiar Jiménez** por aportarnos los conocimientos necesarios para este proyecto y habernos guiado durante todo el proceso de creación del mismo. Sus pautas han sido fundamentales para elevar la calidad técnica de esta plataforma.
