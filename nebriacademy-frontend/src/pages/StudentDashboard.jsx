import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../api/api';
import '../style/Home.css';

/**
 * Dashboard principal para usuarios con rol de 'alumno'.
 * Muestra estadísticas generales de la academia, sus cursos activos e incidencias recientes.
 */
function StudentDashboard({ userName }) {
    // Estado para las estadísticas numéricas de la barra lateral
    const [stats, setStats] = useState({
        cursos: 0,
        profesores: 0,
        alumnos: 0,
        reseñas: 0
    });
    const [activeCursos, setActiveCursos] = useState([]); // Cursos destacados del alumno
    const [recentReviews, setRecentReviews] = useState([]); // Últimas reseñas del alumno
    const [loading, setLoading] = useState(true); // Estado de carga inicial

    useEffect(() => {
        /**
         * Obtiene todos los datos necesarios para el dashboard en una sola ráfaga de peticiones (Promise.all).
         * Carga: Cursos globales, Profesores, Alumnos, Reseñas del alumno y Cursos Guardados.
         */
        const getAllData = async () => {
            try {
                // Realizamos peticiones en paralelo para optimizar el tiempo de carga
                const userStr = localStorage.getItem("usuario");
                const currentUser = userStr ? JSON.parse(userStr) : null;

                const requests = [
                    fetchData('cursos'),
                    fetchData('profesores'),
                    fetchData('alumnos')
                ];

                // Si hay usuario logueado, traer sus cursos guardados y sus reseñas
                if (currentUser && currentUser.id) {
                    requests.push(fetchData(`cursosguardados/alumno/${currentUser.id}`));
                    requests.push(fetchData(`puntuacionescursos/alumno/${currentUser.id}`));
                }

                const responses = await Promise.all(requests);
                const [cursosData, profesoresData, alumnosData] = responses;
                const guardadosData = currentUser ? responses[3] : null;
                const reviewsData = currentUser ? responses[4] : null;

                // Normalizamos la estructura de los datos según lo que devuelve el backend
                const cursosList = cursosData.Cursos || (Array.isArray(cursosData) ? cursosData : []);
                const guardadosList = guardadosData ? (guardadosData.Cursos || []) : [];
                const reviewsList = reviewsData ? (reviewsData.PuntuacionesCursos || []) : [];

                // Actualizamos las estadísticas globales
                setStats({
                    cursos: cursosData["Numero de cursos"] || cursosList.length,
                    profesores: profesoresData["Numero de profesores"] || (Array.isArray(profesoresData) ? profesoresData.length : 0),
                    alumnos: alumnosData["Numero de alumnos"] || (Array.isArray(alumnosData) ? alumnosData.length : 0),
                    reseñas: reviewsList.length
                });

                // Mostramos los cursos guardados en lugar de los aleatorios
                setActiveCursos(guardadosList);
                setRecentReviews(reviewsList.slice(0, 2));
                setLoading(false);
            } catch (err) {
                console.error("Error al cargar datos del dashboard:", err);
                setLoading(false);
            }
        };

        getAllData();
    }, []);

    return (
        <div className="dashboard-container">
            {/* Cabecera de bienvenida personalizada */}
            <header className="dashboard-header">
                <h1>Hola, <span>{userName}</span></h1>
                <p>Bienvenido de vuelta a tu espacio de aprendizaje.</p>
            </header>

            <div className="dashboard-grid">
                {/* Columna principal: Cursos e Reseñas */}
                <div className="main-column">
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">Mis Cursos Guardados</h2>
                            <Link to="/cursos" className="card-link">Ver todos</Link>
                        </div>

                        {loading ? (
                            <p>Cargando tu progreso...</p>
                        ) : (
                            <div className="dashboard-course-list">
                                {activeCursos.length > 0 ? (
                                    activeCursos.map((curso) => (
                                        <Link to={`/cursos/${curso.id}`} key={curso.id} className="dashboard-course-item">
                                            <div className="course-icon-placeholder">
                                                {curso.icono || '📚'}
                                            </div>
                                            <div className="course-info flex-1">
                                                <h3>{curso.nombreCurso}</h3>
                                                <div className="dashboard-course-item-meta">
                                                    <span>Nivel: {curso.nivel}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p>No tienes cursos activos. <Link to="/cursos">Empieza uno ahora.</Link></p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Lista de reseñas recientes */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">Mis Reseñas</h2>
                        </div>
                        <ul className="list-none">
                            {recentReviews.length > 0 ? (
                                recentReviews.map((rev, index) => (
                                    <li key={rev.id || index} className="event-item">
                                        <div className="event-date" style={{ backgroundColor: '#F8F8FB', color: '#000' }}>
                                            <span>⭐ {rev.puntuacion}</span>
                                        </div>
                                        <div className="event-details">
                                            <h4>{rev.nombreCurso}</h4>
                                            <p>{rev.comentario ? (rev.comentario.length > 200 ? rev.comentario.substring(0, 60) + '...' : rev.comentario) : 'Sin comentario'}</p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>Aún no has escrito ninguna reseña.</p>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Columna lateral: Estadísticas globales de la plataforma */}
                <aside className="sidebar-column">
                    <div className="dashboard-card">
                        <h2 className="card-title mb-1rem">Estado de la Academia</h2>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-number">{stats.cursos}</span>
                                <span className="stat-label">Cursos totales</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{stats.profesores}</span>
                                <span className="stat-label">Profesores</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{stats.alumnos}</span>
                                <span className="stat-label">Alumnos</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number" style={{ color: '#28a745' }}>
                                    {stats.reseñas}
                                </span>
                                <span className="stat-label">Mis Reseñas</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default StudentDashboard;
