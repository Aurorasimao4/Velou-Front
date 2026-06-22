import axios from 'axios'

// O proxy do Vite redireciona /api → http://localhost:8080
// Quando os teus amigos tiverem a API Java pronta, basta mudar o target no vite.config.js
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Injeta o token JWT em cada pedido automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('velou_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Se a API devolver 401, limpa a sessão e redireciona
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('velou_token')
      window.location.href = '/entrar'
    }
    return Promise.reject(error)
  }
)

export default api
