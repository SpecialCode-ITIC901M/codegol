import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import codegolLogo from '../../assets/codegol-logo.jpeg'
import './Login.css'

export default function Login() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  if (localStorage.getItem('codegol-session') === 'demo') return <Navigate to="/admin" replace />

  function handleSubmit(event) {
    event.preventDefault()
    if (user.trim() === '123' && password === '123') {
      localStorage.setItem('codegol-session', 'demo')
      navigate('/admin', { replace: true })
      return
    }
    setError('El usuario y la contraseña de prueba son 123.')
  }

  return <main className="login-page"><section className="login-card"><div className="login-brand"><span className="login-brand-mark"><i className="pi pi-bolt" /></span><span>CODE<span>GOL</span></span></div><div className="login-heading"><span className="login-eyebrow">GESTIÓN DEPORTIVA</span><h1>¡Qué bueno verte!</h1><p>Inicia sesión para continuar a tu espacio de administración.</p></div>
    <form onSubmit={handleSubmit} className="login-form"><label htmlFor="username">Usuario</label><div className="login-input-wrap"><i className="pi pi-user" /><input id="username" autoComplete="username" value={user} onChange={(event) => { setUser(event.target.value); setError('') }} placeholder="Escribe tu usuario" /></div><label htmlFor="password">Contraseña</label><div className="login-input-wrap"><i className="pi pi-lock" /><input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setError('') }} placeholder="Escribe tu contraseña" /></div>{error && <p className="login-error" role="alert"><i className="pi pi-exclamation-circle" />{error}</p>}<button className="login-submit" type="submit">Entrar al panel <i className="pi pi-arrow-right" /></button></form>
    <div className="demo-hint"><i className="pi pi-info-circle" /><span><b>Acceso de prueba</b><br />Usuario y contraseña: <strong>123</strong></span></div><footer className="login-footer">© 2026 CODEGOL · Tu complejo, más conectado.</footer></section><aside className="login-art"><img className="login-logo-image" src={codegolLogo} alt="Logo de CODEGOL" /><div className="login-art-overlay" /><div className="login-art-circle circle-one" /><div className="login-art-circle circle-two" /><div className="login-art-content"><span className="login-art-tag"><i className="pi pi-circle-fill" /> TU CANCHA, TU LIGA, TU HISTORIA</span><h2>El fútbol se vive.<br /><span>CODEGOL lo organiza.</span></h2><p>Todo lo que pasa en tu complejo, en un solo lugar.</p><div className="login-stat-row"><div><b>01</b><span>COMUNIDAD</span></div><i /><div><b>90′</b><span>DE PURA PASIÓN</span></div></div></div><div className="login-pitch"><div className="pitch-circle" /><div className="pitch-midline" /><div className="pitch-box pitch-box-left" /><div className="pitch-box pitch-box-right" /></div><span className="login-art-caption">CODEGOL · PLATAFORMA DE GESTIÓN DEPORTIVA</span></aside></main>
}
