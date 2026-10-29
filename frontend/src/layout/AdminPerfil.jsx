import { NavLink } from 'react-router-dom'

export default function AdminPerfil({ open, onToggle, onLogout }) {
  return <div className="popover-anchor"><button className="profile-button" aria-expanded={open} onClick={onToggle}><span className="profile-avatar">LM</span><span className="profile-copy"><b>Leslie Martínez</b><small>Administrador</small></span><i className="pi pi-angle-down profile-chevron" /></button>{open && <div className="top-popover account-popover"><b>Leslie Martínez</b><small>admin@codegol.mx</small><NavLink to="/admin/configuracion" onClick={onToggle}><i className="pi pi-cog" /> Configuración</NavLink><button onClick={onLogout}><i className="pi pi-sign-out" /> Cerrar sesión</button></div>}</div>
}
