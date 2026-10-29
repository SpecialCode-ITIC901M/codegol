import ThemeToggle from './ThemeToggle'
import AdminPerfil from './AdminPerfil'

const sectionNames = { '/admin': 'Dashboard', '/admin/torneos': 'Torneos', '/admin/equipos': 'Equipos', '/admin/jugadores': 'Jugadores', '/admin/calendario': 'Calendario y partidos', '/admin/estadisticas': 'Estadísticas', '/admin/arbitros': 'Árbitros', '/admin/finanzas': 'Finanzas y caja', '/admin/configuracion': 'Configuración' }

export default function TopBar({ location, theme, onThemeToggle, onMenuToggle, notificationsOpen, onNotificationsToggle, accountOpen, onAccountToggle, onLogout }) {
  const title = sectionNames[location.pathname] || 'Dashboard'
  return <header className="topbar"><div className="topbar-start"><button className="icon-button sidebar-toggle" aria-label="Contraer o expandir menú" onClick={onMenuToggle}><i className="pi pi-bars" /></button><span className="topbar-divider" /><div className="breadcrumb"><span>CODEGOL</span><i className="pi pi-angle-right" /><b>{title}</b></div></div>
    <div className="topbar-actions"><span className="today-label"><i className="pi pi-calendar" /> Martes, 28 de octubre de 2026</span><ThemeToggle theme={theme} onToggle={onThemeToggle} />
      <div className="popover-anchor"><button className={`icon-button notification-button ${notificationsOpen ? 'selected' : ''}`} aria-label="Notificaciones" aria-expanded={notificationsOpen} onClick={onNotificationsToggle}><i className="pi pi-bell" /><span className="notification-dot" /></button>{notificationsOpen && <div className="top-popover notifications-popover"><b>Notificaciones</b><p><i className="pi pi-calendar" /> Tienes 3 partidos programados para hoy.</p><p><i className="pi pi-user-plus" /> 4 solicitudes de registro pendientes.</p><button onClick={onNotificationsToggle}>Entendido</button></div>}</div>
      <span className="topbar-divider profile-divider" /><AdminPerfil open={accountOpen} onToggle={onAccountToggle} onLogout={onLogout} />
    </div></header>
}
