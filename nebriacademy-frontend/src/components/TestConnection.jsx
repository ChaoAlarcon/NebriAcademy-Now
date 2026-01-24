import { useEffect, useState } from 'react';
import { fetchData } from '../api/api';

const TestConnection = () => {
  const [status, setStatus] = useState('Probando conexión...');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData('usuarios')
      .then((res) => {
        setStatus('Conexión exitosa ✅');
        setData(res);
      })
      .catch((err) => {
        console.error(err);
        setStatus('Error de conexión ❌');
      });
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h3>Estado del Backend: {status}</h3>
      {data && (
        <pre style={{ textAlign: 'left', backgroundColor: '#eee', padding: '10px' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TestConnection;
