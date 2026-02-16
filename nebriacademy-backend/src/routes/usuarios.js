const express = require("express");
const router = express.Router();
const Usuarios = require("../models/Usuarios.js");
const Alumnos = require("../models/Alumnos.js");
const Profesores = require("../models/Profesores.js");
const Administradores = require("../models/Administradores.js");

// Ruta de Login (POST /usuarios/login)
// Verifica credenciales en las tablas de Alumnos, Profesores y Administradores secuencialmente
router.post("/login", async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    console.log(`Intento de login para: ${email}`);

    // Buscar en Alumnos
    let usuario = await Alumnos.findOne({ where: { email, contrasena } });
    if (usuario) {
      return res.json({ 
        id: usuario.id, 
        nombre: usuario.nombre, 
        apellidos: usuario.apellidos, 
        email: usuario.email, 
        tipo: 'alumno' 
      });
    }

    // Buscar en Profesores
    usuario = await Profesores.findOne({ where: { email, contrasena } });
    if (usuario) {
      return res.json({ 
        id: usuario.id, 
        nombre: usuario.nombre, 
        apellidos: usuario.apellidos, 
        email: usuario.email, 
        tipo: 'profesor' 
      });
    }

    // Buscar en Administradores
    usuario = await Administradores.findOne({ where: { email, contrasena } });
    if (usuario) {
      return res.json({ 
        id: usuario.id, 
        nombre: usuario.nombre, 
        apellidos: usuario.apellidos, 
        email: usuario.email, 
        tipo: 'administrador' 
      });
    }

    // Si no se encuentra en ninguna tabla
    res.status(401).json({ error: "Credenciales incorrectas" });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener todos los usuarios (solo de la tabla base 'usuarios', si se usa) (GET /usuarios)
router.get("/", async (req, res) => {
  try {
    console.log("GET /usuarios");
    const resultado = await Usuarios.findAll();
    res.json({ "Numero de usuarios": resultado.length, Usuarios: resultado });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener usuarios" });
  }
});

// Obtener un usuario por ID (GET /usuarios/:id)
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`GET /usuarios/${id}`);
    const usuario = await Usuarios.findByPk(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener usuario" });
  }
});

// Crear un usuario (en la tabla base) (POST /usuarios)
router.post("/", async (req, res) => {
  try {
    console.log("POST /usuarios");
    const nuevo = await Usuarios.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor al crear usuario" });
  }
});

// Actualizar un usuario por ID (PUT /usuarios/:id)
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`PUT /usuarios/${id}`);
    const usuario = await Usuarios.findByPk(id);
    if (usuario) {
      await usuario.update(req.body);
      res.json(usuario);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor al actualizar usuario" });
  }
});

// Eliminar un usuario por ID (DELETE /usuarios/:id)
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`DELETE /usuarios/${id}`);
    const usuario = await Usuarios.findByPk(id);
    if (usuario) {
      await usuario.destroy();
      res.json({ mensaje: "Usuario eliminado" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor al eliminar usuario" });
  }
});

module.exports = router;
