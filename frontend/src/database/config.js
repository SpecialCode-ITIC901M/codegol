// Define VITE_API_URL en .env.local para desarrollo y en el entorno de producción.
// Debe apuntar a la raíz de la API, por ejemplo: https://api.codegol.mx/api
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080/api').replace(/\/+$/, '')
