import { useEffect, useState } from 'react'
import { obtenerEquiposDeTorneo, obtenerTorneo, obtenerTorneos } from '../../torneos/hook/torneos'

export default function useConsultaPublica() {
  const [torneos, setTorneos] = useState([])
  const [torneoId, setTorneoId] = useState('')
  const [torneo, setTorneo] = useState(null)
  const [equipos, setEquipos] = useState([])
  const [cargandoTorneos, setCargandoTorneos] = useState(true)
  const [cargandoDetalle, setCargandoDetalle] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerTorneos()
      .then((lista) => {
        setTorneos(lista)
        if (lista.length) {
          setTorneoId(String(lista[0].id))
          setCargandoDetalle(true)
        }
      })
      .catch((cause) => setError(cause.message || 'No se pudieron consultar los torneos.'))
      .finally(() => setCargandoTorneos(false))
  }, [])

  useEffect(() => {
    let vigente = true
    if (!torneoId) return () => { vigente = false }
    Promise.all([obtenerTorneo(torneoId), obtenerEquiposDeTorneo(torneoId)])
      .then(([detalle, listaEquipos]) => {
        if (!vigente) return
        setTorneo(detalle)
        setEquipos(listaEquipos)
      })
      .catch((cause) => { if (vigente) setError(cause.message || 'No se pudo consultar este torneo.') })
      .finally(() => { if (vigente) setCargandoDetalle(false) })
    return () => { vigente = false }
  }, [torneoId])

  function seleccionarTorneo(id) {
    setTorneoId(id)
    setTorneo(null)
    setEquipos([])
    setError('')
    setCargandoDetalle(Boolean(id))
  }

  return { torneos, torneoId, seleccionarTorneo, torneo, equipos, cargandoTorneos, cargandoDetalle, error }
}
