const express = require("express");
const router = express.Router();
const Alumnos = require("../models/Alumnos.js");

// Obtener todos los alumnos (GET /alumnos)
router.get("/", async (req, res) => {
  try {
    console.log("GET /alumnos");
    const resultado = await Alumnos.findAll();
    res.json({
      "Numero de alumnos": resultado.length,
      Alumnos: resultado,
    });
  } catch (error) {
    console.error("Error al obtener alumnos:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener alumnos" });
  }
});

// Obtener un alumno por ID (GET /alumnos/:id)
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`GET /alumnos/${id}`);
    const alumno = await Alumnos.findByPk(id);
    if (alumno) {
      res.json(alumno);
    } else {
      res.status(404).json({ error: "Alumno no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener alumno:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener alumno" });
  }
});

// Crear un nuevo alumno (POST /alumnos)
router.post("/", async (req, res) => {
  try {
    console.log("POST /alumnos");
    const { captchaToken, ...alumnoData } = req.body;

    // Verificar Captcha
    if (!captchaToken) {
      return res.status(400).json({ error: "Falta el token de verificación de captcha" });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

    const captchaResponse = await fetch(verifyUrl, { method: "POST" });
    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return res.status(400).json({ error: "Verificación de captcha fallida", details: captchaData["error-codes"] });
    }

    const nuevo = await Alumnos.create(alumnoData);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear alumno:", error);
    
    // Manejar errores de validación/unicidad de Sequelize
    if (error.name === 'SequelizeUniqueConstraintError') {
      const campo = error.errors[0].path;
      return res.status(400).json({ 
        error: `El ${campo} ya está registrado`,
        mensaje: error.errors.map(e => e.message)
      });
    }

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: error.errors[0].message,
        mensaje: error.errors.map(e => e.message)
      });
    }
    
    res.status(500).json({ error: "Error interno del servidor al crear alumno" });
  }
});

// Actualizar un alumno existente por ID (PUT /alumnos/:id)
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`PUT /alumnos/${id}`);
    const alumno = await Alumnos.findByPk(id);
    if (alumno) {
      await alumno.update(req.body);
      res.json(alumno);
    } else {
      res.status(404).json({ error: "Alumno no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar alumno:", error);
    res.status(500).json({ error: "Error interno del servidor al actualizar alumno" });
  }
});

// Eliminar un alumno por ID (DELETE /alumnos/:id)
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`DELETE /alumnos/${id}`);
    const alumno = await Alumnos.findByPk(id);
    if (alumno) {
      await alumno.destroy();
      res.json({ mensaje: "Alumno eliminado" });
    } else {
      res.status(404).json({ error: "Alumno no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar alumno:", error);
    res.status(500).json({ error: "Error interno del servidor al eliminar alumno" });
  }
});

module.exports = router;
