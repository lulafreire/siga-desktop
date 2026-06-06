<template>
  <div class="login-page">
    <div class="login-container">
      <AppLogo size="lg" class="login-logo" />

      <div class="login-card">
        <div class="login-header">
          <h1>Bem-vindo</h1>
          <p>Entre com suas credenciais para acessar o sistema</p>
        </div>

        <form class="login-form" @submit.prevent="handleLogin">
          <div class="field">
            <label for="email">E-mail</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              autocomplete="username"
              required
              :disabled="loading"
            />
          </div>

          <div class="field">
            <label for="senha">Senha</label>
            <input
              id="senha"
              v-model="senha"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              required
              :disabled="loading"
            />
          </div>

          <div v-if="error" class="alert alert-error">{{ error }}</div>

          <button type="submit" class="btn btn-primary login-btn" :disabled="loading">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <p class="login-hint">
          API: <code>{{ apiUrl }}</code>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppLogo from '@/components/AppLogo.vue'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const senha = ref('')
const loading = ref(false)
const error = ref('')

const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'proxy → localhost:8080' : 'http://localhost:8080')

async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    await auth.login(email.value.trim(), senha.value)
    router.push({ name: 'dashboard' })
  } catch (err) {
    error.value = err.message || 'Falha ao realizar login'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--color-brand-navy);
  background-image:
    radial-gradient(ellipse at 20% 0%, rgba(0, 102, 164, 0.35) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 100%, rgba(230, 106, 21, 0.12) 0%, transparent 45%);
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 420px;
}

.login-logo {
  margin-bottom: 1.75rem;
}

.login-card {
  width: 100%;
  background: var(--color-surface);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.35);
  border-top: 3px solid var(--color-brand-orange);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 1.5rem;
  margin-bottom: 0.35rem;
  color: var(--color-brand-navy);
}

.login-header p {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
}

.login-hint {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.login-hint code {
  background: var(--color-bg);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.7rem;
}
</style>
