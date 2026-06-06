<template>
  <div class="dashboard">
    <header class="topbar">
      <div class="topbar-left">
        <AppLogo size="sm" />
        <span class="app-title">Desktop</span>
      </div>

      <div class="topbar-right">
        <div class="user-info">
          <span class="user-name">{{ auth.usuario?.nome }}</span>
          <span class="user-email">{{ auth.usuario?.email }}</span>
        </div>
        <button class="btn btn-ghost btn-logout" @click="handleLogout">Sair</button>
      </div>
    </header>

    <div class="dashboard-body">
      <aside class="sidebar">
        <nav>
          <p class="nav-label">Menu</p>
          <button
            class="nav-item"
            :class="{ active: activeSection === 'usuarios' }"
            @click="activeSection = 'usuarios'"
          >
            <span class="nav-icon">👥</span>
            Usuários
          </button>
        </nav>
      </aside>

      <main class="content">
        <section v-if="activeSection === 'usuarios'" class="section">
          <UsuariosList />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppLogo from '@/components/AppLogo.vue'
import UsuariosList from '@/components/UsuariosList.vue'

const router = useRouter()
const auth = useAuthStore()

const activeSection = ref('usuarios')

function handleLogout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.5rem;
  background: var(--color-brand-navy);
  border-bottom: 2px solid var(--color-brand-blue);
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.app-title {
  font-weight: 500;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.75);
  padding-left: 0.75rem;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.3;
}

.user-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: #fff;
}

.user-email {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.btn-logout {
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.25);
}

.btn-logout:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
}

.dashboard-body {
  flex: 1;
  display: flex;
}

.sidebar {
  width: 240px;
  background: var(--color-brand-navy);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.25rem 0.75rem;
}

.nav-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.4);
  padding: 0 0.75rem;
  margin-bottom: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  padding: 0.65rem 0.75rem;
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 0.9rem;
  text-align: left;
  transition: background 0.15s, color 0.15s;
}

.nav-item:hover {
  background: rgba(0, 102, 164, 0.35);
  color: #fff;
}

.nav-item.active {
  background: var(--color-brand-blue);
  color: #fff;
  font-weight: 600;
  box-shadow: inset 3px 0 0 var(--color-brand-orange);
}

.nav-icon {
  font-size: 1.1rem;
}

.content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background: var(--color-bg);
}

.section {
  max-width: 1100px;
}
</style>
