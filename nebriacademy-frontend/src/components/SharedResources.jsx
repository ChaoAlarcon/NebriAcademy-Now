import React, { useState, useEffect } from 'react';
import { fetchData, postFileData, deleteData, API_URL } from '../api/api';
import '../style/SharedResources.css';

const SharedResources = ({ cursoId, user }) => {
    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Estados para el formulario
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipo, setTipo] = useState('apuntes');
    const [formato, setFormato] = useState('archivo');
    const [url, setUrl] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [subiendo, setSubiendo] = useState(false);

    useEffect(() => {
        loadRecursos();
    }, [cursoId]);

    const loadRecursos = async () => {
        try {
            const data = await fetchData(`recursos/curso/${cursoId}`);
            setRecursos(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar recursos:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubiendo(true);

        const formData = new FormData();
        formData.append('autorId', user.id);
        formData.append('cursoId', cursoId);
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('tipo', tipo);
        formData.append('formato', formato);

        if (formato === 'url') {
            formData.append('url', url);
        } else if (archivo) {
            formData.append('archivo', archivo);
        }

        try {
            await postFileData('recursos', formData);
            alert('Recurso compartido con éxito');
            setShowForm(false);
            resetForm();
            loadRecursos();
        } catch (error) {
            alert('Error al compartir el recurso');
        } finally {
            setSubiendo(false);
        }
    };

    const resetForm = () => {
        setTitulo('');
        setDescripcion('');
        setTipo('apuntes');
        setFormato('archivo');
        setUrl('');
        setArchivo(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este recurso?')) {
            try {
                await deleteData(`recursos/${id}`);
                alert('Recurso eliminado');
                loadRecursos();
            } catch (error) {
                alert('Error al eliminar el recurso');
            }
        }
    };

    const renderRecursoCard = (r) => {
        const isUrl = r.formato === 'url';
        const link = isUrl ? r.url : `${API_URL}/${r.rutaArchivo.replace(/\\/g, '/')}`;

        return (
            <div key={r.id} className="resource-card">
                <div className="resource-card-icon">
                    {r.tipo === 'apuntes' ? '📄' : '💻'}
                </div>
                <div className="resource-card-content">
                    <h4>{r.titulo}</h4>
                    <p>{r.descripcion}</p>
                    <div className="resource-actions">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="resource-download-btn">
                            {isUrl ? 'Ver Enlace' : 'Descargar Archivo'}
                        </a>
                        {user.id === r.autorId && (
                            <button onClick={() => handleDelete(r.id)} className="resource-delete-btn" title="Eliminar recurso">
                                🗑️
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="shared-resources-container">
            <div className="shared-resources-header">
                <h3>Recursos de Estudiantes</h3>
                {user.tipo === 'alumno' && (
                    <button onClick={() => setShowForm(!showForm)} className="nebri-btn-primary">
                        {showForm ? 'Cancelar' : 'Compartir Recurso'}
                    </button>
                )}
            </div>

            {showForm && (
                <form className="resource-upload-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Título</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            placeholder="Ej: Apuntes Tema 1"
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción (opcional)</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Breve descripción de lo que compartes"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Tipo de Recurso</label>
                            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                <option value="apuntes">Apuntes</option>
                                <option value="proyecto">Proyecto</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Formato</label>
                            <select value={formato} onChange={(e) => setFormato(e.target.value)}>
                                <option value="archivo">Archivo (PDF, ZIP, Word...)</option>
                                <option value="url">URL (GitHub, Notion, Web...)</option>
                            </select>
                        </div>
                    </div>

                    {formato === 'url' ? (
                        <div className="form-group">
                            <label>URL</label>
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                placeholder="https://github.com/usuario/proyecto"
                            />
                        </div>
                    ) : (
                        <div className="form-group">
                            <label>Archivo</label>
                            <input
                                type="file"
                                onChange={(e) => setArchivo(e.target.files[0])}
                                required
                            />
                        </div>
                    )}

                    <button type="submit" className="nebri-btn-submit" disabled={subiendo}>
                        {subiendo ? 'Subiendo...' : 'Publicar'}
                    </button>
                </form>
            )}

            <div className="resources-sections">
                <div className="resources-column">
                    <h4>📚 Apuntes</h4>
                    <div className="resources-grid">
                        {recursos.filter(r => r.tipo === 'apuntes').map(renderRecursoCard)}
                        {recursos.filter(r => r.tipo === 'apuntes').length === 0 && (
                            <p className="no-resources">No hay apuntes compartidos aún.</p>
                        )}
                    </div>
                </div>
                <div className="resources-column">
                    <h4>🚀 Proyectos</h4>
                    <div className="resources-grid">
                        {recursos.filter(r => r.tipo === 'proyecto').map(renderRecursoCard)}
                        {recursos.filter(r => r.tipo === 'proyecto').length === 0 && (
                            <p className="no-resources">No hay proyectos compartidos aún.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharedResources;
