<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Logo ao lado no desktop, acima no mobile -->
      <div class="login-layout">
        <div class="logo-section">
          <AppLogo size="xl" class="login-logo" />
        </div>

        <div class="form-section">
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

              <button
                type="submit"
                class="btn btn-primary login-btn"
                :disabled="loading"
              >
                {{ loading ? "Entrando..." : "Entrar" }}
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Logomarcas dos desenvolvedores -->
      <div class="partners">
        <p class="partners-text">Desenvolvido por</p>
        <div class="partners-logos">
          <a
            href="https://www.074ti.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-link"
          >
            <img
              src="@/assets/images/logo/logo_074ti.png"
              alt="074ti"
              class="partner-logo"
            />
          </a>
          <a
            href="https://www.gmwebstudio.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-link"
          >
            <img
              src="@/assets/images/logo/logo-gm.png"
              alt="GM Web Studio"
              class="partner-logo"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AppLogo from "@/components/AppLogo.vue";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const senha = ref("");
const loading = ref(false);
const error = ref("");

const apiUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "proxy → localhost:8080" : "http://localhost:8080");

async function handleLogin() {
  error.value = "";
  loading.value = true;

  try {
    await auth.login(email.value.trim(), senha.value);
    router.push({ name: "dashboard" });
  } catch (err) {
    error.value = err.message || "Falha ao realizar login";
  } finally {
    loading.value = false;
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
    radial-gradient(
      ellipse at 20% 0%,
      rgba(0, 102, 164, 0.35) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse at 80% 100%,
      rgba(230, 106, 21, 0.12) 0%,
      transparent 45%
    );
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Layout: Logo + Card */
.login-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 420px;
}

/* Seção do Logo */
.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-logo {
  width: 120px;
  height: auto;
}

/* Card do formulário */
.form-section {
  width: 100%;
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

/* Formulário */
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

.field input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.95rem;
  background: var(--color-bg);
  color: var(--color-text);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.field input:focus {
  outline: none;
  border-color: var(--color-brand-orange);
  box-shadow: 0 0 0 3px rgba(230, 106, 21, 0.15);
}

.field input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.alert-error {
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  border: 1px solid rgba(220, 38, 38, 0.3);
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  background: var(--color-brand-orange, #e66a15);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.1s;
}

.login-btn:hover:not(:disabled) {
  background: #d05a10;
  transform: translateY(-1px);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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

/* Logomarcas dos parceiros */
.partners {
  margin-top: 2.5rem;
  text-align: center;
}

.partners-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.partners-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.partner-link {
  display: inline-block;
  transition:
    transform 0.2s,
    opacity 0.2s;
  opacity: 0.8;
}

.partner-link:hover {
  transform: scale(1.05);
  opacity: 1;
}

.partner-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
  /*filter: brightness(0) invert(1); /* Logos brancos para fundo escuro */
}

/* ============================================ */
/* DESKTOP: Logo ao lado do card */
/* ============================================ */
@media (min-width: 1024px) {
  .login-layout {
    flex-direction: row;
    align-items: stretch;
    max-width: 900px;
    gap: 3rem;
  }

  .logo-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .login-logo {
    width: 200px;
    max-width: 100%;
    height: auto;
  }

  .form-section {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .login-card {
    padding: 3rem;
  }

  .login-header h1 {
    font-size: 1.75rem;
  }

  .partners {
    margin-top: 3rem;
  }

  .partners-logos {
    gap: 3rem;
  }

  .partner-logo {
    height: 50px;
  }
}

/* ============================================ */
/* TABLET: Ajuste intermediário */
/* ============================================ */
@media (min-width: 768px) and (max-width: 1023px) {
  .login-layout {
    flex-direction: column;
    max-width: 480px;
  }

  .login-logo {
    width: 140px;
  }
}

/* ============================================ */
/* MOBILE: Empilhado (comportamento atual) */
/* ============================================ */
@media (max-width: 767px) {
  .login-page {
    padding: 1.5rem;
  }

  .login-layout {
    flex-direction: column;
    gap: 1.5rem;
  }

  .login-logo {
    width: 100px;
  }

  .login-card {
    padding: 1.5rem;
  }

  .login-header h1 {
    font-size: 1.25rem;
  }

  .partners {
    margin-top: 2rem;
  }

  .partners-logos {
    gap: 1.5rem;
  }

  .partner-logo {
    height: 50px;
  }
}
</style>
