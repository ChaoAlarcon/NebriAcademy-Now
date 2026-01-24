import React from "react";
import "../style/Cursos.css";


function Cursos() {
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
    <div className="course-card">
      <h4>Nombre del curso</h4>
      <p>Categoría: Frontend</p>
      <p>Profesor: Juan</p>
      <p>Nivel: Básico</p>
      <p>Valoración: ⭐⭐⭐⭐</p>
    </div>

    {/* más cards */}
  </section>

</div>

		</>
	);
}

export default Cursos;
