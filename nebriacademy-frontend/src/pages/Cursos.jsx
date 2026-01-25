import React, { useEffect, useState } from "react";
import "../style/Cursos.css";
import { fetchData } from "../api/api";


function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData('cursos')
      .then((data) => {
        // El backend devuelve { "Numero de cursos": N, "Cursos": [...] }
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
    const profesor = profesores.find(p => p.id === id);
    return profesor ? `${profesor.nombre} ${profesor.apellidos}` : 'Desconocido';
  };

	return (
		<>
			<div className="cursos-page">

  <aside className="filters">
    <h3>Filtros</h3>

    <label>
      Categoría
      <input type="text" />
    </label>

    <label>
      Valoración
      <input type="number" />
    </label>

    <label>
      Nivel
      <input type="text" />
    </label>

    <label>
      Profesor
      <input type="text" />
    </label>
  </aside>

  <section className="courses-grid">
    {loading && <p>Cargando datos...</p>}
    {error && <p>{error}</p>}
    {!loading && !error && cursos.length === 0 && <p>No hay cursos disponibles.</p>}
    
    {cursos.map((curso) => (
      <div className="course-card" key={curso.id}>
        <h4>{curso.nombreCurso}</h4>
        <p class="no-select"><strong>Categoría:</strong> {curso.categoria}</p>
        <p class="no-select"><strong>Profesor:</strong> {getNombreProfesor(curso.profesor)}</p>
        <p class="no-select"><strong>Nivel:</strong> {curso.nivel}</p>
        <p class="no-select"><strong>Valoración:</strong> {curso.valoracion} ⭐</p>
        <p class="no-select">{curso.descripcion}</p>
      </div>
    ))}

  </section>

</div>

		</>
	);
}

export default Cursos;
