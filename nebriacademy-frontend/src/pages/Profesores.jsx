import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../api/api';
import "../style/Profesores.css";

/**
 * Página que muestra el listado de todos los profesores registrados.
 * Accesible para usuarios autenticados.
 */
const Profesores = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("usuario");
    if (!userStr) {
      // Redirigir a login si no hay usuario
      navigate('/login');
      return;
    }

    // La ruta en el backend es '/profesores'
    fetchData('profesores')
      .then((data) => {
        // El backend devuelve { "Numero de profesores": N, "Profesores": [...] }
        if (data.Profesores) {
          setProfesores(data.Profesores);
        } else {
          // Fallback por si la estructura cambia
          setProfesores(Array.isArray(data) ? data : []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar profesores');
        setLoading(false);
      });
  }, []); // Se ejecuta solo al iniciar

  if (loading) return <p className="loading-message">Cargando profesores...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="profesores-container">
      <h2 className="profesores-title">Lista de Profesores</h2>
      <ul className="profesores-list">
        {profesores.map((profesor) => (
          <li key={profesor.id} className="profesor-card">
            <strong className="profesor-name">{profesor.nombre} {profesor.apellidos}</strong>
            <small className="profesor-email">{profesor.email}</small>
          </li>
        ))}
      </ul>
      {profesores.length === 0 && <p className="empty-message">No hay profesores registrados.</p>}
    </div>
  );
};

export default Profesores