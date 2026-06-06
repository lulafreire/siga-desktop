<template>
  <img
    :src="logoUrl"
    alt="SIGA"
    :class="['app-logo', `app-logo--${size}`]"
  />
</template>

<script setup>
import logoUrl from '@/assets/images/logo/logo.png'

defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
})
</script>

<style scoped>
.app-logo {
  display: block;
  object-fit: contain;
}

.app-logo--sm {
  height: 32px;
  width: auto;
}

.app-logo--md {
  height: 44px;
  width: auto;
}

.app-logo--lg {
  height: 72px;
  width: auto;
}
</style>
