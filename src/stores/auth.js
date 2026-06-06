import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/services/api'

const TOKEN_KEY = 'siga_token'
const USER_KEY = 'siga_user'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(TOKEN_KEY) || '')
  const usuario = ref(JSON.parse(localStorage.getItem(USER_KEY) || 'null'))

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => usuario.value?.nivelAcesso === 'ADMIN')

  function persist() {
    if (token.value) {
      localStorage.setItem(TOKEN_KEY, token.value)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }

    if (usuario.value) {
      localStorage.setItem(USER_KEY, JSON.stringify(usuario.value))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  }

  async function login(email, senha) {
    const { data } = await authApi.login(email, senha)
    token.value = data.token
    usuario.value = data.usuario
    persist()
    return data
  }

  async function fetchMe() {
    const { data } = await authApi.me()
    usuario.value = data
    persist()
    return data
  }

  function logout() {
    token.value = ''
    usuario.value = null
    persist()
  }

  return {
    token,
    usuario,
    isAuthenticated,
    isAdmin,
    login,
    fetchMe,
    logout,
  }
})
