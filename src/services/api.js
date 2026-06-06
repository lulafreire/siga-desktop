import axios from 'axios'

// Em dev, usa URL relativa para o proxy do Vite evitar bloqueio CORS no Electron
const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? '' : 'http://localhost:8080')

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('siga_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const message =
      error.response?.data?.mensagem ||
      error.response?.data?.message ||
      error.message ||
      'Erro de comunicação com a API'

    const detail = status ? `${message} (HTTP ${status})` : message
    return Promise.reject(new Error(detail))
  },
)

export const authApi = {
  login(email, senha) {
    return api.post('/api/auth/login', { email, senha }, {
      headers: { Authorization: null },
    })
  },
  me() {
    return api.get('/api/me')
  },
}

export const usuariosApi = {
  listar() {
    return api.get('/api/usuarios')
  },
}

export default api
