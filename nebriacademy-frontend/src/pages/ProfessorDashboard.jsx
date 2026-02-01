import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../api/api';
import '../style/Home.css';

function ProfessorDashboard({ userName, userId }) {
    const [stats, setStats] = useState({
        misCursos: 0,
        totalAlumnos: 0,
        valoracionMedia: 0
    });
    const [misCursos, setMisCursos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProfessorData = async () => {
            try {
                const cursosData = await fetchData('cursos');
                const allCursos = cursosData.Cursos || (Array.isArray(cursosData) ? cursosData : []);

                // Filtrar cursos impartidos por este profesor
                const professorCursos = allCursos.filter(c => c.profesor === userId);

                setMisCursos(professorCursos);
                setStats({
                    misCursos: professorCursos.length,
                    totalAlumnos: professorCursos.length * 15, // Mockup: assumes 15 students per course
                    valoracionMedia: professorCursos.length > 0
                        ? (professorCursos.reduce((acc, c) => acc + (c.valoracion || 0), 0) / professorCursos.length).toFixed(1)
                        : 0
                });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching professor data:", err);
                setLoading(false);
            }
        };

        if (userId) {
            getProfessorData();
        }
    }, [userId]);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Panel de Control, <span>Prof. {userName}</span></h1>
                <p>Gestiona tus contenidos y haz un seguimiento de tus alumnos.</p>
            </header>

            <div className="dashboard-grid">
                <div className="main-column">
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">Mis Cursos</h2>
                            <Link to="/nuevo-curso" className="card-link" style={{ backgroundColor: '#28a745', color: 'white', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none' }}>+ Crear Nuevo Curso</Link>
                        </div>

                        {loading ? (
                            <p>Cargando tus cursos...</p>
                        ) : (
                            <div className="dashboard-course-list">
                                {misCursos.length > 0 ? (
                                    misCursos.map((curso, index) => (
                                        <div key={curso.id} className="dashboard-course-item">
                                            <div className="course-icon-placeholder">
                                                {curso.icono || '📚'}
                                            </div>
                                            <div className="course-info" style={{ flex: 1 }}>
                                                <h3>{curso.nombreCurso}</h3>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>
                                                    <span>Nivel: {curso.nivel}</span>
                                                    <span>⭐ {curso.valoracion || 'N/A'}</span>
                                                </div>
                                            </div>
                                            <Link to={`/cursos/${curso.id}`} className="card-link" style={{ fontSize: '0.8rem' }}>Gestionar</Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>Aún no has creado ningún curso. <Link to="/nuevo-curso">¡Crea el primero ahora!</Link></p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <aside className="sidebar-column">
                    <div className="dashboard-card">
                        <h2 className="card-title" style={{ marginBottom: '1rem' }}>Tus Estadísticas</h2>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-number">{stats.misCursos}</span>
                                <span className="stat-label">Cursos Activos</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{stats.totalAlumnos}</span>
                                <span className="stat-label">Alumnos Totales</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{stats.valoracionMedia}</span>
                                <span className="stat-label">Valoración Media</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default ProfessorDashboard;
