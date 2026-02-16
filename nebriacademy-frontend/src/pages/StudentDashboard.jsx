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
        incidencias: 0
    });
    const [activeCursos, setActiveCursos] = useState([]); // Cursos destacados del alumno
    const [recentIncidencias, setRecentIncidencias] = useState([]); // Últimas incidencias registradas
    const [loading, setLoading] = useState(true); // Estado de carga inicial

    useEffect(() => {
        /**
         * Obtiene todos los datos necesarios para el dashboard en una sola ráfaga de peticiones (Promise.all).
         * Carga: Cursos globales, Profesores, Alumnos, Incidencias y Cursos Guardados del alumno.
         */
        const getAllData = async () => {
            try {
                // Realizamos peticiones en paralelo para optimizar el tiempo de carga
                const userStr = localStorage.getItem("usuario");
                const currentUser = userStr ? JSON.parse(userStr) : null;

                const requests = [
                    fetchData('cursos'),
                    fetchData('profesores'),
                    fetchData('alumnos'),
                    fetchData('incidencias')
                ];

                // Si hay usuario logueado, traer sus cursos guardados
                if (currentUser && currentUser.id) {
                    requests.push(fetchData(`cursosguardados/alumno/${currentUser.id}`));
                }

                const [cursosData, profesoresData, alumnosData, incidenciasData, guardadosData] = await Promise.all(requests);

                // Normalizamos la estructura de los datos según lo que devuelve el backend
                const cursosList = cursosData.Cursos || (Array.isArray(cursosData) ? cursosData : []);
                const incidenciasList = incidenciasData.Incidencias || (Array.isArray(incidenciasData) ? incidenciasData : []);
                const guardadosList = guardadosData ? (guardadosData.Cursos || []) : [];

                // Actualizamos las estadísticas globales
                setStats({
                    cursos: cursosData["Numero de cursos"] || cursosList.length,
                    profesores: profesoresData["Numero de profesores"] || (Array.isArray(profesoresData) ? profesoresData.length : 0),
                    alumnos: alumnosData["Numero de alumnos"] || (Array.isArray(alumnosData) ? alumnosData.length : 0),
                    incidencias: incidenciasData["Numero de incidencias"] || incidenciasList.length
                });

                // Mostramos los cursos guardados en lugar de los aleatorios
                setActiveCursos(guardadosList);
                setRecentIncidencias(incidenciasList.slice(0, 2));
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
                {/* Columna principal: Cursos e Incidencias */}
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

                    {/* Lista de incidencias recientes con estados de colores */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">Últimas Incidencias</h2>
                        </div>
                        <ul className="list-none">
                            {recentIncidencias.length > 0 ? (
                                recentIncidencias.map((inc, index) => (
                                    <li key={inc.id || index} className="event-item">
                                        <div className={`event-date ${inc.estado}`}>
                                            <span>#{inc.id}</span>
                                        </div>
                                        <div className="event-details">
                                            <h4>{inc.asunto || 'Sin asunto'}</h4>
                                            <p>{inc.descripcion ? inc.descripcion.substring(0, 50) + '...' : 'Sin descripción'}</p>
                                            <small className="text-muted">Estado: {inc.estado}</small>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>No hay incidencias registradas.</p>
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
                                <span className="stat-number" style={{ color: stats.incidencias > 0 ? '#dc3545' : '#28a745' }}>
                                    {stats.incidencias}
                                </span>
                                <span className="stat-label">Incidencias</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default StudentDashboard;
