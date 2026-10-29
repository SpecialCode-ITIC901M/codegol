import { useState } from 'react'
import { activity, dashboardMetrics, recentResults, upcomingMatches } from '../data/dashboardData'
import './Dashboard.css'

//** Sección de tarjetas de métricas este es el de dashboard */
function MetricCard({ metric }) {
  return <article className="metric-card"><div className={`metric-icon ${metric.tone}`}><i className={`pi ${metric.icon}`} /></div><span className="metric-menu"><i className="pi pi-ellipsis-h" /></span><p>{metric.label}</p><strong>{metric.value}</strong><small className="metric-change"><i className="pi pi-arrow-up-right" /> {metric.change}</small></article>
}

function SectionHeading({ eyebrow, title, action, onAction }) {
  return <div className="section-heading"><div><span className="section-eyebrow">{eyebrow}</span><h2>{title}</h2></div>{action && <button className="text-action" onClick={onAction}>{action}<i className="pi pi-arrow-right" /></button>}</div>
}

function MatchRow({ match }) {
  return <article className="match-row"><div className="match-time"><b>{match.time}</b><span>{match.date}</span></div><div className="match-details"><span className={`match-league-dot ${match.color}`} /><div className="match-teams"><b>{match.home}</b><span className="match-vs">VS</span><b>{match.away}</b></div><span className="match-league">{match.league}</span></div><span className="match-field"><i className="pi pi-map-marker" /> {match.field}</span><button aria-label={`Opciones de ${match.home} vs ${match.away}`} className="row-more"><i className="pi pi-ellipsis-h" /></button></article>
}

function PerformanceChart() {
  const points = [36, 54, 43, 70, 58, 47, 63, 50, 78, 65, 87, 70]
  return <div className="chart-card"><SectionHeading eyebrow="ACTIVIDAD DE LA LIGA" title="Partidos disputados" action="Ver estadísticas" onAction={() => { window.location.href = '/estadisticas' }} />
    <div className="chart-legend"><span><i className="legend-dot primary" /> Partidos jugados</span><span><i className="legend-dot pale" /> Temporada anterior</span><button aria-label="Periodo seleccionado">Últimos 12 meses <i className="pi pi-angle-down" /></button></div>
    <div className="chart-area" role="img" aria-label="Gráfico de partidos disputados, tendencia ascendente de enero a diciembre"><div className="chart-y-labels"><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span></div><div className="chart-plot"><div className="chart-grid"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 600 180" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#6255e7" stopOpacity=".17"/><stop offset="100%" stopColor="#6255e7" stopOpacity="0"/></linearGradient></defs><polyline points="0,130 55,118 109,130 164,92 218,104 273,120 327,86 382,105 436,70 491,88 545,48 600,60" fill="none" stroke="#c8c5ee" strokeWidth="2" strokeDasharray="5 6"/><polygon points={`0,180 ${points.map((p, i) => `${i * (600 / (points.length - 1))},${180 - p * 1.55}`).join(' ')} 600,180`} fill="url(#chartFill)"/><polyline points={points.map((p, i) => `${i * (600 / (points.length - 1))},${180 - p * 1.55}`).join(' ')} fill="none" stroke="#6558e8" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>{points.map((p, i) => <circle key={i} cx={i * (600 / (points.length - 1))} cy={180 - p * 1.55} r="3.5" fill="#fff" stroke="#6558e8" strokeWidth="2" />)}</svg><div className="chart-x-labels"><span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span><span>Ago</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dic</span></div></div></div>
  </div>
}

function ActivityCard() {
  return <section className="activity-card"><SectionHeading eyebrow="EN TIEMPO REAL" title="Actividad reciente" action="Ver toda" onAction={() => window.alert('La actividad completa estará disponible en una próxima versión.')} />
    <div className="activity-list">{activity.map((item) => <div className="activity-row" key={item.text}><span className={`activity-icon ${item.tone}`}><i className={`pi ${item.icon}`} /></span><div><b>{item.text}</b><small>{item.detail}</small></div><time>{item.time}</time></div>)}</div>
    <div className="activity-footer"><span className="online-dot" /> Actualizado hace unos segundos</div>
  </section>
}

