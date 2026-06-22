import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import FloralBackground from '../components/ui/FloralBackground.jsx'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    // TODO fase 4: substituir por chamada real à API Java
    // const { data } = await api.post('/auth/login', form)
    // localStorage.setItem('velou_token', data.token)

    // Por agora simula login com qualquer email/password
    await new Promise((r) => setTimeout(r, 800))
    localStorage.setItem('velou_token', 'dev-token')
    navigate('/album')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-8)',
      }}
    >
      <FloralBackground />
      <div style={{ width: '100%', maxWidth: 380 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <Link to="/">
            <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 40 }}>
              Vel<em style={{ color: 'var(--text-secondary)' }}>ou</em>
            </h1>
          </Link>
          <div className="divider divider-center" style={{ marginTop: 'var(--space-3)' }} />
        </div>

        {/* Card de login */}
        <div
          className="card"
          style={{ padding: 'var(--space-8)' }}
        >
          <h2
            className="heading-3"
            style={{ marginBottom: 'var(--space-6)', fontWeight: 400 }}
          >
            Entrar no álbum
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
          >
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="o-vosso@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Palavra-passe"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              loading={loading}
              style={{ marginTop: 'var(--space-2)', width: '100%' }}
            >
              {loading ? 'A entrar...' : 'Entrar'}
            </Button>
          </form>
        </div>

        <p className="caption" style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)' }}>
            ← Voltar ao início
          </Link>
        </p>
      </div>
    </div>
  )
}
