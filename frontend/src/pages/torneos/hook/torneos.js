import { apiGet, apiPost } from '../../../database/api'

function comoLista(data) {
  if (Array.isArray(data)) return data
  if (data == null) return []
  return [data]
}

export async function obtenerCategorias() {
  return comoLista(await apiGet('torneos/categorias'))
}

export function crearCategoria(datos) {
  return apiPost('torneos/categorias', datos)
}

export async function obtenerTorneos() {
  return comoLista(await apiGet('torneos'))
}

export function obtenerTorneo(id) {
  return apiGet(`torneos/${id}`)
}

export function crearTorneo(datos) {
  return apiPost('torneos', datos)
}

export async function obtenerEquipos() {
  return comoLista(await apiGet('equipos'))
}

export async function obtenerEquiposDeTorneo(torneoId) {
  return comoLista(await apiGet(`equipos/torneo/${torneoId}`))
}

export function inscribirEquipo(datos) {
  return apiPost('equipos', datos)
}
