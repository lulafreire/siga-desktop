<template>
  <RouterView />
  <Toast position="bottom-right" />
  <ConfirmDialog />
  <PWAInstallBanner />
</template>

<script setup>
import { RouterView } from "vue-router";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import PWAInstallBanner from "@/components/PWAInstallBanner.vue";
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

#app {
  width: 100%;
  min-height: 100vh;
}
</style>
