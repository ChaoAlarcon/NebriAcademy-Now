const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const RecursosCompartidos = require('../models/RecursosCompartidos');

// Configuración de multer: los archivos se guardan en uploads/recursos
// con un nombre único basado en timestamp para evitar colisiones
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../../uploads/recursos');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // crea la carpeta si no existe
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Devuelve todos los recursos de un curso, ordenados del más reciente al más antiguo
router.get('/curso/:cursoId', async (req, res) => {
  try {
    const recursos = await RecursosCompartidos.findAll({
      where: { cursoId: req.params.cursoId },
      order: [['createdAt', 'DESC']]
    });
    res.json(recursos);
  } catch (error) {
    console.error('Error al obtener recursos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crea un recurso compartido. Puede ser un archivo subido o una URL externa.
// El middleware 'upload.single' procesa el campo 'archivo' del formulario si existe.
router.post('/', upload.single('archivo'), async (req, res) => {
  try {
    const { autorId, cursoId, titulo, descripcion, tipo, formato, url } = req.body;

    const nuevoRecurso = {
      autorId,
      cursoId,
      titulo,
      descripcion,
      tipo,
      formato,
      url: formato === 'url' ? url : null,                       // solo guardamos la URL si el formato es 'url'
      nombreArchivo: req.file ? req.file.originalname : null,    // nombre original del archivo subido
      rutaArchivo: req.file ? path.join('uploads/recursos', req.file.filename) : null
    };

    const recurso = await RecursosCompartidos.create(nuevoRecurso);
    res.status(201).json(recurso);
  } catch (error) {
    console.error('Error al crear recurso:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Elimina un recurso por su ID. Si era un archivo físico, también lo borra del disco.
router.delete('/:id', async (req, res) => {
  try {
    const recurso = await RecursosCompartidos.findByPk(req.params.id);
    if (!recurso) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }

    // Si el recurso tenía un archivo asociado y sigue en disco, lo eliminamos
    if (recurso.rutaArchivo && fs.existsSync(recurso.rutaArchivo)) {
      fs.unlinkSync(recurso.rutaArchivo);
    }

    await recurso.destroy();
    res.json({ mensaje: 'Recurso eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar recurso:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
