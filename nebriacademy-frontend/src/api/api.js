// URL base del backend
export const API_URL = "http://localhost:3000";

/**
 * Función genérica para obtener datos (GET) desde un endpoint específico.
 * @param {string} endpoint - El endpoint al que se realiza la petición (ej: 'cursos').
 * @returns {Promise<any>} - Los datos devueltos por la API en formato JSON.
 */
export const fetchData = async (endpoint) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`);
    // Si la respuesta no es correcta, intentamos extraer el error del JSON o usamos un mensaje genérico
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error al obtener ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Función genérica para enviar datos (POST) a un endpoint.
 * @param {string} endpoint - El endpoint de destino.
 * @param {object} data - Los datos que se enviarán en el cuerpo de la petición.
 * @returns {Promise<any>} - La respuesta del servidor en formato JSON.
 */
export const postData = async (endpoint, data) => {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

/**
 * Función genérica para actualizar datos (PUT) en un endpoint.
 * @param {string} endpoint - El endpoint de destino.
 * @param {object} data - Los datos actualizados.
 * @returns {Promise<any>} - Los datos actualizados devueltos por el servidor.
 */
export const putData = async (endpoint, data) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error al actualizar ${endpoint}:`, error);
    throw error;
  }
};
