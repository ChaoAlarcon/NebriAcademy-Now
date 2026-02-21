import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../api/api';
import '../style/Home.css';

/**
 * Dashboard principal para usuarios con rol de 'profesor'.
 * Permite gestionar sus cursos subidos y ver estadísticas de rendimiento.
 */
function ProfessorDashboard({ userName, userId }) {
    // Estado para las métricas clave del profesor
    const [stats, setStats] = useState({
        misCursos: 0,
        totalAlumnos: 0,
        valoracionMedia: 0
    });
    const [misCursos, setMisCursos] = useState([]); // Lista filtrada de cursos del profesor
    const [loading, setLoading] = useState(true); // Control de carga

    useEffect(() => {
        /**
         * Obtiene todos los cursos de la API y filtra los que pertenecen al profesor actual.
         * Calcula métricas como número de cursos, alumnos totales y valoración media.
         */
        const getProfessorData = async () => {
            try {
                // Obtenemos todos los cursos registrados y la lista de alumnos
                const [cursosData, alumnosData] = await Promise.all([
                    fetchData('cursos'),
                    fetchData('alumnos')
                ]);

                const allCursos = cursosData.Cursos || (Array.isArray(cursosData) ? cursosData : []);
                const allAlumnos = alumnosData.Alumnos || (Array.isArray(alumnosData) ? alumnosData : []);

                // Filtramos por el ID del profesor actual (pasado por props)
                const professorCursos = allCursos.filter(c => c.profesor === userId);

                // Calculamos las métricas basadas en los cursos filtrados
                setMisCursos(professorCursos);
                setStats({
                    misCursos: professorCursos.length,
                    totalAlumnos: alumnosData["Numero de alumnos"] || allAlumnos.length,
                    valoracionMedia: professorCursos.length > 0
                        ? (professorCursos.reduce((acc, c) => acc + (c.valoracion || 0), 0) / professorCursos.length).toFixed(1)
                        : 0
                });
                setLoading(false);
            } catch (err) {
                console.error("Error al cargar datos del profesor:", err);
                setLoading(false);
            }
        };

        // Solo lanzamos la petición si tenemos el ID del usuario
        if (userId) {
            getProfessorData();
        }
    }, [userId]);

    return (
        <div className="dashboard-container">
            {/* Cabecera del panel con nombre del profesor */}
            <header className="dashboard-header">
                <h1>Panel de Control, <span>Prof. {userName}</span></h1>
                <p>Gestiona tus contenidos y haz un seguimiento de tus alumnos.</p>
            </header>

            <div className="dashboard-grid">
                {/* Columna principal: Listado de gestión de cursos propios */}
                <div className="main-column">
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">Mis Cursos</h2>
                            {/* Botón para navegar al formulario de creación */}
                            <Link to="/nuevo-curso" className="create-course-link">+ Crear Nuevo Curso</Link>
                        </div>

                        {loading ? (
                            <p>Cargando tus cursos...</p>
                        ) : (
                            <div className="dashboard-course-list">
                                {misCursos.length > 0 ? (
                                    misCursos.map((curso) => (
                                        <div key={curso.id} className="dashboard-course-item">
                                            <div className="course-icon-placeholder">
                                                {curso.icono || '📚'}
                                            </div>
                                            <div className="dashboard-course-item-info">
                                                <h3>{curso.nombreCurso}</h3>
                                                <div className="dashboard-course-item-meta">
                                                    <span>Nivel: {curso.nivel}</span>
                                                    <span>⭐ {curso.valoracion || 'N/A'}</span>
                                                </div>
                                            </div>
                                            {/* Link directo a la página de detalle/edición del curso */}
                                            <Link to={`/cursos/${curso.id}`} className="card-link font-small">Gestionar</Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>Aún no has creado ningún curso. <Link to="/nuevo-curso">¡Crea el primero ahora!</Link></p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Columna lateral: Estadísticas de impacto del profesor */}
                <aside className="sidebar-column">
                    <div className="dashboard-card">
                        <h2 className="card-title mb-1rem">Tus Estadísticas</h2>
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
