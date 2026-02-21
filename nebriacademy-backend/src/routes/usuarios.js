const express = require("express");
const router = express.Router();
const Usuarios = require("../models/Usuarios.js");
const Alumnos = require("../models/Alumnos.js");
const Profesores = require("../models/Profesores.js");
const Administradores = require("../models/Administradores.js");

// Login: busca el email+contraseña en Alumnos, luego Profesores, luego Administradores.
// Devuelve los datos básicos del usuario y su tipo de rol.
// NOTA: las contraseñas no están hasheadas (pendiente para producción).
router.post("/login", async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    console.log(`Intento de login para: ${email}`);

    // Primero buscamos entre los alumnos
    let usuario = await Alumnos.findOne({ where: { email, contrasena } });
    if (usuario) {
      return res.json({ id: usuario.id, nombre: usuario.nombre, apellidos: usuario.apellidos, email: usuario.email, tipo: 'alumno' });
    }

    // Si no es alumno, probamos con profesores
    usuario = await Profesores.findOne({ where: { email, contrasena } });
    if (usuario) {
      return res.json({ id: usuario.id, nombre: usuario.nombre, apellidos: usuario.apellidos, email: usuario.email, tipo: 'profesor' });
    }

    // Por último, comprobamos administradores
    usuario = await Administradores.findOne({ where: { email, contrasena } });
    if (usuario) {
      return res.json({ id: usuario.id, nombre: usuario.nombre, apellidos: usuario.apellidos, email: usuario.email, tipo: 'administrador' });
    }

    // No se encontró en ninguna tabla
    res.status(401).json({ error: "Credenciales incorrectas" });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Devuelve todos los usuarios de la tabla base
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

// Busca un usuario por su ID
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

// Crea un usuario en la tabla base (normalmente se usa /alumnos o /profesores)
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

// Actualiza un usuario por su ID
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

// Elimina un usuario por su ID
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
