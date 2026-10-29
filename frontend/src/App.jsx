import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'
import Dashboard from './pages/Dashboard'

/**
 * PlaceholderPage es un componente que se muestra cuando el usuario navega a una sección que aún no está implementada.
 * Muestra un mensaje indicando que la sección está en construcción y proporciona información sobre la sección actual.
 */
function PlaceholderPage() {
  const location = useLocation()
  const name = {
    '/torneos': 'Torneos',
    '/equipos': 'Equipos',
    '/jugadores': 'Jugadores',
    '/calendario': 'Calendario y partidos',
    '/estadisticas': 'Estadísticas',
    '/arbitros': 'Árbitros',
    '/finanzas': 'Finanzas y caja',
    '/configuracion': 'Configuración'
  }[location.pathname] || 'CODEGOL'
  return <section className="placeholder-page">
    <span className="placeholder-icon"><i className="pi pi-sparkles" />
    </span><span className="section-eyebrow">CODEGOL · EN CONSTRUCCIÓN</span>
    <h1>{name}</h1><p>Esta sección formará parte de tu plataforma de gestión deportiva.</p>
    <p>Por ahora puedes explorar el dashboard y sus indicadores de demostración.</p></section>
}

export default function App() {
  return <BrowserRouter><Routes>
    <Route element={<AdminLayout />}><Route index element={<Dashboard />} />
      <Route path="torneos" element={<PlaceholderPage />} />
      <Route path="equipos" element={<PlaceholderPage />} />
      <Route path="jugadores" element={<PlaceholderPage />} />
      <Route path="calendario" element={<PlaceholderPage />} />
      <Route path="estadisticas" element={<PlaceholderPage />} />
      <Route path="arbitros" element={<PlaceholderPage />} />
      <Route path="finanzas" element={<PlaceholderPage />} />
      <Route path="configuracion" element={<PlaceholderPage />} />
      <Route path="*" element={<Dashboard />} />
    </Route>
  </Routes></BrowserRouter>
}
