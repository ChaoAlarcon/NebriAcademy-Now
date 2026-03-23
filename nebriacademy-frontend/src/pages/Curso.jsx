import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchData, putData, postData, deleteData } from '../api/api';
import SharedResources from '../components/SharedResources';
import StarRating from '../components/StarRating';
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
    const [userRating, setUserRating] = useState(0); // Puntuación dada por el usuario actual
    const [comment, setComment] = useState(''); // Comentario del usuario actual
    const [opiniones, setOpiniones] = useState([]); // Todas las opiniones del curso
    const [alumnos, setAlumnos] = useState([]); // Lista de alumnos para nombres
    const [ratingSaving, setRatingSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false); // Estado de si el curso está guardado
    const [savingToFavorites, setSavingToFavorites] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Validación de sesión
        const userStr = localStorage.getItem("usuario");
        if (!userStr) {
            navigate('/login');
            return;
        }
        const currentUser = JSON.parse(userStr);
        setUser(currentUser);

        /**
         * Carga los datos del curso, profesor, alumnos y opiniones.
         */
        const getCursoData = async () => {
            try {
                // Cargar datos del curso
                const cursoRes = await fetchData(`cursos/${id}`);
                const cursoData = cursoRes.Curso || cursoRes;
                setCurso(cursoData);
                setEditData(cursoData);

                // Cargar datos del profesor
                if (cursoData && cursoData.profesor) {
                    const profesoresRes = await fetchData('profesores');
                    const profesoresList = profesoresRes.Profesores || (Array.isArray(profesoresRes) ? profesoresRes : []);
                    const found = profesoresList.find(p => p.id === cursoData.profesor);
                    setProfesor(found);
                }

                // Cargar todos los alumnos para mostrar nombres en opiniones
                const alumnosRes = await fetchData('alumnos');
                setAlumnos(alumnosRes.Alumnos || (Array.isArray(alumnosRes) ? alumnosRes : []));

                // Cargar todas las puntuaciones/opiniones del curso
                // Se filtran en el frontend (idealmente debería ser en backend)
                const puntuacionesRes = await fetchData('puntuacionescursos');
                const puntuacionesList = puntuacionesRes.PuntuacionesCursos || (Array.isArray(puntuacionesRes) ? puntuacionesRes : []);
                const cursoOpiniones = puntuacionesList.filter(p => p.cursoId === parseInt(id));
                setOpiniones(cursoOpiniones);

                // Si el usuario es alumno o administrador, cargar su valoración previa y estado de guardado
                if (currentUser && (currentUser.tipo === 'alumno' || currentUser.tipo === 'administrador')) {
                    const miPuntuacion = cursoOpiniones.find(p => p.alumnoId === currentUser.id);
                    if (miPuntuacion) {
                        setUserRating(miPuntuacion.puntuacion);
                        setComment(miPuntuacion.comentario || '');
                    }

                    // Verificar si el curso está guardado
                    try {
                        const guardadosRes = await fetchData(`cursosguardados/alumno/${currentUser.id}`);
                        const guardadosList = guardadosRes.Cursos || [];
                        setIsSaved(guardadosList.some(c => c.id === parseInt(id)));
                    } catch (e) {
                        console.error("Error al verificar curso guardado:", e);
                    }
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

    // Maneja cambios en los campos de texto durante la edición del curso
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Guarda los cambios modificados mediante una petición PUT.
     * Actualiza el estado local y sale del modo edición tras éxito.
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

    /**
     * Maneja el envío de una nueva valoración y comentario.
     * Verifica que el usuario sea alumno y haya seleccionado estrellas.
     */
    const handleRatingSubmit = async () => {
        if (!user || (user.tipo !== 'alumno' && user.tipo !== 'administrador')) return;
        if (userRating === 0) {
            alert("Por favor, selecciona una puntuación");
            return;
        }

        setRatingSaving(true);
        try {
            await postData('puntuacionescursos', {
                cursoId: parseInt(id),
                alumnoId: user.id,
                puntuacion: userRating,
                comentario: comment
            });

            // Recargar datos para ver la media y la lista de opiniones actualizada
            const cursoRes = await fetchData(`cursos/${id}`);
            setCurso(cursoRes.Curso || cursoRes);

            const puntuacionesRes = await fetchData('puntuacionescursos');
            const puntuacionesList = puntuacionesRes.PuntuacionesCursos || (Array.isArray(puntuacionesRes) ? puntuacionesRes : []);
            setOpiniones(puntuacionesList.filter(p => p.cursoId === parseInt(id)));

            alert("Valoración guardada con éxito");
            // Reiniciar el formulario
            setUserRating(0);
            setComment('');
        } catch (err) {
            console.error("Error al enviar valoración:", err);
            alert("Error al guardar la valoración");
        } finally {
            setRatingSaving(false);
        }
    };

    /**
     * Alterna el estado de guardado del curso (Favorito).
     * Si ya está guardado, lo elimina. Si no, lo crea.
     */
    const handleSaveToggle = async () => {
        if (!user || (user.tipo !== 'alumno' && user.tipo !== 'administrador')) return;
        setSavingToFavorites(true);
        try {
            if (isSaved) {
                await deleteData(`cursosguardados/alumno/${parseInt(user.id)}/curso/${id}`);
                setIsSaved(false);
                alert("Curso eliminado de tus favoritos");
            } else {
                await postData('cursosguardados', { cursoId: parseInt(id), alumnoId: parseInt(user.id) });
                setIsSaved(true);
                alert("Curso guardado en tus favoritos");
            }
        } catch (err) {
            console.error("Error al gestionar curso guardado:", err);
            alert("Error al guardar/eliminar el curso");
        } finally {
            setSavingToFavorites(false);
        }
    };

    /**
     * Elimina el curso actual (solo administradores).
     */
    const handleDeleteCourse = async () => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este curso permanentemente?")) return;
        
        try {
            await deleteData(`cursos/${id}`);
            alert("Curso eliminado con éxito");
            navigate("/cursos");
        } catch (err) {
            console.error("Error al eliminar el curso:", err);
            alert("Error al eliminar el curso");
        }
    };

    if (loading) return <div className="p-2rem text-center">Cargando curso...</div>;
    if (error) return <div className="p-2rem text-center text-danger">{error}</div>;
    if (!curso) return <div className="p-2rem text-center">Curso no encontrado</div>;

    // Lógica para determinar si el usuario actual está autorizado (dueño o admin)
    const isAuthorized = user && (user.tipo === 'administrador' || (user.tipo === 'profesor' && user.id === curso.profesor));

    // Busca el nombre de un alumno dado su ID
    const getNombreAlumno = (alumnoId) => {
        const alum = alumnos.find(a => a.id === alumnoId);
        return alum ? `${alum.nombre} ${alum.apellidos}` : 'Usuario anónimo';
    };

    return (
        <div className="curso-detail-container">
            {/* Enlace de retorno al listado */}
            <Link to="/cursos" className="curso-back-link">
                &larr; Volver a cursos
            </Link>

            <div className="curso-card">
                {/* Botón de Edición (visible para el propietario o administrador) */}
                {isAuthorized && (
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="curso-edit-btn"
                        style={{ backgroundColor: isEditing ? '#28a745' : 'var(--nebrija-red)' }}
                        disabled={saving}
                    >
                    </button>
                )}

                {/* Botón de Borrado (solo visible para administradores) */}
                {user && user.tipo === 'administrador' && !isEditing && (
                    <button
                        onClick={handleDeleteCourse}
                        className="curso-edit-btn"
                        style={{ backgroundColor: '#dc3545', right: '11rem', top: '1.5rem' }}
                    >
                        Borrar Curso
                    </button>
                )}

                {/* Botón de Guardar (para alumnos y administradores) */}
                {user && (user.tipo === 'alumno' || user.tipo === 'administrador') && !isEditing && (
                    <button
                        onClick={handleSaveToggle}
                        className="curso-edit-btn"
                        style={{

                            backgroundColor: isSaved ? 'var(--nebrija-red)' : '#f8f9fa',
                            color: isSaved ? '#f8f9fa' : 'var(--nebrija-blue)',
                            border: isSaved ? 'none' : '2px solid #e0e0e0',
                            right: '1.5rem',
                            top: '1.5rem'
                        }}
                        disabled={savingToFavorites}
                    >
                        {savingToFavorites ? '...' : (isSaved ? 'Guardado' : 'Guardar')}
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
                        <span>{curso.valoracion || 0} ⭐</span>
                    </div>
                    <div className="curso-stat-item">
                        <strong className="text-muted font-small">Profesor</strong>
                        <span>{profesor ? `${profesor.nombre} ${profesor.apellidos}` : 'Cargando...'}</span>
                    </div>
                </div>

                {/* Sección de Valoración para Alumnos y Administradores */}
                {user && (user.tipo === 'alumno' || user.tipo === 'administrador') && !isEditing && (
                    <div className="curso-rating-section" style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '12px', textAlign: 'center', border: '1px solid #eee' }}>
                        <h4 style={{ marginBottom: '0.8rem', color: 'var(--nebrija-blue)' }}>¿Qué te parece este curso?</h4>
                        <StarRating
                            rating={userRating}
                            onRatingChange={(val) => setUserRating(val)}
                        />
                        <textarea
                            className="nebri-input"
                            style={{ width: '100%', marginTop: '1rem', minHeight: '80px', borderRadius: '8px' }}
                            placeholder="Cuéntanos tu opinión sobre el curso (opcional)..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            onClick={handleRatingSubmit}
                            className="nebri-button"
                            style={{ marginTop: '1rem', width: '100%' }}
                            disabled={ratingSaving}
                        >
                            {ratingSaving ? 'Guardando...' : 'Enviar Valoración'}
                        </button>
                    </div>
                )}

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

                {/* Sección de Video */}
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

                {/* Sección de Opiniones */}
                <div className="curso-opiniones-section" style={{ marginTop: '3rem' }}>
                    <h3 className="mb-1-5rem">Opiniones de los alumnos ({opiniones.length})</h3>
                    {opiniones.length === 0 ? (
                        <p className="text-muted">Aún no hay opiniones para este curso.</p>
                    ) : (
                        <div className="opiniones-list" style={{ display: 'grid', gap: '1.5rem' }}>
                            {opiniones.map((op) => (
                                <div key={op.id} className="opinion-item" style={{ padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid var(--nebrija-red)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <strong style={{ color: 'var(--nebrija-blue)' }}>{getNombreAlumno(op.alumnoId)}</strong>
                                        <StarRating rating={op.puntuacion} readonly={true} />
                                    </div>
                                    {op.comentario && <p style={{ fontStyle: 'italic', color: '#555', margin: 0 }}>"{op.comentario}"</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Nueva sección de recursos compartidos */}
            <SharedResources cursoId={id} user={user} />
        </div>
    );
};

export default Curso;
