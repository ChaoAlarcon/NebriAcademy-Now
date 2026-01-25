import { useEffect, useState } from 'react';
import { fetchData } from '../api/api';

const AlumnosList = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // La ruta en el backend es '/alumnos'
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
  }, []);

  if (loading) return <p>Cargando alumnos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Alumnos</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {alumnos.map((alumno) => (
          <li key={alumno.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '10px', 
            marginBottom: '10px',
            backgroundColor: '#fff'
          }}>
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
