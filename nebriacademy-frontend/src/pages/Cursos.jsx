import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/Cursos.css";
import { fetchData } from "../api/api";


function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [filters, setFilters] = useState({
    categoria: "",
    valoracion: "",
    nivel: "",
    profesorId: ""
  });

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

  const getNombreProfesor = (id) => {
    const profesor = profesores.find(p => p.id === parseInt(id));
    return profesor ? `${profesor.nombre} ${profesor.apellidos}` : 'Desconocido';
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Unique categories for the dropdown
  const categories = [...new Set(cursos.map(c => c.categoria))];

  // Filtering logic
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

        <aside className="filters">
          <h3>Filtros</h3>

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

          <label>
            Valoración Mínima
            <input
              type="number"
              name="valoracion"
              min="0"
              max="5"
              step="0.1"
              value={filters.valoracion}
              onChange={handleFilterChange}
              placeholder="Ej: 4.5"
            />
          </label>

          <label>
            Nivel
            <input
              type="text"
              name="nivel"
              value={filters.nivel}
              onChange={handleFilterChange}
              placeholder="Ej: Básico"
            />
          </label>

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

          <button
            className="btn-limpiar"
            onClick={() => setFilters({ categoria: "", valoracion: "", nivel: "", profesorId: "" })}
            style={{ marginTop: '1rem', width: '100%', padding: '0.5rem', cursor: 'pointer' }}
          >
            Limpiar Filtros
          </button>
        </aside>

        <section className="courses-grid">
          {loading && <p>Cargando datos...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && filteredCursos.length === 0 && <p>No hay cursos que coincidan con los filtros.</p>}

          {filteredCursos.map((curso) => (
            <Link
              to={`/cursos/${curso.id}`}
              className="course-card"
              key={curso.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h4>{curso.nombreCurso}</h4>
              <p className="no-select"><strong>Categoría:</strong> {curso.categoria}</p>
              <p className="no-select"><strong>Profesor:</strong> {getNombreProfesor(curso.profesor)}</p>
              <p className="no-select"><strong>Nivel:</strong> {curso.nivel}</p>
              <p className="no-select"><strong>Valoración:</strong> {curso.valoracion} ⭐</p>
              <p className="no-select">{curso.descripcion}</p>
            </Link>
          ))}

        </section>

      </div>

    </>
  );
}

export default Cursos;
