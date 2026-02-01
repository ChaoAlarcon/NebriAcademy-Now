import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../api/api';
import '../style/Home.css';

function Home() {
    const [stats, setStats] = useState({
        cursos: 0,
        profesores: 0,
        alumnos: 0,
        incidencias: 0
    });
    const [activeCursos, setActiveCursos] = useState([]);
    const [recentIncidencias, setRecentIncidencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("Estudiante");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userStr = localStorage.getItem("usuario");
        if (userStr) {
            const user = JSON.parse(userStr);
            setUserName(user.nombre);
            setIsLoggedIn(true);
        }

        const getAllData = async () => {
            try {
                const [cursosData, profesoresData, alumnosData, incidenciasData] = await Promise.all([
                    fetchData('cursos'),
                    fetchData('profesores'),
                    fetchData('alumnos'),
                    fetchData('incidencias')
                ]);

                const cursosList = cursosData.Cursos || (Array.isArray(cursosData) ? cursosData : []);
                const incidenciasList = incidenciasData.Incidencias || (Array.isArray(incidenciasData) ? incidenciasData : []);

                setStats({
                    cursos: cursosData["Numero de cursos"] || cursosList.length,
                    profesores: profesoresData["Numero de profesores"] || (Array.isArray(profesoresData) ? profesoresData.length : 0),
                    alumnos: alumnosData["Numero de alumnos"] || (Array.isArray(alumnosData) ? alumnosData.length : 0),
                    incidencias: incidenciasData["Numero de incidencias"] || incidenciasList.length
                });

                setActiveCursos(cursosList.slice(0, 3));
                setRecentIncidencias(incidenciasList.slice(0, 2));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setLoading(false);
            }
        };

        getAllData();
    }, []);

    if (!isLoggedIn && !loading) return null;

    return (
        <div className="dashboard-container">

            <header className="dashboard-header">
                <h1>Hola, <span>{userName}</span></h1>
                <p>Bienvenido de vuelta a tu espacio de aprendizaje.</p>
            </header>

            <div className="dashboard-grid">

                {/* Main Column */}
                <div className="main-column">

                    {/* Active Courses Section */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">Continuar Aprendiendo</h2>
                            <Link to="/cursos" className="card-link">Ver todos</Link>
                        </div>

                        {loading ? (
                            <p>Cargando tu progreso...</p>
                        ) : (
                            <div className="dashboard-course-list">
                                {activeCursos.length > 0 ? (
                                    activeCursos.map((curso, index) => (
                                        <Link to={`/cursos/${curso.id}`} key={curso.id} className="dashboard-course-item">
                                            <div className="course-icon-placeholder">
                                                {/* Mock icon based on index or category */}
                                                {['⚛️', '🐍', '🎨'][index % 3]}
                                            </div>
                                            <div className="course-info" style={{ flex: 1 }}>
                                                <h3>{curso.nombreCurso}</h3>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>
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

                    {/* Recent Activity Section */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">Últimas Incidencias</h2>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {recentIncidencias.length > 0 ? (
                                recentIncidencias.map((inc, index) => (
                                    <li key={inc.id || index} className="event-item">
                                        <div className="event-date" style={{
                                            backgroundColor: inc.estado === 'pendiente' ? '#fff3cd' : '#e7f1ff',
                                            color: inc.estado === 'pendiente' ? '#856404' : '#0056b3'
                                        }}>
                                            <span>#{inc.id}</span>
                                        </div>
                                        <div className="event-details">
                                            <h4>{inc.asunto || 'Sin asunto'}</h4>
                                            <p>{inc.descripcion ? inc.descripcion.substring(0, 50) + '...' : 'Sin descripción'}</p>
                                            <small style={{ color: '#888' }}>Estado: {inc.estado}</small>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>No hay incidencias registradas.</p>
                            )}
                        </ul>
                    </div>

                </div>

                {/* Sidebar Column */}
                <aside className="sidebar-column">

                    {/* Quick Stats */}
                    <div className="dashboard-card">
                        <h2 className="card-title" style={{ marginBottom: '1rem' }}>Estado de la Academia</h2>
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

export default Home;