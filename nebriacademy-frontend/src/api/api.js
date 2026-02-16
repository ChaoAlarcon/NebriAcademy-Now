// URL base del backend
export const API_URL = "http://localhost:3000";

/**
 * Función genérica para obtener datos (GET) desde un endpoint específico.
 * @param {string} endpoint - El endpoint al que se realiza la petición (ej: 'cursos').
 * @returns {Promise<any>} - Los datos devueltos por la API en formato JSON.
 * Maneja errores de respuesta no exitosa (diferente de 2xx).
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
 * @param {string} endpoint - El endpoint de destino (ej: 'alumnos').
 * @param {object} data - Los datos que se enviarán en el cuerpo de la petición.
 * @returns {Promise<any>} - La respuesta del servidor en formato JSON.
 * Útil para crear nuevos registros.
 */
export const postData = async (endpoint, data) => {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

/**
 * Función genérica para actualizar datos (PUT) en un endpoint.
 * @param {string} endpoint - El endpoint de destino (ej: 'profesores/1').
 * @param {object} data - Los datos actualizados.
 * @returns {Promise<any>} - Los datos actualizados devueltos por el servidor.
 * Útil para modificar registros existentes.
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

/**
 * Función genérica para enviar datos con archivos (FormData) a un endpoint.
 * Usada principalmente para subir archivos (ej: crear curso con imagen, subir recursos).
 * @param {string} endpoint - El endpoint de destino.
 * @param {FormData} formData - Objeto FormData que incluye archivos y otros campos.
 * @returns {Promise<any>} - La respuesta del servidor.
 */
export const postFileData = async (endpoint, formData) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error al enviar archivo a ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Función genérica para eliminar datos (DELETE) en un endpoint.
 * @param {string} endpoint - El endpoint de destino (ej: 'cursos/5').
 * @returns {Promise<any>} - La respuesta del servidor confirmando la eliminación.
 */
export const deleteData = async (endpoint) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error al eliminar ${endpoint}:`, error);
    throw error;
  }
};
