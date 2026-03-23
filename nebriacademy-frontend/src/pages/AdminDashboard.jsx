import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../api/api';
import '../style/Home.css';

/**
 * Dashboard principal para usuarios con rol de 'administrador'.
 * Permite supervisar toda la academia, viendo estadísticas globales y todos los cursos.
 */
function AdminDashboard({ userName }) {
    const navigate = useNavigate();
    // Estado para las métricas globales de la plataforma
    const [stats, setStats] = useState({
        totalCursos: 0,
        totalAlumnos: 0,
        totalProfesores: 0,
        valoracionMediaGlobal: 0
    });
    const [todosLosCursos, setTodosLosCursos] = useState([]); // Lista completa de cursos
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /**
         * Obtiene todos los datos globales de la plataforma.
         */
        const getAdminData = async () => {
            try {
                // Obtenemos todos los cursos, alumnos y profesores registered
                const [cursosData, alumnosData, profesoresData] = await Promise.all([
                    fetchData('cursos'),
                    fetchData('alumnos'),
                    fetchData('profesores')
                ]);

                const allCursos = cursosData.Cursos || (Array.isArray(cursosData) ? cursosData : []);
                const allAlumnos = alumnosData.Alumnos || (Array.isArray(alumnosData) ? alumnosData : []);
                const allProfesores = profesoresData.Profesores || (Array.isArray(profesoresData) ? profesoresData : []);

                setTodosLosCursos(allCursos);
                setStats({
                    totalCursos: allCursos.length,
                    totalAlumnos: alumnosData["Numero de alumnos"] || allAlumnos.length,
                    totalProfesores: profesoresData["Numero de profesores"] || allProfesores.length,
                    valoracionMediaGlobal: allCursos.length > 0
                        ? (allCursos.reduce((acc, c) => acc + (c.valoracion || 0), 0) / allCursos.length).toFixed(1)
                        : 0
                });
                setLoading(false);
            } catch (err) {
                console.error("Error al cargar datos de administrador:", err);
                setLoading(false);
            }
        };

        getAdminData();
    }, []);

    return (
        <div className="dashboard-container">
            {/* Cabecera del panel de administración */}
            <header className="dashboard-header">
                <h1>Panel de Administración, <span>{userName}</span></h1>
                <p>Supervisión global de la plataforma, cursos y usuarios.</p>
            </header>

            <div className="dashboard-grid">
                {/* Columna principal: Gestión Global de Cursos */}
                <div className="main-column">
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">Todos los Cursos de la Plataforma</h2>
                            <Link to="/nuevo-curso" className="create-course-link">+ Crear Nuevo Curso</Link>
                        </div>

                        {loading ? (
                            <p>Cargando todos los cursos...</p>
                        ) : (
                            <div className="dashboard-course-list">
                                {todosLosCursos.length > 0 ? (
                                    todosLosCursos.map((curso) => (
                                        <div key={curso.id} className="dashboard-course-item">
                                            <div className="course-icon-placeholder">
                                                {curso.icono || '📚'}
                                            </div>
                                            <div className="dashboard-course-item-info">
                                                <h3>{curso.nombreCurso}</h3>
                                                <div className="dashboard-course-item-meta">
                                                    <span>Nivel: {curso.nivel}</span>
                                                    <span>⭐ {curso.valoracion || 'N/A'}</span>
                                                    <span>ID: {curso.id}</span>
                                                </div>
                                            </div>
                                            {/* Los admins pueden gestionar CUALQUIER curso */}
                                            <Link to={`/cursos/${curso.id}`} className="card-link font-small">Gestionar</Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay cursos en la plataforma.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Columna lateral: Estadísticas Globales */}
                <aside className="sidebar-column">
                    <div className="dashboard-card">
                        <h2 className="card-title mb-1rem">Estadísticas Globales</h2>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-number">{stats.totalCursos}</span>
                                <span className="stat-label">Total Cursos</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{stats.totalAlumnos}</span>
                                <span className="stat-label">Total Alumnos</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{stats.totalProfesores}</span>
                                <span className="stat-label">Total Profesores</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number" style={{ color: 'var(--nebrija-red)' }}>{stats.valoracionMediaGlobal}</span>
                                <span className="stat-label">Valoración Media</span>
                            </div>
                        </div>
                    </div>

                    {/* Accesos Rápidos de Administración */}
                    <div className="dashboard-card" style={{ marginTop: '1.5rem' }}>
                        <h2 className="card-title mb-1rem">Gestión de Usuarios</h2>
                        <div className="admin-actions-list">
                            <button onClick={() => navigate('/alumnos')} className="admin-action-item">👥 Gestionar Alumnos</button>
                            <button onClick={() => navigate('/profesores')} className="admin-action-item">👨‍🏫 Ver Profesores</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default AdminDashboard;
