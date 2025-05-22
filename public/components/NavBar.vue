<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div class="flex-shrink-0">
          <a href="/" class="text-2xl font-bold text-gray-800">
            <span class="text-yellow-500">Terra</span>Fort
          </a>
        </div>

        <div class="hidden md:flex items-center space-x-6">
          <a
            href="#"
            class="px-3 py-2 rounded-md text-sm font-medium text-yellow-500 border-b-2 border-yellow-500"
            aria-current="page"
          >
            Home
          </a>
          <a
            href="#"
            class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-yellow-500 hover:border-b-2 hover:border-yellow-500 transition-colors"
          >
            Equipamentos
          </a>
          <a
            href="#"
            class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-yellow-500 hover:border-b-2 hover:border-yellow-500 transition-colors"
          >
            Login
          </a>
          <a
            href="#"
            class="px-3 py-2 rounded-md text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition-colors"
          >
            Cadastre-se
          </a>
        </div>

        <div class="md:hidden flex items-center">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-700 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-yellow-500 bg-gray-100" aria-current="page">Home</a>
        <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-yellow-500">Equipamentos</a>
        <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-yellow-500">Login</a>
        <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600">Cadastre-se</a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
</script>

<style scoped>
/* Você pode adicionar estilos específicos aqui se o Tailwind não for suficiente */
/* O logo "TerraFort" parece ter uma parte em amarelo e outra em preto/cinza escuro */
/* Ajustei as cores diretamente no template com classes do Tailwind. */
</style>