<template>
  <div class="usuarios-list">
    <div class="list-header">
      <div>
        <h2>Usuários</h2>
        <p class="subtitle">Lista de usuários cadastrados no sistema</p>
      </div>
      <button class="btn btn-ghost" :disabled="loading" @click="carregar">
        {{ loading ? 'Carregando...' : 'Atualizar' }}
      </button>
    </div>

    <div v-if="error" class="alert alert-error">{{ error }}</div>

    <div v-if="!auth.isAdmin" class="alert alert-error">
      Seu perfil não possui permissão para visualizar usuários. Apenas administradores podem acessar esta funcionalidade.
    </div>

    <div v-else-if="loading && usuarios.length === 0" class="loading-state">
      Carregando usuários...
    </div>

    <div v-else-if="usuarios.length === 0 && !loading" class="empty-state">
      Nenhum usuário encontrado.
    </div>

    <div v-else class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Perfil</th>
            <th>Nível</th>
            <th>Status</th>
            <th>Cadastro</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td>{{ usuario.id }}</td>
            <td class="nome">{{ usuario.nome }}</td>
            <td>{{ usuario.email }}</td>
            <td>{{ formatPerfil(usuario.perfil) }}</td>
            <td>
              <span :class="['badge', usuario.nivelAcesso === 'ADMIN' ? 'badge-admin' : 'badge-user']">
                {{ usuario.nivelAcesso }}
              </span>
            </td>
            <td>
              <span :class="['badge', usuario.ativo ? 'badge-active' : 'badge-inactive']">
                {{ usuario.ativo ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
            <td class="data">{{ formatData(usuario.criadoEm) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="usuarios.length > 0" class="total">
      Total: {{ usuarios.length }} usuário{{ usuarios.length !== 1 ? 's' : '' }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usuariosApi } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const usuarios = ref([])
const loading = ref(false)
const error = ref('')

const perfilLabels = {
  ADMINISTRADOR: 'Administrador',
  ATENDENTE: 'Atendente',
  PROFISSIONAL: 'Profissional',
}

function formatPerfil(perfil) {
  return perfilLabels[perfil] || perfil
}

function formatData(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('pt-BR')
}

async function carregar() {
  if (!auth.isAdmin) return

  loading.value = true
  error.value = ''

  try {
    const { data } = await usuariosApi.listar()
    usuarios.value = data
  } catch (err) {
    error.value = err.message || 'Erro ao carregar usuários'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (auth.isAdmin) {
    carregar()
  }
})
</script>

<style scoped>
.usuarios-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.list-header h2 {
  font-size: 1.25rem;
  color: var(--color-brand-navy);
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin-top: 0.15rem;
}

.loading-state,
.empty-state {
  padding: 3rem;
  text-align: center;
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
}

.table-wrapper {
  overflow-x: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

th,
td {
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

th {
  background: var(--color-bg);
  font-weight: 600;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: #f8fafc;
}

.nome {
  font-weight: 600;
}

.data {
  color: var(--color-text-muted);
  white-space: nowrap;
}

.total {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-align: right;
}
</style>
