import { API_BASE_URL } from './config'

/** Envía una solicitud HTTP al backend y convierte respuestas con error en mensajes legibles. */
export async function apiRequest(path, options = {}) {
  const endpoint = `${API_BASE_URL}/${path.replace(/^\/+/, '')}`
  const headers = new Headers(options.headers || {})
  const isFormData = options.body instanceof FormData

  if (options.body && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(endpoint, { ...options, headers })
  if (response.status === 204) return null

  const responseType = response.headers.get('content-type') || ''
  const result = responseType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    const message = typeof result === 'object' && result?.message
      ? result.message
      : `La solicitud falló (${response.status}).`
    throw new Error(message)
  }

  return result
}

export const apiGet = (path, options) => apiRequest(path, { ...options, method: 'GET' })
export const apiPost = (path, data, options) => apiRequest(path, { ...options, method: 'POST', body: JSON.stringify(data) })
export const apiPut = (path, data, options) => apiRequest(path, { ...options, method: 'PUT', body: JSON.stringify(data) })
export const apiDelete = (path, options) => apiRequest(path, { ...options, method: 'DELETE' })
