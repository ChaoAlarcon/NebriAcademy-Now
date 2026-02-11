import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchData, putData } from '../api/api';
import SharedResources from '../components/SharedResources';
import '../style/Curso.css';

/**
 * Componente de Detalle de Curso.
 * Muestra la información completa de un curso, el vídeo de contenido y
 * permite la edición si el usuario es el profesor propietario.
 */
const Curso = () => {
    const { id } = useParams(); // ID del curso desde la URL
    const navigate = useNavigate();
    const [curso, setCurso] = useState(null); // Datos del curso actual
    const [profesor, setProfesor] = useState(null); // Datos del profesor del curso
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Estado de modo edición
    const [editData, setEditData] = useState({}); // Datos temporales para el formulario
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState(null); // Usuario en sesión

    useEffect(() => {
        // Validación de sesión
        const userStr = localStorage.getItem("usuario");
        if (!userStr) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(userStr));

        /**
         * Carga los datos del curso y busca al profesor asignado.
         */
        const getCursoData = async () => {
            try {
                const cursoRes = await fetchData(`cursos/${id}`);
                const cursoData = cursoRes.Curso || cursoRes;
                setCurso(cursoData);
                setEditData(cursoData);

                // Si hay un profesor asociado, buscamos su nombre para mostrarlo
                if (cursoData && cursoData.profesor) {
                    const profesoresRes = await fetchData('profesores');
                    const profesoresList = profesoresRes.Profesores || (Array.isArray(profesoresRes) ? profesoresRes : []);
                    const found = profesoresList.find(p => p.id === cursoData.profesor);
                    setProfesor(found);
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(`Error al cargar datos: ${err.message}`);
                setLoading(false);
            }
        };
        getCursoData();
    }, [id, navigate]);

    // Maneja cambios en los campos de texto durante la edición
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Guarda los cambios modificados mediante una petición PUT.
     */
    const handleSave = async () => {
        setSaving(true);
        try {
            const updated = await putData(`cursos/${id}`, editData);
            setCurso(updated); // Actualizamos la vista con los nuevos datos
            setIsEditing(false); // Salimos del modo edición
            alert("Curso actualizado con éxito");
        } catch (err) {
            console.error("Error al guardar el curso:", err);
            alert("Error al guardar los cambios");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-2rem text-center">Cargando curso...</div>;
    if (error) return <div className="p-2rem text-center text-danger">{error}</div>;
    if (!curso) return <div className="p-2rem text-center">Curso no encontrado</div>;

    // Lógica para determinar si el usuario actual es el dueño del curso
    const isOwner = user && user.tipo === 'profesor' && user.id === curso.profesor;

    return (
        <div className="curso-detail-container">
            {/* Enlace de retorno al listado */}
            <Link to="/cursos" className="curso-back-link">
                &larr; Volver a cursos
            </Link>

            <div className="curso-card">
                {/* Botón de Edición (solo visible para el propietario) */}
                {isOwner && (
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="curso-edit-btn"
                        style={{ backgroundColor: isEditing ? '#28a745' : 'var(--nebrija-red)' }}
                        disabled={saving}
                    >
                        {saving ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Editar Curso')}
                    </button>
                )}

                {/* Título e Icono principal */}
                {!isEditing ? (
                    <h1 className="curso-header">
                        <span className="curso-icon-large">{curso.icono || '📚'}</span>
                        {curso.nombreCurso}
                    </h1>
                ) : (
                    <div className="mb-1-5rem">
                        <label className="display-block mb-1rem font-bold">Nombre del Curso:</label>
                        <input
                            type="text"
                            name="nombreCurso"
                            value={editData.nombreCurso}
                            onChange={handleEditChange}
                            className="nebri-input font-large"
                        />
                        <label className="display-block mt-1rem mb-1rem font-bold">URL del Vídeo:</label>
                        <input
                            type="text"
                            name="videoUrl"
                            value={editData.videoUrl || ''}
                            onChange={handleEditChange}
                            placeholder="Ej: https://www.youtube.com/watch?v=..."
                            className="nebri-input"
                        />
                    </div>
                )}

                {/* Grid de metadatos del curso */}
                <div className="curso-stats-grid">
                    <div className="curso-stat-item">
                        <strong className="text-muted font-small">Categoría</strong>
                        <span>{curso.categoria}</span>
                    </div>
                    <div className="curso-stat-item">
                        <strong className="text-muted font-small">Nivel</strong>
                        <span>{curso.nivel}</span>
                    </div>
                    <div className="curso-stat-item">
                        <strong className="text-muted font-small">Valoración</strong>
                        <span>{curso.valoracion} ⭐</span>
                    </div>
                    <div className="curso-stat-item">
                        <strong className="text-muted font-small">Profesor</strong>
                        <span>{profesor ? `${profesor.nombre} ${profesor.apellidos}` : 'Cargando...'}</span>
                    </div>
                </div>

                <hr className="curso-divider" />

                <h3 className="mb-1rem">Descripción</h3>
                {!isEditing ? (
                    <p className="curso-description">{curso.descripcion}</p>
                ) : (
                    <textarea
                        name="descripcion"
                        value={editData.descripcion}
                        onChange={handleEditChange}
                        className="nebri-input w-100"
                        style={{ minHeight: '150px' }}
                    />
                )}

                {/* Sección de Video: Soporta links de YouTube o rutas directas a archivos .mp4 */}
                {curso.videoUrl && !isEditing && (
                    <div className="curso-video-section">
                        <h3 className="mb-1rem">Contenido del Curso</h3>
                        <div className="curso-video-container">
                            {curso.videoUrl.includes('youtube.com') || curso.videoUrl.includes('youtu.be') ? (
                                <iframe
                                    className="curso-video-frame"
                                    src={curso.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                    title="Course Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <video controls className="curso-video-player">
                                    <source src={curso.videoUrl} type="video/mp4" />
                                    Tu navegador no soporta el elemento de video.
                                </video>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Nueva sección de recursos compartidos */}
            <SharedResources cursoId={id} user={user} />
        </div>
    );
};

export default Curso;
