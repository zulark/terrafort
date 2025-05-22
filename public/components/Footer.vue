<template>
  <footer class="bg-gray-800 text-gray-300">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div class="md:col-span-1 lg:col-span-2">
          <a href="/" class="text-3xl font-bold text-white">
            <span class="text-yellow-500">Terra</span>Fort
          </a>
          </div>

        <div>
          <h5 class="text-lg font-semibold text-white uppercase mb-4">Links Rápidos</h5>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-yellow-400 transition-colors">Home</a></li>
            <li><a href="#" class="hover:text-yellow-400 transition-colors">Equipamentos</a></li>
            <li><a href="#" class="hover:text-yellow-400 transition-colors">Sobre Nós</a></li>
            <li><a href="#" class="hover:text-yellow-400 transition-colors">Contato</a></li>
          </ul>
        </div>

        <div>
          <h5 class="text-lg font-semibold text-white uppercase mb-4">Contato</h5>
          <ul class="space-y-2">
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 text-yellow-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              (00) 1234-5678
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 text-yellow-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              contato@terrafort.com.br
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
        &copy; {{ new Date().getFullYear() }} TerraFort - Todos os direitos reservados
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Nenhuma lógica específica necessária para este componente simples
</script>