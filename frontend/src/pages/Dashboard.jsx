import { useState } from 'react'
import { dashboardMetrics, recentResults, upcomingMatches } from '../data/dashboardData'
import ActivityCard from '../components/dashboard/ActivityCard'
import MatchRow from '../components/dashboard/MatchRow'
import MetricCard from '../components/dashboard/MetricCard'
import PerformanceChart from '../components/dashboard/PerformanceChart'
import ResultsTable from '../components/dashboard/ResultsTable'
import SectionHeading from '../components/dashboard/SectionHeading'
import './Dashboard.css'

function MatchSchedule({ matches }) {
  const [showAll, setShowAll] = useState(false)
  const visibleMatches = showAll ? [...matches, ...matches] : matches
  return <section className="matches-card"><SectionHeading eyebrow="MARTES, 28 DE OCTUBRE" title="Próximos partidos" action={showAll ? 'Ver menos' : 'Ver calendario'} onAction={() => setShowAll(!showAll)} /><div className="match-list">{visibleMatches.map((match, index) => <MatchRow key={`${match.time}-${index}`} match={match} />)}</div><button className="schedule-cta" onClick={() => { window.location.href = '/admin/calendario' }}><i className="pi pi-calendar-plus" /> Abrir calendario completo <i className="pi pi-arrow-right" /></button></section>
}

function FieldSummary() {
  return <div className="right-rail"><div className="field-card"><div className="field-card-top"><span className="live-indicator"><i /> JORNADA EN CURSO</span><i className="pi pi-arrow-up-right" /></div><div className="field-card-content"><span>CANCHAS OCUPADAS</span><b>03 <small>/ 05</small></b><div className="field-progress"><i /></div><small>3 partidos en juego ahora mismo</small></div><div className="field-card-decoration"><i className="pi pi-circle" /><i className="pi pi-circle" /></div></div><div className="quick-summary"><span>ESTA SEMANA</span><div><b>18</b><small>partidos</small><i className="pi pi-chart-line" /></div><footer><span>12 completados</span><span>6 por jugar</span></footer></div></div>
}

function ResultsSection() {
  const [filter, setFilter] = useState('Todos')
  const [showAll, setShowAll] = useState(false)
  const filteredResults = recentResults.filter((result) => filter === 'Todos' || result.league === filter)
  const results = showAll ? [...filteredResults, ...filteredResults] : filteredResults
  return <section className="results-card"><SectionHeading eyebrow="LO QUE PASÓ EN LA CANCHA" title="Resultados recientes" action={showAll ? 'Ver menos' : 'Todos los resultados'} onAction={() => setShowAll(!showAll)} /><div className="results-toolbar"><div className="result-filters" role="group" aria-label="Filtrar resultados">{['Todos', 'Liga Premier', 'Torneo Apertura'].map((option) => <button key={option} className={filter === option ? 'active' : ''} onClick={() => setFilter(option)}>{option}</button>)}</div><button className="export-button" onClick={() => window.alert('La exportación estará disponible próximamente.')}><i className="pi pi-download" /> Exportar</button></div><ResultsTable results={results} /></section>
}

export default function Dashboard() {
  return <div className="dashboard"><div className="welcome-row"><div><div className="welcome-kicker"><span className="welcome-line" /> MARTES, 28 DE OCTUBRE, 2026</div><h1>¡Buen día, Leslie! <span>⚽</span></h1><p>Aquí tienes el resumen de lo que pasa en CODEGOL hoy.</p></div><button className="primary-button" onClick={() => window.alert('El registro de partido estará disponible próximamente.')}><i className="pi pi-plus" /> Registrar partido</button></div>
    <section className="metrics-grid" aria-label="Indicadores principales">{dashboardMetrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}</section>
    <div className="dashboard-main-grid"><MatchSchedule matches={upcomingMatches} /><FieldSummary /></div>
    <div className="dashboard-lower-grid"><PerformanceChart /><ActivityCard /></div>
    <ResultsSection />
    <footer className="page-footer"><span>© 2026 CODEGOL · Gestión deportiva inteligente</span><span>Hecho para vivir el fútbol <i className="pi pi-heart-fill" /></span></footer>
  </div>
}
