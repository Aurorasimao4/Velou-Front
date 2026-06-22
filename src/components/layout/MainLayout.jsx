import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import Avatar from '../ui/Avatar.jsx'

export default function MainLayout() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('memories_token')
    navigate('/')
  }

  // Na fase 4, o utilizador vem do contexto/api
  const user = { name: 'Ana & João' }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* Navbar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(247, 243, 239, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div
          className="container-wide row row-between"
          style={{ height: 60 }}
        >
          {/* Logo */}
          <NavLink to="/album" style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 24,
                fontWeight: 300,
                color: 'var(--text-primary)',
              }}
            >
              Memo
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 24,
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
              }}
            >
              ries
            </span>
          </NavLink>

          {/* Nav links */}
          <nav className="row gap-4" style={{ display: 'flex' }}>
            <NavLink
              to="/album"
              className="label-sm"
              style={({ isActive }) => ({
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                paddingBottom: 2,
                borderBottom: isActive ? '1px solid var(--text-primary)' : '1px solid transparent',
                transition: 'all var(--transition-fast)',
              })}
            >
              Momentos
            </NavLink>
          </nav>

          {/* User */}
          <div className="row gap-3">
            <Avatar name={user.name} size="sm" />
            <button
              onClick={handleLogout}
              className="label-sm btn-ghost"
              style={{
                color: 'var(--text-muted)',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo da página */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
