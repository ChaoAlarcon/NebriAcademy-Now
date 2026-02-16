const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const RecursosCompartidos = require('../models/RecursosCompartidos');

// Configuración de Multer para la subida de archivos
// Define el destino (uploads/recursos) y el nombre del archivo (timestamp + original)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../../uploads/recursos');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Obtener todos los recursos de un curso específico (GET /recursos/curso/:cursoId)
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

// Crear un nuevo recurso (POST /recursos)
// Soporta tanto subida de archivos como enlaces (URLs)
// Usa middleware 'upload.single' para procesar el archivo adjunto si existe
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
      url: formato === 'url' ? url : null,
      nombreArchivo: req.file ? req.file.originalname : null,
      rutaArchivo: req.file ? path.join('uploads/recursos', req.file.filename) : null
    };

    const recurso = await RecursosCompartidos.create(nuevoRecurso);
    res.status(201).json(recurso);
  } catch (error) {
    console.error('Error al crear recurso:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar un recurso por ID (DELETE /recursos/:id)
// Si es un archivo local, también lo borra del sistema de archivos
router.delete('/:id', async (req, res) => {
  try {
    const recurso = await RecursosCompartidos.findByPk(req.params.id);
    if (!recurso) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }

    // Si tiene un archivo, eliminarlo del disco
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
