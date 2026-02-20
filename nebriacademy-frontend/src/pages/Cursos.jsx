import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/Cursos.css";
import { fetchData } from "../api/api";

/**
 * Página de Listado de Cursos.
 * Muestra todos los cursos de la academia con un sistema de filtrado avanzado lateral.
 */
function Cursos() {
  const [cursos, setCursos] = useState([]); // Todos los cursos cargados
  const [profesores, setProfesores] = useState([]); // Lista de profesores para asociar nombres
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Gestión de errores

  // Estado para los filtros actuales (categoría, valoración mínima, nivel y profesor)
  const [filters, setFilters] = useState({
    categoria: "",
    valoracion: "",
    nivel: "",
    profesorId: ""
  });

  // Cargar cursos al montar el componente
  useEffect(() => {
    fetchData('cursos')
      .then((data) => {
        if (data.Cursos) {
          setCursos(data.Cursos);
        } else {
          setCursos(Array.isArray(data) ? data : []);
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar cursos');
      });
  }, []);

  // Cargar profesores para poder mostrar sus nombres en el grid de cursos
  useEffect(() => {
    fetchData('profesores')
      .then((data) => {
        if (data.Profesores) {
          setProfesores(data.Profesores);
        } else {
          setProfesores(Array.isArray(data) ? data : []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar profesores');
        setLoading(false);
      });
  }, []);

  // Busca el nombre de un profesor dado su ID
  const getNombreProfesor = (id) => {
    const profesor = profesores.find(p => p.id === parseInt(id));
    return profesor ? `${profesor.nombre} ${profesor.apellidos}` : 'Desconocido';
  };

  // Actualiza el estado de los filtros según el input cambiado
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Genera una lista única de categorías existentes en los cursos cargados
  const categories = [...new Set(cursos.map(c => c.categoria))];

  /**
   * Lógica de filtrado en tiempo real.
   * Aplica todos los filtros seleccionados (categoría, valoración, nivel, profesor)
   * sobre la lista completa de cursos obtenidos.
   */
  const filteredCursos = cursos.filter(curso => {
    const matchCategoria = filters.categoria === "" || curso.categoria === filters.categoria;
    const matchValoracion = filters.valoracion === "" || curso.valoracion >= parseFloat(filters.valoracion);
    const matchNivel = filters.nivel === "" || curso.nivel.toLowerCase().includes(filters.nivel.toLowerCase());
    const matchProfesor = filters.profesorId === "" || curso.profesor === parseInt(filters.profesorId);

    return matchCategoria && matchValoracion && matchNivel && matchProfesor;
  });

  return (
    <>
      <div className="cursos-page">
        {/* Barra Lateral de Filtros */}
        <aside className="filters">
          <h3>Filtros</h3>

          {/* Filtro por Categoría */}
          <label>
            Categoría
            <select
              className="form-control"
              name="categoria"
              value={filters.categoria}
              onChange={handleFilterChange}>
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          {/* Filtro por Valoración Mínima */}
          <label>
            Valoración Mínima
            <select
              className="form-control"
              name="valoracion"
              value={filters.valoracion}
              onChange={handleFilterChange}>
              <option value="">Todas las valoraciones</option>
              <option value="4.5">4.5+</option>
              <option value="4.0">4.0+</option>
            </select>
          </label>

          {/* Filtro por Nivel (Texto) */}
          <label>
            Nivel
            <select
              className="form-control"
              name="nivel"
              value={filters.nivel}
              onChange={handleFilterChange}>
              <option value="">Todos los niveles</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </label>

          {/* Filtro por Profesor específico */}
          <label>
            Profesor
            <select
              className="form-control"
              name="profesorId"
              value={filters.profesorId}
              onChange={handleFilterChange}>
              <option value="">Todos los profesores</option>
              {profesores.map((profesor) => (
                <option key={profesor.id} value={profesor.id}>
                  {profesor.nombre} {profesor.apellidos}
                </option>
              ))}
            </select>
          </label>

          {/* Botón para resetear todos los filtros a su estado inicial */}
          <button
            className="btn-limpiar"
            onClick={() => setFilters({ categoria: "", valoracion: "", nivel: "", profesorId: "" })}
          >
            Limpiar Filtros
          </button>
        </aside>

        {/* Grid Principal de Cursos */}
        <section className="courses-grid">
          {loading && <p>Cargando datos...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && filteredCursos.length === 0 && <p>No hay cursos que coincidan con los filtros.</p>}

          {/* Renderizado dinámico de las tarjetas de curso */}
          {filteredCursos.map((curso) => (
            <Link
              to={`/cursos/${curso.id}`}
              className="course-card no-decoration inherit-color"
              key={curso.id}
            >
              <div className="course-card-icon">{curso.icono || '📚'}</div>
              <h4>{curso.nombreCurso}</h4>
              <p className="no-select"><strong>Categoría:</strong> {curso.categoria}</p>
              <p className="no-select"><strong>Profesor:</strong> {getNombreProfesor(curso.profesor)}</p>
              <p className="no-select"><strong>Nivel:</strong> {curso.nivel}</p>
              <p className="no-select"><strong>Valoración:</strong> {curso.valoracion || 0} ⭐</p>
              <p className="no-select">{curso.descripcion}</p>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}

export default Cursos;
