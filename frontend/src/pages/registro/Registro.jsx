import { useState } from 'react'
import { registrarUsuario } from '../../database/auth'
import './Registro.css'

export default function Registro() {
  const [form, setForm] = useState({ nombreCompleto: '', username: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [saving, setSaving] = useState(false)

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setError('')
    setSuccess('')
  }

  async function submit(event) {
    event.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    setSaving(true)
    try {
      await registrarUsuario(form)
      setSuccess(`La cuenta de ${form.username.trim()} se registró correctamente.`)
      setForm({ nombreCompleto: '', username: '', email: '', password: '', confirmPassword: '' })
      setSaving(false)
    } catch (registrationError) {
      const message = registrationError.status === 403
        ? 'El backend rechazó el registro (403). Tu sesión no tiene permiso para registrar usuarios.'
        : registrationError.status === 409
          ? 'Ese usuario o correo ya está registrado.'
          : registrationError.status
            ? registrationError.message || `El backend rechazó el registro (${registrationError.status}).`
            : 'No se pudo conectar con el backend local. Revisa que esté encendido en localhost:8080.'
      setError(message)
      setSaving(false)
    }
  }

  return <section className="register-admin-page">
    <header className="register-page-heading"><div><span>ADMINISTRACIÓN · USUARIOS</span><h1>Registrar usuario</h1><p>Crea una cuenta para acceder a CODEGOL.</p></div></header>
    <section className="register-admin-card">
      <div className="register-notice"><i className="pi pi-info-circle" /><span>La cuenta se enviará al backend CODEGOL con el rol de administrador.</span></div>
      <form className="register-form" onSubmit={submit}>
        <div className="register-form-grid">
          <label htmlFor="nombreCompleto">Nombre completo<input id="nombreCompleto" name="nombreCompleto" autoComplete="name" required maxLength={100} value={form.nombreCompleto} onChange={update} placeholder="Tu nombre" /></label>
          <label htmlFor="registerUsername">Nombre de usuario<input id="registerUsername" name="username" autoComplete="username" required minLength={4} maxLength={50} value={form.username} onChange={update} placeholder="Por ejemplo: lesli_admin" /></label>
          <label htmlFor="registerEmail">Correo electrónico<input id="registerEmail" name="email" type="email" autoComplete="email" required maxLength={100} value={form.email} onChange={update} placeholder="tu@correo.com" /></label>
          <label htmlFor="registerPassword">Contraseña<input id="registerPassword" name="password" type="password" autoComplete="new-password" required minLength={6} value={form.password} onChange={update} placeholder="Mínimo 6 caracteres" /></label>
          <label htmlFor="confirmPassword">Confirma tu contraseña<input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required value={form.confirmPassword} onChange={update} placeholder="Escríbela de nuevo" /></label>
        </div>
        {error && <p className="register-error" role="alert"><i className="pi pi-exclamation-circle" />{error}</p>}
        {success && <p className="register-success" role="status"><i className="pi pi-check-circle" />{success}</p>}
        <div className="register-form-actions"><button className="register-submit" type="submit" disabled={saving}><i className="pi pi-user-plus" />{saving ? 'Registrando…' : 'Registrar usuario'}</button></div>
      </form>
    </section>
  </section>
}
