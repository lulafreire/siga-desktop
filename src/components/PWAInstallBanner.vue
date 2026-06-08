<template>
  <div v-if="showInstall" class="pwa-install-banner">
    <div class="banner-content">
      <div class="app-info">
        <img src="/pwa-192x192.png" alt="SIGA" class="app-icon" />
        <div>
          <h3>Instalar Aplicativo SIGA</h3>
          <p>Acesso rápido e offline</p>
        </div>
      </div>

      <div class="banner-actions">
        <Button
          v-if="deferredPrompt && !isIOS"
          label="Instalar"
          icon="pi pi-download"
          @click="installApp"
          class="p-button-primary"
        />
        <Button
          v-if="isIOS"
          label="Como Instalar"
          icon="pi pi-question-circle"
          @click="showIOSGuide = true"
          class="p-button-info"
        />
        <Button
          icon="pi pi-times"
          @click="dismissBanner"
          class="p-button-text"
        />
      </div>
    </div>

    <!-- Guia para iOS -->
    <Dialog
      v-model:visible="showIOSGuide"
      header="Instalar no iPhone/iPad"
      :modal="true"
    >
      <div class="ios-guide">
        <ol>
          <li>
            Toque no ícone <i class="pi pi-share"></i>
            <strong>Compartilhar</strong>
          </li>
          <li>Role e toque em <strong>"Adicionar à Tela de Início"</strong></li>
          <li>Toque em <strong>Adicionar</strong></li>
        </ol>
        <img src="/ios-install-guide.png" alt="Guia iOS" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

const showInstall = ref(false);
const showIOSGuide = ref(false);
const isIOS = ref(false);
const deferredPrompt = ref(null);

onMounted(() => {
  // Verificar se é iOS
  isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Verificar se já está instalado
  if (window.matchMedia("(display-mode: standalone)").matches) {
    return; // Já está como PWA
  }

  // Ouvir evento de instalação
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
    showInstall.value = true;
  });

  // Mostrar banner para iOS também
  if (isIOS.value) {
    setTimeout(() => {
      showInstall.value = true;
    }, 3000);
  }
});

const installApp = async () => {
  if (!deferredPrompt.value) return;

  deferredPrompt.value.prompt();
  const { outcome } = await deferredPrompt.value.userChoice;

  console.log(
    `Usuário ${outcome === "accepted" ? "aceitou" : "recusou"} a instalação`,
  );

  deferredPrompt.value = null;
  showInstall.value = false;
};

const dismissBanner = () => {
  showInstall.value = false;
  localStorage.setItem("pwa-banner-dismissed", "true");
};
</script>

<style scoped>
.pwa-install-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem;
}

.banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.app-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
}

.banner-actions {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
