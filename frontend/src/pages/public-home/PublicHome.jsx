import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import codegolLogo from '../../assets/codegol-logo.jpeg'
import AssistantBubble from '../../components/public/AssistantBubble'
import FootballCarousel from '../../components/public/FootballCarousel'
import PublicThemeToggle from '../../components/public/PublicThemeToggle'
import ConsultaPublica from '../consulta-publica/ConsultaPublica'
import './PublicHome.css'

const destinations = [
  { id: 'quienes-somos', icon: 'pi-users', label: 'QUIÉNES SOMOS', title: 'El fútbol nos une', text: 'Somos CODEGOL: una plataforma creada para que cada liga y cada equipo vivan mejor su pasión.', action: 'Conócenos', href: '#quienes-somos' },
  { id: 'caracteristicas', icon: 'pi-bolt', label: 'CARACTERÍSTICAS', title: 'Todo el torneo en juego', text: 'Organiza torneos, equipos, jugadores, calendarios y estadísticas desde un mismo lugar.', action: 'Descubre CODEGOL', href: '#caracteristicas' },
  { id: 'comunidad', icon: 'pi-map-marker', label: 'ENCUÉNTRANOS', title: 'La cancha es de todos', text: 'Acércate a nuestra comunidad, síguenos en redes y mantente al día con cada jornada.', action: 'Ubicación y redes', href: '#ubicacion' },
]

export default function PublicHome() {
  const [theme, setTheme] = useState(() => localStorage.getItem('codegol-public-theme') || 'light')
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/consulta-publica') {
      window.requestAnimationFrame(() => document.getElementById('consulta-publica')?.scrollIntoView({ block: 'start' }))
    }
  }, [location.pathname])
  const toggleTheme = () => setTheme((current) => { const next = current === 'dark' ? 'light' : 'dark'; localStorage.setItem('codegol-public-theme', next); return next })
  return <main className="home-page" data-theme={theme}>
    <header className="home-header"><Link to="/" className="home-brand"><img src={codegolLogo} alt="" /><span>CODE<span>GOL</span></span></Link><nav aria-label="Navegación principal"><a href="#quienes-somos">Quiénes somos</a><a href="#caracteristicas">Características</a><a href="#comunidad-redes">Contacto</a><a href="#consulta-publica">Consulta pública</a></nav><div className="home-header-actions"><PublicThemeToggle theme={theme} onToggle={toggleTheme} /><Link to="/login" className="home-admin"><i className="pi pi-lock" /> Acceso administrador</Link></div></header>
    <section className="home-hero" aria-label="Bienvenida a CODEGOL">
      <div className="home-hero-copy"><span className="home-eyebrow"><i className="pi pi-circle-fill" /> TU CANCHA, TU LIGA, TU HISTORIA</span><h1>El fútbol se vive.<br /><span>CODEGOL lo organiza.</span></h1><p>La pasión de tu torneo, conectada en un solo lugar.</p><div className="home-hero-actions"><a className="home-primary-action" href="#quienes-somos">Conoce CODEGOL <i className="pi pi-arrow-down" /></a><a className="home-secondary-action" href="#consulta-publica"><i className="pi pi-globe" /> Consulta pública</a></div></div>
      <div className="home-stadium" aria-hidden="true"><div className="stadium-lights" /><div className="stadium-crowd" /><div className="stadium-fans">{Array.from({ length: 48 }, (_, index) => <span className="stadium-fan" key={index} style={{ left: `${6 + (index % 16) * 5.8}%`, top: `${4 + Math.floor(index / 16) * 28 + (index % 3)}%`, '--fan-color': ['#f3b66e', '#e9eee0', '#61d2ba', '#92bfff'][index % 4], '--seat-color': ['#4377a7', '#3d8e80', '#b8784f', '#65749a'][index % 4] }}><b /><i className="fan-person"><em /><em /></i></span>)}</div><div className="stadium-beam" /><div className="stadium-pitch"><div className="pitch-outline"><span className="pitch-halfway" /><span className="pitch-center" /><span className="pitch-box left" />
      <span className="pitch-box right" /></div>
      <div className="stadium-goal"><span /><i />
      </div><div className="stadium-confetti">{Array.from({ length: 16 }, (_, index) => <i key={index} />)}</div>
      <span className="stadium-player"><i /><b /><em />
      </span><span className="animated-ball">
        <svg className="soccer-ball-art" viewBox="0 0 100 100" focusable="false">
          <defs><radialGradient id="soccer-ball-shade" cx="33%" cy="27%" r="75%">
            <stop offset="0" stopColor="#fff" /><stop offset=".72" stopColor="#f4f4e9" />
            <stop offset="1" stopColor="#b9c0b8" />
            </radialGradient><clipPath id="soccer-ball-clip"><circle cx="50" cy="50" r="47" /></clipPath></defs><circle cx="50" cy="50" r="47" fill="url(#soccer-ball-shade)" stroke="#152923" strokeWidth="3" /><g clipPath="url(#soccer-ball-clip)" fill="none" stroke="#172b25" strokeWidth="3.1" strokeLinejoin="round"><path d="M50 32 66 43 60 62 40 62 34 43Z" fill="#172b25" /><path d="M50 32 50 3M66 43 96 33M60 62 80 91M40 62 20 91M34 43 4 33" /><path d="M50 3 66 8 76 22 66 43M96 33 91 50 96 67 78 76 60 62M80 91 64 97 50 83 40 62M20 91 22 76 4 67 9 50 4 33M34 43 24 22 34 8 50 3" /></g><ellipse cx="34" cy="25" rx="12" ry="7" fill="#fff" opacity=".28" /></svg></span></div></div>
     
    </section>
    <FootballCarousel />
    <ConsultaPublica theme={theme} />
    <section className="home-destinations" aria-label="Explora CODEGOL">{destinations.map((item, index) => <article id={item.id} key={item.id} className="home-destination"><span className="destination-number">0{index + 1}</span><span className="destination-icon"><i className={`pi ${item.icon}`} /></span><span className="destination-label">{item.label}</span><h2>{item.title}</h2><p>{item.text}</p><a href={item.href}>{item.action}<i className="pi pi-arrow-right" /></a></article>)}</section>
    <section className="home-community" id="ubicacion"><div><span className="destination-label">ENCUÉNTRANOS</span><h2>La cancha es de todos</h2><p>Consulta nuestra ubicación y ven a vivir cada jornada.</p></div><div className="home-community-links"><a href="https://maps.google.com/?q=CODEGOL" target="_blank" rel="noreferrer"><i className="pi pi-map-marker" /> Dónde nos ubicamos</a></div></section>
    <section className="home-public-cta"><span className="home-cta-icon"><i className="pi pi-trophy" /></span><div><span className="destination-label">LA AFICIÓN TAMBIÉN JUEGA</span><h2>¿Buscas resultados y equipos?</h2><p>Consulta los torneos disponibles y sus equipos inscritos.</p></div><a href="#consulta-publica">Ir a la consulta pública <i className="pi pi-arrow-right" /></a></section>
    <footer className="home-footer" id="comunidad-redes"><div className="home-footer-social"><span className="destination-label">SÍGUENOS EN REDES</span><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="pi pi-instagram" /></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="pi pi-facebook" /></a>
    </div><Link to="/" className="home-brand">
    <span>CODE<span>GOL</span></span></Link><span>© 2026 CODEGOL · Gestión deportiva inteligente</span></footer><AssistantBubble />
  </main>
}
