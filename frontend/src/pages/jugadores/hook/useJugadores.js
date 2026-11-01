import { useEffect, useMemo, useState } from 'react'
import { buscarJugadores, crearJugador, editarJugador, eliminarJugador } from './jugador'

const STORAGE_KEY = 'codegol-jugadores-demo'
const formularioVacio = { nombre: '', apellidos: '', equipo: '', posicion: 'Delantero', dorsal: '' }

function leerJugadores() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export default function useJugadores() {
  const [jugadores, setJugadores] = useState(leerJugadores)
  const [busqueda, setBusqueda] = useState('')
  const [formulario, setFormulario] = useState(formularioVacio)
  const [jugadorEnEdicion, setJugadorEnEdicion] = useState(null)
  const [formularioAbierto, setFormularioAbierto] = useState(false)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jugadores))
  }, [jugadores])

  const jugadoresVisibles = useMemo(() => buscarJugadores(jugadores, busqueda), [jugadores, busqueda])

  function cambiarCampo(event) {
    const { name, value } = event.target
    setFormulario((actual) => ({ ...actual, [name]: value }))
  }

  function abrirFormulario(jugador = null) {
    setJugadorEnEdicion(jugador)
    setFormulario(jugador ? { ...jugador } : formularioVacio)
    setMensaje('')
    setFormularioAbierto(true)
  }

  function cerrarFormulario() {
    setFormularioAbierto(false)
    setJugadorEnEdicion(null)
    setFormulario(formularioVacio)
    setMensaje('')
  }

  function guardarJugador(event) {
    event.preventDefault()
    try {
      if (jugadorEnEdicion) {
        setJugadores(editarJugador(jugadores, jugadorEnEdicion.id, formulario))
      } else {
        setJugadores(crearJugador(jugadores, formulario))
      }
      cerrarFormulario()
    } catch (error) {
      setMensaje(error.message)
    }
  }

  function quitarJugador(id) {
    setJugadores(eliminarJugador(jugadores, id))
  }

  return {
    jugadores,
    jugadoresVisibles,
    busqueda,
    setBusqueda,
    formulario,
    formularioAbierto,
    jugadorEnEdicion,
    mensaje,
    cambiarCampo,
    abrirFormulario,
    cerrarFormulario,
    guardarJugador,
    quitarJugador,
  }
}
