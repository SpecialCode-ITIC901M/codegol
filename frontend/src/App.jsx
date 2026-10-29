import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'
import Dashboard from './pages/Dashboard'
import Torneos from './pages/torneos'
import Equipos from './pages/equipos'
import Jugadores from './pages/jugadores'
import Calendario from './pages/calendario'
import Estadisticas from './pages/estadisticas'
import Arbitros from './pages/arbitros'
import Finanzas from './pages/finanzas'
import Configuracion from './pages/configuracion'
import Login from './pages/login/Login'

function ProtectedAdmin() {
  if (localStorage.getItem('codegol-session') !== 'demo') return <Navigate to="/" replace />
  return <AdminLayout />
}

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin" element={<ProtectedAdmin />}>
      <Route index element={<Dashboard />} />
      <Route path="torneos" element={<Torneos />} />
      <Route path="equipos" element={<Equipos />} />
      <Route path="jugadores" element={<Jugadores />} />
      <Route path="calendario" element={<Calendario />} />
      <Route path="estadisticas" element={<Estadisticas />} />
      <Route path="arbitros" element={<Arbitros />} />
      <Route path="finanzas" element={<Finanzas />} />
      <Route path="configuracion" element={<Configuracion />} />
      <Route path="*" element={<Dashboard />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></BrowserRouter>
}
