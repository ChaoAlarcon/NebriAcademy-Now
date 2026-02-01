const express = require("express");
const router = express.Router();
const Usuarios = require("../models/Usuarios.js");
const Alumnos = require("../models/Alumnos.js");
const Profesores = require("../models/Profesores.js");
const Administradores = require("../models/Administradores.js");

// Ruta de Login
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

// Obtener todos los usuarios
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

// Obtener por ID un usuario
router.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`GET /usuarios/${id}`);
    Usuarios.findAll().then((resultado) => {
      const usuario = resultado.find((u) => u.id === id);
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crear un usuario
router.post("/", (req, res) => {
  try {
    console.log("POST /usuarios");
    Usuarios.create(req.body).then((nuevo) => {
      res.status(201).json(nuevo);
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar un usuario por ID
router.put("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`PUT /usuarios/${id}`);
    Usuarios.findAll().then((resultado) => {
      const usuario = resultado.find((u) => u.id === id);
      if (usuario) {
        usuario.update(req.body).then((actualizado) => res.json(actualizado));
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar un usuario por ID
router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`DELETE /usuarios/${id}`);
    Usuarios.findAll().then((resultado) => {
      const usuario = resultado.find((u) => u.id === id);
      if (usuario) {
        usuario
          .destroy()
          .then(() => res.json({ mensaje: "Usuario eliminado" }));
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
