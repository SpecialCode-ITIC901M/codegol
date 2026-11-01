// Funciones de lógica de jugadores. No dependen de React ni de la pantalla.
function validarJugador(datos) {
  if (!datos.nombre?.trim()) throw new Error('Escribe el nombre del jugador.')
  if (!datos.equipo?.trim()) throw new Error('Escribe el equipo del jugador.')
  return {
    nombre: datos.nombre.trim(),
    apellidos: datos.apellidos.trim(),
    equipo: datos.equipo.trim(),
    posicion: datos.posicion,
    dorsal: datos.dorsal.trim(),
  }
}

export function crearJugador(jugadores, datos) {
  const nuevoJugador = {
    id: globalThis.crypto?.randomUUID?.() ?? `jugador-${Date.now()}`,
    ...validarJugador(datos),
  }
  return [nuevoJugador, ...jugadores]
}

export function editarJugador(jugadores, id, cambios) {
  const datosValidados = validarJugador(cambios)
  return jugadores.map((jugador) => jugador.id === id ? { ...jugador, ...datosValidados } : jugador)
}

export function eliminarJugador(jugadores, id) {
  return jugadores.filter((jugador) => jugador.id !== id)
}

export function buscarJugadores(jugadores, texto) {
  const busqueda = texto.trim().toLocaleLowerCase('es')
  if (!busqueda) return jugadores
  return jugadores.filter((jugador) =>
    [jugador.nombre, jugador.apellidos, jugador.equipo, jugador.posicion, jugador.dorsal]
      .join(' ')
      .toLocaleLowerCase('es')
      .includes(busqueda),
  )
}
