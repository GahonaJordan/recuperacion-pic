const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';; // Ajusta según tu entorno

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Error en la petición: ${response.statusText}`);
  }
  return response.json();
};

export const getTalleres = async () => {
  return fetchAPI('/talleres');
}

export const getVehiculos = async () => {
  return fetchAPI('/vehiculos');
}

export const getServicios = async () => {
  return fetchAPI('/servicios');
}

export const getNotificaciones = async () => {
  return fetchAPI('/notificaciones');
}