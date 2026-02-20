-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-02-2026 a las 09:51:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nebriacademy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `usuarioId` int(11) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `numTelefono` varchar(255) DEFAULT NULL,
  `redes` varchar(255) DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `localidad` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `usuarioId`, `dni`, `nombre`, `apellidos`, `email`, `contrasena`, `numTelefono`, `redes`, `pais`, `localidad`) VALUES
(1, 1, '71344556Z', 'Cristian', 'López Ortega', 'cris.lop@protonmail.com', 'admin123', '600112288', '', 'España', 'Madrid'),
(2, 8, '05433211L', 'Beatriz', 'Sanz Ferrer', 'beatriz.sanz@webstudio.com', 'admin456', '677554433', NULL, 'España', 'Barcelona');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id` int(11) NOT NULL,
  `usuarioId` int(11) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `numeroTarjeta` varchar(255) DEFAULT NULL,
  `numTelefono` varchar(255) DEFAULT NULL,
  `redes` text DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `localidad` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id`, `usuarioId`, `dni`, `nombre`, `apellidos`, `email`, `contrasena`, `numeroTarjeta`, `numTelefono`, `redes`, `pais`, `localidad`) VALUES
(1, 2, '48231055B', 'Pablo', 'Santos Rodríguez', 'pablo.data@servidor.es', 'pass123', '5211 0099 8877 6655', '610998877', '@nicostudent', 'España', 'Sevilla'),
(2, 3, '87654321C', 'María', 'López Díaz', 'maria@example.com', 'pass456', '4539 1234 5678 9012', '699887766', '@marialopez', 'España', 'Valencia'),
(7, NULL, '77412309M', 'Elena', 'Bueno Calvo', 'elena.cloud@empresa.com', 'pass789', '5231 0097 8897 6652', '655223344', NULL, 'España', 'Madrid'),
(8, NULL, '03145692X', 'Raúl', 'Hernández Gómez', 'raul.tech@proton.me', 'pass91011', '4012 8822 3344 5566', '688112233', NULL, 'España', 'Málaga'),
(9, NULL, '51264725W', 'Chao', 'Alarcón Chen', 'chaoalarcon03@gmail.com', '1234', NULL, '689846699', NULL, 'España', 'Madrid');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apuntes`
--

CREATE TABLE `apuntes` (
  `id` int(11) NOT NULL,
  `autor` int(11) DEFAULT NULL,
  `curso` int(11) DEFAULT NULL,
  `contenido` text DEFAULT NULL,
  `valoracion` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `apuntes`
--

INSERT INTO `apuntes` (`id`, `autor`, `curso`, `contenido`, `valoracion`) VALUES
(1, 2, 1, 'Resumen de funciones en Python', 5),
(2, 4, 1, 'Apunte del profesor sobre listas y tuplas', 4),
(3, 3, 2, 'Notas sobre firewall y seguridad básica', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `nombreCurso` varchar(255) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `profesor` int(11) DEFAULT NULL,
  `nivel` varchar(255) DEFAULT NULL,
  `valoracion` float DEFAULT NULL,
  `comentarios` text DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `icono` varchar(255) DEFAULT NULL,
  `videoUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id`, `nombreCurso`, `categoria`, `profesor`, `nivel`, `valoracion`, `comentarios`, `descripcion`, `icono`, `videoUrl`) VALUES
(1, 'Introducción a Python', 'Programación', 1, 'Principiante', 5, 'Muy buen curso', 'Aprende el lenguaje más versátil y demandado del mundo con un enfoque 100% práctico. Este curso te lleva desde la instalación hasta la creación de tus propios scripts funcionales, sin rellenos innecesarios.\n\n', '🐍', 'https://youtu.be/IimBRwHhW54?si=ItzLuEaEQUjRoKYG'),
(2, 'Redes y Seguridad', 'Ciberseguridad', 2, 'Intermedio', 4.5, 'Contenido útil', 'Aprende a identificar vulnerabilidades antes de que los atacantes lo hagan. Este curso te proporciona las herramientas y la mentalidad necesarias para defender activos digitales en un entorno de amenazas constante.', '🔐', 'https://youtu.be/rX7Sy1eAfH8?si=W6mANJCJ9vBT5O_i'),
(3, 'Curso de VueJS', 'Desarrollo Web', 1, 'Principiante', 4, NULL, 'Aprende a construir interfaces de usuario reactivas y elegantes con un framework que destaca por su curva de aprendizaje amigable y su excelente documentación.', '🔽', 'https://youtu.be/s6Svbfj-31M?si=01T_FgoC3MPvOqMt'),
(4, 'Iniciación con Astro', 'Desarrollo Web', 1, 'Principiante', 5, NULL, 'Astro está diseñado para crear sitios web centrados en el contenido (blogs, landings, e-commerce) con un rendimiento inigualable. Su filosofía es simple: entrega cero JavaScript por defecto.', '🅰️', 'https://youtu.be/RB5tR_nqUEw?si=R6BmsU2o5xHcolR8');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursosalumnos`
--