export default function Dashboard() {
  const [filter, setFilter] = useState('Todos')
  const [showAllMatches, setShowAllMatches] = useState(false)
  const [showAllResults, setShowAllResults] = useState(false)
  const visibleMatches = showAllMatches ? [...upcomingMatches, ...upcomingMatches] : upcomingMatches
  const visibleResults = showAllResults ? [...recentResults, ...recentResults] : recentResults
  return <div className="dashboard">
    <div className="welcome-row"><div><div className="welcome-kicker"><span className="welcome-line" /> MARTES, 28 DE OCTUBRE, 2026</div><h1>¡Buen día, Leslie! <span>⚽</span></h1><p>Aquí tienes el resumen de lo que pasa en CODEGOL hoy.</p></div><button className="primary-button" onClick={() => window.alert('El registro de partido estará disponible próximamente.')}><i className="pi pi-plus" /> Registrar partido</button></div>
    <section className="metrics-grid" aria-label="Indicadores principales">{dashboardMetrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}</section>
    <div className="dashboard-main-grid"><section className="matches-card"><SectionHeading eyebrow="MARTES, 28 DE OCTUBRE" title="Próximos partidos" action={showAllMatches ? 'Ver menos' : 'Ver calendario'} onAction={() => setShowAllMatches(!showAllMatches)} /><div className="match-list">{visibleMatches.map((match, index) => <MatchRow key={`${match.time}-${index}`} match={match} />)}</div><button className="schedule-cta" onClick={() => window.location.href = '/calendario'}><i className="pi pi-calendar-plus" /> Abrir calendario completo <i className="pi pi-arrow-right" /></button></section><div className="right-rail"><div className="field-card"><div className="field-card-top"><span className="live-indicator"><i /> JORNADA EN CURSO</span><i className="pi pi-arrow-up-right" /></div><div className="field-card-content"><span>CANCHAS OCUPADAS</span><b>03 <small>/ 05</small></b><div className="field-progress"><i /></div><small>3 partidos en juego ahora mismo</small></div><div className="field-card-decoration"><i className="pi pi-circle" /><i className="pi pi-circle" /></div></div><div className="quick-summary"><span>ESTA SEMANA</span><div><b>18</b><small>partidos</small><i className="pi pi-chart-line" /></div><footer><span>12 completados</span><span>6 por jugar</span></footer></div></div></div>
    <div className="dashboard-lower-grid"><PerformanceChart /><ActivityCard /></div>
    <section className="results-card"><SectionHeading eyebrow="LO QUE PASÓ EN LA CANCHA" title="Resultados recientes" action={showAllResults ? 'Ver menos' : 'Todos los resultados'} onAction={() => setShowAllResults(!showAllResults)} /><div className="results-toolbar"><div className="result-filters" role="group" aria-label="Filtrar resultados">{['Todos', 'Liga Premier', 'Torneo Apertura'].map((option) => <button key={option} className={filter === option ? 'active' : ''} onClick={() => setFilter(option)}>{option}</button>)}</div><button className="export-button" onClick={() => window.alert('La exportación estará disponible próximamente.')}><i className="pi pi-download" /> Exportar</button></div><div className="results-table-wrap"><table className="results-table"><thead><tr><th>PARTIDO</th><th>TORNEO</th><th>FECHA</th><th>ESTADO</th><th /></tr></thead><tbody>{visibleResults.filter((result) => filter === 'Todos' || result.league === filter).map((result, index) => <tr key={`${result.home}-${index}`}><td><div className="result-match"><b>{result.home}</b><span className="result-score">{result.score}</span><b>{result.away}</b></div></td><td><span className="league-pill">{result.league}</span></td><td>{result.date}</td><td><span className="status-pill"><i /> {result.status}</span></td><td><button aria-label={`Opciones de ${result.home} y ${result.away}`} className="row-more"><i className="pi pi-ellipsis-h" /></button></td></tr>)}</tbody></table></div></section>
    <footer className="page-footer"><span>© 2026 CODEGOL · Gestión deportiva inteligente</span><span>Hecho para vivir el fútbol <i className="pi pi-heart-fill" /></span></footer>
  </div>
}
