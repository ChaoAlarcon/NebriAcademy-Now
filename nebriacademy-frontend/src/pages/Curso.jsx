import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchData, putData } from '../api/api';

const Curso = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [curso, setCurso] = useState(null);
    const [profesor, setProfesor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userStr = localStorage.getItem("usuario");
        if (!userStr) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(userStr));

        const getCursoData = async () => {
            try {
                const cursoRes = await fetchData(`cursos/${id}`);
                const cursoData = cursoRes.Curso || cursoRes;
                setCurso(cursoData);
                setEditData(cursoData);

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

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updated = await putData(`cursos/${id}`, editData);
            setCurso(updated);
            setIsEditing(false);
            alert("Curso actualizado con éxito");
        } catch (err) {
            console.error("Error saving course:", err);
            alert("Error al guardar los cambios");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando curso...</div>;
    if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;
    if (!curso) return <div style={{ padding: '2rem', textAlign: 'center' }}>Curso no encontrado</div>;

    const isOwner = user && user.tipo === 'profesor' && user.id === curso.profesor;

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '64px auto 0' }}>
            <Link to="/cursos" style={{
                textDecoration: 'none',
                color: '#666',
                marginBottom: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                fontWeight: 500
            }}>
                &larr; Volver a cursos
            </Link>

            <div style={{
                backgroundColor: '#fff',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid #e0e0e0',
                position: 'relative'
            }}>
                {isOwner && (
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            padding: '8px 16px',
                            backgroundColor: isEditing ? '#28a745' : 'var(--nebrija-red)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                        disabled={saving}
                    >
                        {saving ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Editar Curso')}
                    </button>
                )}

                {!isEditing ? (
                    <h1 style={{ marginTop: 0, color: '#333', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ fontSize: '2.5rem' }}>{curso.icono || '📚'}</span>
                        {curso.nombreCurso}
                    </h1>
                ) : (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Curso:</label>
                        <input
                            type="text"
                            name="nombreCurso"
                            value={editData.nombreCurso}
                            onChange={handleEditChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1.5rem' }}
                        />
                        <label style={{ display: 'block', marginTop: '10px', marginBottom: '5px', fontWeight: 'bold' }}>URL del Vídeo:</label>
                        <input
                            type="text"
                            name="videoUrl"
                            value={editData.videoUrl || ''}
                            onChange={handleEditChange}
                            placeholder="Ej: https://www.youtube.com/watch?v=..."
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                        />
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.9rem' }}>Categoría</strong>
                        <span style={{ fontSize: '1.1rem' }}>{curso.categoria}</span>
                    </div>
                    <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.9rem' }}>Nivel</strong>
                        <span style={{ fontSize: '1.1rem' }}>{curso.nivel}</span>
                    </div>
                    <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.9rem' }}>Valoración</strong>
                        <span style={{ fontSize: '1.1rem' }}>{curso.valoracion} ⭐</span>
                    </div>
                    <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.9rem' }}>Profesor</strong>
                        <span style={{ fontSize: '1.1rem' }}>{profesor ? `${profesor.nombre} ${profesor.apellidos}` : 'Cargando...'}</span>
                    </div>
                </div>

                <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '2rem 0' }} />

                <h3 style={{ color: '#444' }}>Descripción</h3>
                {!isEditing ? (
                    <p style={{ lineHeight: 1.6, color: '#555', marginBottom: '2rem' }}>{curso.descripcion}</p>
                ) : (
                    <textarea
                        name="descripcion"
                        value={editData.descripcion}
                        onChange={handleEditChange}
                        style={{ width: '100%', minHeight: '150px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '2rem' }}
                    />
                )}

                {curso.videoUrl && !isEditing && (
                    <div className="course-video-section" style={{ marginTop: '2rem' }}>
                        <h3 style={{ color: '#444', marginBottom: '1rem' }}>Contenido del Curso</h3>
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                            {curso.videoUrl.includes('youtube.com') || curso.videoUrl.includes('youtu.be') ? (
                                <iframe
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                                    src={curso.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                    title="Course Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <video controls style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000' }}>
                                    <source src={curso.videoUrl} type="video/mp4" />
                                    Tu navegador no soporta el elemento de video.
                                </video>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Curso;