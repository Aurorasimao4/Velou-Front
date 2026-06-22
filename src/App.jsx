import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import TimelinePage from './pages/TimelinePage.jsx'
import MainLayout from './components/layout/MainLayout.jsx'

// Simula auth — na fase 4 vem da API real
const isAuthenticated = () => !!localStorage.getItem('velou_token')

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/entrar" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/"        element={<LandingPage />} />
      <Route path="/entrar"  element={<LoginPage />} />
      <Route
        path="/album"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TimelinePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
