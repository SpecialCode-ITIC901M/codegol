import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import './AdminLayout.css'

//** Agrupación de enlaces del menú lateral ( reutilizar)*/
const menuGroups = [
  { label: 'GENERAL', links: [
    { to: '/', label: 'Dashboard', icon: 'pi-home' },
    { to: '/torneos', label: 'Torneos', icon: 'pi-trophy', badge: '8' },
    { to: '/equipos', label: 'Equipos', icon: 'pi-shield' },
    { to: '/jugadores', label: 'Jugadores', icon: 'pi-users' },
    { to: '/calendario', label: 'Calendario y partidos', icon: 'pi-calendar' },
    { to: '/estadisticas', label: 'Estadísticas', icon: 'pi-chart-bar' },
  ] },
  { label: 'ADMINISTRACIÓN', links: [
    { to: '/arbitros', label: 'Árbitros', icon: 'pi-stopwatch' },
    { to: '/finanzas', label: 'Finanzas y caja', icon: 'pi-wallet' },
  ] },
]

const sectionNames = { '/': 'Dashboard', '/torneos': 'Torneos', '/equipos': 'Equipos', '/jugadores': 'Jugadores', '/calendario': 'Calendario y partidos', '/estadisticas': 'Estadísticas', '/arbitros': 'Árbitros', '/finanzas': 'Finanzas y caja', '/configuracion': 'Configuración' }

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const location = useLocation()
  const title = sectionNames[location.pathname] || 'Dashboard'

  return (
    <div className={`admin-shell ${collapsed ? 'sidebar-collapsed' : ''} ${mobileOpen ? 'mobile-sidebar-open' : ''}`}>
      {mobileOpen && <button aria-label="Cerrar menú" className="mobile-scrim" onClick={() => setMobileOpen(false)} />}
      <aside className="sidebar">
        <NavLink to="/" className="brand" aria-label="CODEGOL inicio" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark"><i className="pi pi-bolt" /></span>
          <span className="brand-name">CODE<span>GOL</span><small>SPORTS MANAGEMENT</small></span>
          <span className="brand-version">PRO</span>
        </NavLink>
        <div className="club-switcher"><span className="club-avatar">CG</span><span className="club-copy"><b>Complejo CODEGOL</b><small>Administración</small></span><i className="pi pi-angle-down" /></div>
        <nav className="side-nav" aria-label="Navegación principal">
          {menuGroups.map((group) => <div className="nav-group" key={group.label}>
            <p className="nav-label">{group.label}</p>
            {group.links.map((link) => <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title={collapsed ? link.label : undefined}>
              <i className={`pi ${link.icon}`} /><span>{link.label}</span>{link.badge && <b className="nav-badge">{link.badge}</b>}
            </NavLink>)}
          </div>)}
        </nav>
        <div className="sidebar-bottom"><NavLink to="/configuracion" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}><i className="pi pi-cog" /><span>Configuración</span></NavLink>
          <div className="sidebar-help"><span className="help-icon"><i className="pi pi-question-circle" /></span><div><b>¿Necesitas ayuda?</b><small>Visita nuestro centro de soporte</small></div><button aria-label="Abrir soporte"><i className="pi pi-arrow-up-right" /></button></div>
          <div className="sidebar-footer"><span className="online-dot" /> Todos los sistemas operativos <span className="footer-version">v1.0.0</span></div>
        </div>
      </aside>
      <div className="main-column">
        <header className="topbar">
          <div className="topbar-start"><button className="icon-button sidebar-toggle" aria-label="Contraer o expandir menú" onClick={() => { if (window.innerWidth <= 760) setMobileOpen(!mobileOpen); else setCollapsed(!collapsed) }}><i className="pi pi-bars" /></button><span className="topbar-divider" /><div className="breadcrumb"><span>CODEGOL</span><i className="pi pi-angle-right" /><b>{title}</b></div></div>
          <div className="topbar-actions"><span className="today-label"><i className="pi pi-calendar" /> Martes, 28 de octubre de 2026</span>
            <div className="popover-anchor"><button className={`icon-button notification-button ${notificationsOpen ? 'selected' : ''}`} aria-label="Notificaciones" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen(!notificationsOpen); setMenuOpen(false) }}><i className="pi pi-bell" /><span className="notification-dot" /></button>{notificationsOpen && <div className="top-popover notifications-popover"><b>Notificaciones</b><p><i className="pi pi-calendar" /> Tienes 3 partidos programados para hoy.</p><p><i className="pi pi-user-plus" /> 4 solicitudes de registro pendientes.</p><button onClick={() => setNotificationsOpen(false)}>Entendido</button></div>}</div>
            <span className="topbar-divider profile-divider" /><div className="popover-anchor"><button className="profile-button" aria-expanded={menuOpen} onClick={() => { setMenuOpen(!menuOpen); setNotificationsOpen(false) }}><span className="profile-avatar">LM</span><span className="profile-copy"><b>Leslie Martínez</b><small>Administrador</small></span><i className="pi pi-angle-down profile-chevron" /></button>{menuOpen && <div className="top-popover account-popover"><b>Leslie Martínez</b><small>admin@codegol.mx</small><NavLink to="/configuracion" onClick={() => setMenuOpen(false)}><i className="pi pi-cog" /> Configuración</NavLink><button onClick={() => setMenuOpen(false)}><i className="pi pi-sign-out" /> Cerrar menú de cuenta</button></div>}</div>
          </div>
        </header>
        <main className="page-content"><Outlet /></main>
      </div>
    </div>
  )
}
