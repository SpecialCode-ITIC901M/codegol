import { Link } from 'react-router-dom'
import codegolLogo from '../../assets/codegol-logo.jpeg'
import useConsultaPublica from './hook/useConsultaPublica'
import './ConsultaPublica.css'

function mostrarFecha(fecha) {
  if (!fecha) return 'Por definir'
  return new Date(`${fecha}T00:00:00`).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ConsultaPublica() {
  const consulta = useConsultaPublica()
  return <main className="public-page"><header className="public-header"><Link to="/" className="public-brand"><img src={codegolLogo} alt="" /><span>CODE<span>GOL</span></span></Link><Link to="/" className="public-login-link">Acceso administrador <i className="pi pi-arrow-up-right" /></Link></header>
    <section className="public-hero"><div className="public-hero-copy"><span className="public-eyebrow"><i className="pi pi-circle-fill" /> INFORMACIÓN ABIERTA PARA TODOS</span><h1>El torneo se vive<br />en la cancha. <span>Y aquí.</span></h1><p>Consulta los torneos y conoce sus equipos inscritos.</p></div><div className="public-ball-art"><i className="pi pi-globe" /></div></section>
    <section className="public-content"><div className="public-selector-row"><div><span className="public-section-eyebrow">CONSULTA DE TORNEOS</span><h2>¿Qué torneo quieres ver?</h2></div><label className="public-select-wrap"><i className="pi pi-trophy" /><select value={consulta.torneoId} onChange={(event) => consulta.seleccionarTorneo(event.target.value)} disabled={consulta.cargandoTorneos || !consulta.torneos.length}><option value="">Selecciona un torneo</option>{consulta.torneos.map((torneo) => <option key={torneo.id} value={torneo.id}>{torneo.nombre}</option>)}</select><i className="pi pi-chevron-down" /></label></div>
      {consulta.error && <p className="public-error" role="alert"><i className="pi pi-exclamation-circle" />{consulta.error}</p>}
      {(consulta.cargandoTorneos || consulta.cargandoDetalle) && <div className="public-loading"><i className="pi pi-spin pi-spinner" /> Cargando información…</div>}
      {!consulta.cargandoTorneos && !consulta.torneos.length && !consulta.error && <div className="public-empty"><span><i className="pi pi-calendar-times" /></span><h3>Aún no hay torneos disponibles</h3><p>Cuando se publiquen torneos podrás consultarlos desde aquí.</p></div>}
      {!consulta.cargandoDetalle && consulta.torneo && <><article className="public-tournament-card"><div className="public-tournament-top"><span className="public-trophy-icon"><i className="pi pi-trophy" /></span><span className="public-status">{consulta.torneo.estado?.replaceAll('_', ' ') || 'ESTADO POR DEFINIR'}</span></div><div className="public-category">{consulta.torneo.categoria?.nombre || 'Categoría'}</div><h3>{consulta.torneo.nombre}</h3><p className="public-description">{consulta.torneo.descripcion || 'Sin descripción disponible.'}</p><div className="public-tournament-meta"><span><i className="pi pi-calendar" /><b>Inicio</b>{mostrarFecha(consulta.torneo.fechaInicio)}</span><span><i className="pi pi-calendar-plus" /><b>Cierre</b>{mostrarFecha(consulta.torneo.fechaFin)}</span><span><i className="pi pi-users" /><b>Equipos inscritos</b>{consulta.equipos.length}</span></div></article>
        <section className="public-teams-section"><div className="public-teams-heading"><div><span className="public-section-eyebrow">PARTICIPANTES</span><h2>Equipos inscritos</h2></div><span className="public-team-count">{consulta.equipos.length} equipos</span></div>{consulta.equipos.length ? <div className="public-teams-grid">{consulta.equipos.map((equipo) => <article key={equipo.id} className="public-team-card">{equipo.logoUrl ? <img src={equipo.logoUrl} alt={`Escudo de ${equipo.nombre}`} /> : <span className="public-team-avatar"><i className="pi pi-shield" /></span>}<div><h3>{equipo.nombre}</h3><p>{equipo.torneoNombre || consulta.torneo.nombre}</p></div></article>)}</div> : <div className="public-no-teams"><i className="pi pi-info-circle" /> Aún no se han inscrito equipos en este torneo.</div>}</section></>}
      <aside className="public-pending-note"><i className="pi pi-info-circle" /><div><b>Más información próximamente</b><p>La API aún no ofrece tablas de posiciones, rol de juegos ni tabla de goleo.</p></div></aside>
    </section><footer className="public-footer"><span>© 2026 CODEGOL · Gestión deportiva inteligente</span><Link to="/">CODEGOL</Link></footer>
  </main>
}
