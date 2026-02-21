// URL base del backend
export const API_URL = "http://localhost:3000";

/* Obtiene datos de un endpoint (GET) */
export const fetchData = async (endpoint) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`);
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

/* Envía datos a un endpoint (POST) */
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

/* Actualiza datos existentes (PUT) */
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

/* Envía formularios con archivos (POST con FormData) */
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

/* Elimina un registro (DELETE) */
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