CREATE TABLE `cursosalumnos` (
  `id` int(11) NOT NULL,
  `cursoId` int(11) DEFAULT NULL,
  `alumnoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursosalumnos`
--

INSERT INTO `cursosalumnos` (`id`, `cursoId`, `alumnoId`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursosguardados`
--

CREATE TABLE `cursosguardados` (
  `id` int(11) NOT NULL,
  `cursoId` int(11) NOT NULL,
  `alumnoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursosguardados`
--

INSERT INTO `cursosguardados` (`id`, `cursoId`, `alumnoId`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicios`
--

CREATE TABLE `ejercicios` (
  `id` int(11) NOT NULL,
  `autor` int(11) DEFAULT NULL,
  `curso` int(11) DEFAULT NULL,
  `valoracion` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ejercicios`
--

INSERT INTO `ejercicios` (`id`, `autor`, `curso`, `valoracion`) VALUES
(1, 1, 1, 4.5),
(2, 2, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencias`
--

CREATE TABLE `incidencias` (
  `id` int(11) NOT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `resuelto` tinyint(1) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidencias`
--

INSERT INTO `incidencias` (`id`, `tipo`, `descripcion`, `resuelto`, `usuario`) VALUES
(1, 'Error en plataforma', 'No carga el vídeo del módulo 2', 0, 2),
(2, 'Pago', 'Problema al registrar tarjeta', 1, 3),
(3, 'Sugerencia', 'Añadir más ejercicios prácticos', 0, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `id` int(11) NOT NULL,
  `usuarioId` int(11) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `numCuentaBancaria` varchar(255) DEFAULT NULL,
  `numTelefono` varchar(255) DEFAULT NULL,
  `redes` text DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `localidad` varchar(255) DEFAULT NULL,
  `especializacion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`id`, `usuarioId`, `dni`, `nombre`, `apellidos`, `email`, `contrasena`, `numCuentaBancaria`, `numTelefono`, `redes`, `pais`, `localidad`, `especializacion`) VALUES
(1, 4, '45821093H', 'Sofía', 'Martínez Ruiz', 'sofia@prof.com', 'prof123', 'ES9820385778983000760236', '612345678', '@profeSofia', 'España', 'Madrid', 'Programación'),
(2, 5, '22222222E', 'Jorge', 'Pérez Torres', 'jorge@prof.com', 'prof456', 'ES6600190020961234567890', '644444444', '@profeJorge', 'España', 'Madrid', 'Ciberseguridad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesorescursos`
--

CREATE TABLE `profesorescursos` (
  `id` int(11) NOT NULL,
  `profesorId` int(11) DEFAULT NULL,
  `cursoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntuacionescursos`
--

CREATE TABLE `puntuacionescursos` (
  `id` int(11) NOT NULL,
  `cursoId` int(11) DEFAULT NULL,
  `alumnoId` int(11) DEFAULT NULL,
  `puntuacion` float DEFAULT NULL,
  `comentario` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `puntuacionescursos`
--

INSERT INTO `puntuacionescursos` (`id`, `cursoId`, `alumnoId`, `puntuacion`, `comentario`) VALUES
(5, 1, 2, 5, '¡He aprendido muchísimo con este curso!'),
(6, 2, 9, 5, 'Me parece un excelente curso para iniciarse en el mundo del Hacking Ético. Empecé en este mundillo hace poco y este curso me ha ayudado a asentar las bases de muy buena manera.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntuacionesejercicios`
--

CREATE TABLE `puntuacionesejercicios` (
  `id` int(11) NOT NULL,
  `ejercicioId` int(11) DEFAULT NULL,
  `alumnoId` int(11) DEFAULT NULL,
  `puntuacion` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `puntuacionesejercicios`
--

INSERT INTO `puntuacionesejercicios` (`id`, `ejercicioId`, `alumnoId`, `puntuacion`) VALUES
(1, 1, 1, 9.5),
(2, 1, 2, 8),
(3, 2, 1, 7.5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recursos_compartidos`
--

CREATE TABLE `recursos_compartidos` (
  `id` int(11) NOT NULL,
  `autorId` int(11) NOT NULL,
  `cursoId` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `tipo` enum('apuntes','proyecto') NOT NULL,
  `formato` enum('archivo','url') NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `nombreArchivo` varchar(255) DEFAULT NULL,
  `rutaArchivo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recursos_compartidos`
--

INSERT INTO `recursos_compartidos` (`id`, `autorId`, `cursoId`, `titulo`, `descripcion`, `tipo`, `formato`, `url`, `nombreArchivo`, `rutaArchivo`, `createdAt`, `updatedAt`) VALUES
(2, 2, 3, 'Proyecto inicial de Vue', 'Proyecto inicial para iniciarse en el Framework.', 'proyecto', 'archivo', NULL, 'primer_proyecto_vue.zip', 'uploads\\recursos\\1770797699688-623219300.zip', '2026-02-11 08:14:59', '2026-02-11 08:14:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `tipo` enum('alumno','profesor','administrador') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `tipo`) VALUES
(1, 'administrador'),
(2, 'alumno'),
(3, 'alumno'),
(4, 'profesor'),
(5, 'profesor'),
(8, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `autor` int(11) DEFAULT NULL,
  `curso` int(11) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `valoracion` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `videos`
--

INSERT INTO `videos` (`id`, `autor`, `curso`, `duracion`, `valoracion`) VALUES
(1, 1, 1, 600, 4.8),
(2, 2, 2, 900, 4.2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `dni_2` (`dni`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `dni_3` (`dni`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `dni_4` (`dni`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `dni_5` (`dni`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `dni_6` (`dni`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `dni_7` (`dni`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `dni_8` (`dni`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `dni_9` (`dni`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `dni_10` (`dni`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `dni_11` (`dni`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `dni_12` (`dni`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `dni_13` (`dni`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `dni_14` (`dni`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `dni_15` (`dni`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `dni_16` (`dni`),
  ADD UNIQUE KEY `dni_17` (`dni`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `dni_18` (`dni`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `dni_19` (`dni`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `dni_20` (`dni`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `dni_21` (`dni`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `dni_22` (`dni`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `dni_23` (`dni`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `dni_24` (`dni`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `dni_25` (`dni`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `dni_26` (`dni`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `dni_27` (`dni`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `dni_28` (`dni`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `dni_29` (`dni`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `dni_30` (`dni`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `dni_31` (`dni`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numeroTarjeta` (`numeroTarjeta`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `dni_2` (`dni`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_2` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_3` (`dni`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_3` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_4` (`dni`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_4` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_5` (`dni`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_5` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_6` (`dni`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_6` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_7` (`dni`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_7` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_8` (`dni`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_8` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_9` (`dni`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_9` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_10` (`dni`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_10` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_11` (`dni`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_11` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_12` (`dni`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_12` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_13` (`dni`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_13` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_14` (`dni`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_14` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_15` (`dni`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_15` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_16` (`dni`),
  ADD UNIQUE KEY `dni_17` (`dni`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_16` (`numeroTarjeta`),
  ADD UNIQUE KEY `numeroTarjeta_17` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_18` (`dni`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_18` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_19` (`dni`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_19` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_20` (`dni`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `numeroTarjeta_20` (`numeroTarjeta`),
  ADD UNIQUE KEY `dni_21` (`dni`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `apuntes`
--
ALTER TABLE `apuntes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autor` (`autor`),
  ADD KEY `curso` (`curso`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profesor` (`profesor`);

--
-- Indices de la tabla `cursosalumnos`
--
ALTER TABLE `cursosalumnos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cursoId` (`cursoId`),
  ADD KEY `alumnoId` (`alumnoId`);

--
-- Indices de la tabla `cursosguardados`
--
ALTER TABLE `cursosguardados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autor` (`autor`),
  ADD KEY `curso` (`curso`);

--
-- Indices de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numCuentaBancaria` (`numCuentaBancaria`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `dni_2` (`dni`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_2` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_3` (`dni`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_3` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_4` (`dni`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_4` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_5` (`dni`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_5` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_6` (`dni`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_6` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_7` (`dni`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_7` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_8` (`dni`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_8` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_9` (`dni`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_9` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_10` (`dni`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_10` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_11` (`dni`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_11` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_12` (`dni`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_12` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_13` (`dni`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_13` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_14` (`dni`),
  ADD UNIQUE KEY `dni_15` (`dni`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_14` (`numCuentaBancaria`),
  ADD UNIQUE KEY `numCuentaBancaria_15` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_16` (`dni`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_16` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_17` (`dni`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_17` (`numCuentaBancaria`),
  ADD UNIQUE KEY `dni_18` (`dni`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `numCuentaBancaria_18` (`numCuentaBancaria`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `profesorescursos`
--
ALTER TABLE `profesorescursos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profesorId` (`profesorId`),
  ADD KEY `cursoId` (`cursoId`);

--
-- Indices de la tabla `puntuacionescursos`
--
ALTER TABLE `puntuacionescursos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `puntuacionesejercicios`
--
ALTER TABLE `puntuacionesejercicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ejercicioId` (`ejercicioId`),
  ADD KEY `alumnoId` (`alumnoId`);

--
-- Indices de la tabla `recursos_compartidos`
--
ALTER TABLE `recursos_compartidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autor` (`autor`),
  ADD KEY `curso` (`curso`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `apuntes`
--
ALTER TABLE `apuntes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cursosalumnos`
--
ALTER TABLE `cursosalumnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cursosguardados`
--
ALTER TABLE `cursosguardados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `profesorescursos`
--
ALTER TABLE `profesorescursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `puntuacionescursos`
--
ALTER TABLE `puntuacionescursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `puntuacionesejercicios`
--
ALTER TABLE `puntuacionesejercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `recursos_compartidos`
--
ALTER TABLE `recursos_compartidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD CONSTRAINT `administradores_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `apuntes`
--
ALTER TABLE `apuntes`
  ADD CONSTRAINT `apuntes_ibfk_1` FOREIGN KEY (`autor`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `apuntes_ibfk_2` FOREIGN KEY (`curso`) REFERENCES `cursos` (`id`);

--
-- Filtros para la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`profesor`) REFERENCES `profesores` (`id`);

--
-- Filtros para la tabla `cursosalumnos`
--
ALTER TABLE `cursosalumnos`
  ADD CONSTRAINT `cursosalumnos_ibfk_1` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`),
  ADD CONSTRAINT `cursosalumnos_ibfk_2` FOREIGN KEY (`alumnoId`) REFERENCES `alumnos` (`id`);

--
-- Filtros para la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD CONSTRAINT `ejercicios_ibfk_1` FOREIGN KEY (`autor`) REFERENCES `profesores` (`id`),
  ADD CONSTRAINT `ejercicios_ibfk_2` FOREIGN KEY (`curso`) REFERENCES `cursos` (`id`);

--
-- Filtros para la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD CONSTRAINT `incidencias_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `profesores_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `profesorescursos`
--
ALTER TABLE `profesorescursos`
  ADD CONSTRAINT `profesorescursos_ibfk_1` FOREIGN KEY (`profesorId`) REFERENCES `profesores` (`id`),
  ADD CONSTRAINT `profesorescursos_ibfk_2` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`);

--
-- Filtros para la tabla `puntuacionesejercicios`
--
ALTER TABLE `puntuacionesejercicios`
  ADD CONSTRAINT `puntuacionesejercicios_ibfk_1` FOREIGN KEY (`ejercicioId`) REFERENCES `ejercicios` (`id`),
  ADD CONSTRAINT `puntuacionesejercicios_ibfk_2` FOREIGN KEY (`alumnoId`) REFERENCES `alumnos` (`id`);

--
-- Filtros para la tabla `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`autor`) REFERENCES `profesores` (`id`),
  ADD CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`curso`) REFERENCES `cursos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
