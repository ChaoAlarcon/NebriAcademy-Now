import { useEffect, useState } from 'react';
import { fetchData } from '../api/api';

/**
 * Componente que muestra una lista de todos los alumnos registrados.
 * Obtiene los datos de la API y renderiza tarjetas individuales para cada alumno.
 */
const AlumnosList = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // La ruta en el backend es '/alumnos' (GET)
    fetchData('alumnos')
      .then((data) => {
        // El backend devuelve { "Numero de alumnos": N, "Alumnos": [...] }
        if (data.Alumnos) {
          setAlumnos(data.Alumnos);
        } else {
          // Fallback por si la estructura cambia
          setAlumnos(Array.isArray(data) ? data : []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar alumnos');
        setLoading(false);
      });
  }, []); // Se ejecuta solo al montar el componente

  if (loading) return <p>Cargando alumnos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-2rem">
      <h2>Lista de Alumnos</h2>
      <ul className="list-none">
        {alumnos.map((alumno) => (
          <li key={alumno.id} className="dashboard-card mb-1rem p-2rem">
            <strong>{alumno.nombre} {alumno.apellidos}</strong> <br />
            <small>{alumno.email}</small>
          </li>
        ))}
      </ul>
      {alumnos.length === 0 && <p>No hay alumnos registrados.</p>}
    </div>
  );
};

export default AlumnosList;
