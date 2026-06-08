<template>
  <nav class="navbar">
    <div class="nav-brand">
      <router-link to="/">SIGA</router-link>
    </div>
    <div class="nav-links">
      <router-link to="/clientes">Clientes</router-link>
      <router-link to="/clientes/novo">Novo Cliente</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.nav-brand a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}
.nav-links {
  display: flex;
  gap: 1.5rem;
}
.nav-links a {
  color: white;
  text-decoration: none;
}
</style>
