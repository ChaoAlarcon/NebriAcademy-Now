import { useEffect, useState } from 'react';
import { fetchData } from '../api/api';

/**
 * Componente de utilidad para probar la conexión con el backend.
 * Intenta obtener la lista de usuarios y muestra el resultado o error.
 */
const TestConnection = () => {
  const [status, setStatus] = useState('Probando conexión...');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData('usuarios')
      .then((res) => {
        setStatus('Conexión exitosa');
        setData(res);
      })
      .catch((err) => {
        console.error(err);
        setStatus('Error');
      });
  }, []);

  return (
    <div className="p-2rem auth-card m-0 full-width">
      <h3>Estado del Backend: {status}</h3>
      {data && (
        <pre className="text-left mt-2rem p-2rem" style={{ backgroundColor: '#eee' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TestConnection;
