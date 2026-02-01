
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../api/api';

const Curso = () => {
    const { id } = useParams();
    const [curso, setCurso] = useState(null);
    const [profesor, setProfesor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    // Better implementation with async/await
    useEffect(() => {
        const userStr = localStorage.getItem("usuario");
        if (!userStr) {
            navigate('/login');
            return;
        }

        const getData = async () => {
            try {
                const cursoRes = await fetchData(`cursos/${id}`);
                const cursoData = cursoRes.Curso || cursoRes;
                setCurso(cursoData);

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
        getData();
    }, [id]);

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando curso...</div>;
    if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;
    if (!curso) return <div style={{ padding: '2rem', textAlign: 'center' }}>Curso no encontrado</div>;

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
                border: '1px solid #e0e0e0'
            }}>
                <h1 style={{ marginTop: 0, color: '#333', marginBottom: '1.5rem' }}>{curso.nombreCurso}</h1>

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
                    {/* We assume getting profesor name might require another fetch if not included in course details. 
                    For now omitting complex logic to keep it simple, or displaying the ID/Object if available. */}
                </div>

                <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '2rem 0' }} />

                <h3 style={{ color: '#444' }}>Descripción</h3>
                <p style={{ lineHeight: 1.6, color: '#555' }}>{curso.descripcion}</p>
            </div>
        </div>
    );
};

export default Curso;