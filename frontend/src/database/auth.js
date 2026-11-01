import { apiPost } from './api'

export async function registrarUsuario({ username, email, nombreCompleto, password }) {
  return apiPost('auth/registro', {
    username,
    email,
    nombreCompleto,
    password,
    rol: 'ROLE_ADMIN',
  })
}

export async function iniciarSesion({ username, password }) {
  const respuesta = await apiPost('auth/login', { username, password })
  if (!respuesta?.token) {
    throw new Error('El servidor respondió, pero no devolvió un token de acceso.')
  }
  return respuesta
}
