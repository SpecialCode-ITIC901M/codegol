import { useState } from 'react'
import useTorneos from './hook/useTorneos'
import './Torneos.css'
import './TorneosSummary.css'

function fechaCorta(value) {
  if (!value) return 'Sin fecha de cierre'
  return new Date(`${value}T00:00:00`).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
}

function EstadoMensaje({ error, mensaje }) {
  if (error) return <p className="tournament-alert is-error" role="alert"><i className="pi pi-exclamation-circle" />{error}</p>
  if (mensaje) return <p className="tournament-alert is-success" role="status"><i className="pi pi-check-circle" />{mensaje}</p>
  return null
}

export default function Torneos() {
  const data = useTorneos()
  const [errorLocal, setErrorLocal] = useState('')
  const torneoActual = data.torneoDetalle || data.torneos.find((torneo) => String(torneo.id) === data.torneoSeleccionado)

  function enviarCategoria(event) {
    event.preventDefault(); setErrorLocal('')
    const form = new FormData(event.currentTarget)
    data.guardarCategoria({ nombre: form.get('nombre'), descripcion: form.get('descripcion') })
    event.currentTarget.reset()
  }

  function enviarTorneo(event) {
    event.preventDefault(); setErrorLocal('')
    const form = new FormData(event.currentTarget)
    data.guardarTorneo({ nombre: form.get('nombre'), descripcion: form.get('descripcion'), categoriaId: form.get('categoriaId'), fechaInicio: form.get('fechaInicio'), fechaFin: form.get('fechaFin'), estado: form.get('estado') })
    event.currentTarget.reset()
  }

  function enviarEquipo(event) {
    event.preventDefault(); setErrorLocal('')
    const form = new FormData(event.currentTarget)
    data.guardarEquipo({ nombre: form.get('nombre'), delegado: form.get('delegado'), telefono: form.get('telefono'), logoUrl: form.get('logoUrl'), pagoInscripcionCubierto: form.get('pagoInscripcionCubierto') === 'on' })
    event.currentTarget.reset()
  }

  return <main className="tournaments-page">
    <header className="tournaments-heading"><div><span className="tournaments-eyebrow">· ADMINISTRACIÓN DE COMPETENCIAS</span><h1>Torneos y categorías</h1><p>Crea categorías, organiza torneos e inscribe equipos.</p></div><button className="tournament-refresh" onClick={data.recargar} disabled={data.cargando}><i className={`pi ${data.cargando ? 'pi-spin pi-spinner' : 'pi pi-refresh'}`} /> Actualizar</button></header>
    <EstadoMensaje error={errorLocal || data.error} mensaje={data.mensaje} />
    {data.cargando && <div className="tournaments-loading"><i className="pi pi-spin pi-spinner" /> Consultando el backend…</div>}
    <section className="tournament-summary" aria-label="Resumen de torneos"><article><i className="pi pi-tags" /><span>Categorías</span><b>{data.categorias.length}</b></article><article><i className="pi pi-trophy" /><span>Torneos</span><b>{data.torneos.length}</b></article><article><i className="pi pi-shield" /><span>Equipos registrados</span><b>{data.equipos.length}</b></article><article><i className="pi pi-users" /><span>Inscritos en torneo</span><b>{data.equiposInscritos.length}</b></article></section>

    <section className="tournament-panel category-panel"><div className="tournament-panel-heading"><span className="panel-icon teal-icon"><i className="pi pi-tags" /></span><div><h2>Categorías</h2><p>Las categorías disponibles para crear torneos.</p></div><span className="count-chip">{data.categorias.length}</span></div>
      <div className="category-content"><div className="category-list">{data.categorias.length ? data.categorias.map((categoria) => <article className="category-item" key={categoria.id ?? categoria.nombre}><span className="category-bullet"><i className="pi pi-tag" /></span><div><b>{categoria.nombre}</b><small>{categoria.descripcion || 'Sin descripción'}</small></div><span className={`active-chip ${categoria.activa === false ? 'inactive' : ''}`}>{categoria.activa === false ? 'Inactiva' : 'Activa'}</span></article>) : <p className="tournament-empty-inline">Aún no hay categorías registradas.</p>}</div>
        <form className="compact-form category-form" onSubmit={enviarCategoria}><h3>Crear categoría</h3><label>Nombre<input name="nombre" required maxLength="50" placeholder="Ej. Libre varonil" /></label><label>Descripción <span>(opcional)</span><input name="descripcion" placeholder="Descripción breve" /></label><button className="tournament-primary" disabled={data.guardando}><i className="pi pi-plus" /> Crear categoría</button></form></div>
    </section>

    <section className="tournament-panel"><div className="tournament-panel-heading"><span className="panel-icon orange-icon"><i className="pi pi-trophy" /></span><div><h2>Torneos</h2><p>Selecciona un torneo para revisar sus equipos inscritos.</p></div><span className="count-chip">{data.torneos.length}</span></div>
      <div className="tournament-workspace"><div className="tournament-list">{data.torneos.length ? data.torneos.map((torneo) => <button key={torneo.id} className={`tournament-list-item ${String(torneo.id) === data.torneoSeleccionado ? 'selected' : ''}`} onClick={() => data.seleccionarTorneo(String(torneo.id))}><span className="tournament-item-icon"><i className="pi pi-flag" /></span><span className="tournament-item-copy"><b>{torneo.nombre}</b><small>{torneo.categoria?.nombre || 'Sin categoría'} · {torneo.estado?.replaceAll('_', ' ') || 'Sin estado'}</small></span><i className="pi pi-angle-right" /></button>) : <p className="tournament-empty-inline">Todavía no hay torneos. Puedes crear el primero aquí.</p>}</div>
        <form className="compact-form tournament-form" onSubmit={enviarTorneo}><h3>Crear torneo</h3><label>Nombre del torneo<input name="nombre" required maxLength="100" placeholder="Ej. Copa CODEGOL 2026" /></label><label>Categoría<select name="categoriaId" required defaultValue=""><option value="" disabled>Selecciona una categoría</option>{data.categorias.map((categoria) => <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>)}</select></label><div className="form-two-columns"><label>Fecha de inicio<input type="date" name="fechaInicio" required /></label><label>Fecha de cierre<input type="date" name="fechaFin" /></label></div><label>Estado<select name="estado" defaultValue="EN_INSCRIPCION"><option value="EN_INSCRIPCION">En inscripción</option><option value="EN_PROGRESO">En progreso</option><option value="FINALIZADO">Finalizado</option><option value="CANCELADO">Cancelado</option></select></label><label>Descripción <span>(opcional)</span><textarea name="descripcion" rows="2" placeholder="Detalles del torneo" /></label><button className="tournament-primary" disabled={data.guardando || !data.categorias.length}><i className="pi pi-plus" /> Crear torneo</button>{!data.categorias.length && <small className="form-help">Primero registra una categoría para habilitar la creación de torneos.</small>}</form></div>
    </section>

    {torneoActual && <section className="tournament-panel selected-tournament-panel"><div className="tournament-panel-heading"><span className="panel-icon teal-icon"><i className="pi pi-shield" /></span><div><h2>{torneoActual.nombre}</h2><p>{torneoActual.categoria?.nombre || 'Categoría sin indicar'} · {torneoActual.estado?.replaceAll('_', ' ') || 'Estado sin indicar'}</p></div><span className="count-chip">{data.equiposInscritos.length} equipos</span></div><div className="selected-tournament-meta"><span><i className="pi pi-calendar" /> {fechaCorta(torneoActual.fechaInicio)} — {fechaCorta(torneoActual.fechaFin)}</span><p>{torneoActual.descripcion || 'Este torneo no tiene descripción.'}</p></div>
        <div className="registered-teams"><h3>Equipos inscritos</h3>{data.equiposInscritos.length ? <div className="registered-team-list">{data.equiposInscritos.map((equipo) => <article key={equipo.id} className="registered-team"><span className="team-avatar"><i className="pi pi-shield" /></span><div><b>{equipo.nombre}</b><small>{equipo.delegado || 'Delegado pendiente'}{equipo.telefono ? ` · ${equipo.telefono}` : ''}</small></div><span className={`payment-chip ${equipo.pagoInscripcionCubierto ? 'paid' : ''}`}>{equipo.pagoInscripcionCubierto ? 'Pago cubierto' : 'Pago pendiente'}</span></article>)}</div> : <p className="tournament-empty-inline">Este torneo aún no tiene equipos inscritos.</p>}</div>
        <form className="compact-form team-form" onSubmit={enviarEquipo}><h3>Inscribir equipo</h3><div className="team-form-grid"><label>Nombre del equipo<input name="nombre" required maxLength="100" placeholder="Ej. Deportivo Central" /></label><label>Nombre del delegado<input name="delegado" maxLength="100" placeholder="Ej. Ana López" /></label><label>Teléfono<input name="telefono" maxLength="20" type="tel" placeholder="Teléfono de contacto" /></label><label>Logo (URL) <span>(opcional)</span><input name="logoUrl" type="url" placeholder="https://…" /></label><label className="checkbox-label"><input type="checkbox" name="pagoInscripcionCubierto" /> Pago de inscripción cubierto</label></div><button className="tournament-primary" disabled={data.guardando}><i className="pi pi-user-plus" /> Inscribir equipo</button></form>
      </section>}
    <p className="tournament-scope-note"><i className="pi pi-info-circle" /> El calendario automático y la prevención de traslapes no están disponibles todavía en la API.</p>
  </main>
}
