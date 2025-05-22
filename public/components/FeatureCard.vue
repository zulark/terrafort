<template>
  <div class="bg-white p-6 rounded-lg shadow-lg text-center md:text-left flex flex-col md:flex-row items-center md:space-x-4">
    <div class="flex-shrink-0 mb-4 md:mb-0">
      <div class="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
        <slot name="icon">
          <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </slot>
      </div>
    </div>
    <div>
      <h3 class="text-xl font-semibold text-gray-800 mb-1">{{ title }}</h3>
      <p class="text-gray-600 text-sm">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>