<template>
  <Loading v-if="isLoading" message="Carregando produtos..." />

  <section id="produtos" class="bg-gray-50 py-8 sm:py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">

      <!-- breadCrumb -->
      <nav class="mb-6 sm:mb-8" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 text-sm font-medium text-gray-700">
          <li>
            <NuxtLink to="/" class="text-yellow-500 hover:text-yellow-600">Início</NuxtLink>
          </li>
          <li>
            <span class="mx-2">/</span>
          </li>
          <li class="text-gray-500">Produtos</li>
        </ol>
      </nav>

      <div class="text-center mb-8 sm:mb-12">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 md:text-4xl">
          Nosso Catálogo de Máquinas
        </h2>
        <p class="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">
          Encontre o equipamento ideal para o seu projeto.
        </p>
      </div>

      <!--Filtros de pesquisa -->
      <div class="mb-8 flex flex-col sm:flex-row sm:justify-center items-center">
        <input type="text" placeholder="Pesquisar por nome ou categoria"
          class="w-full sm:max-w-md px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-2 sm:mb-0 sm:mr-2" />
        <button
          class="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer transition-colors duration-150 ease-in-out"
          @click="searchProducts">
          Pesquisar
        </button>
      </div>

      <!-- Categorias -->
      <div class="mb-8 flex flex-wrap justify-center gap-2 sm:gap-4">
        <button
          class="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-150 ease-in-out cursor-pointer"
          @click="filterByCategory('*')">
          Todos
        </button>
        <button
          v-for="(category, i) in products.map(product => product.categoria_maquina).filter((v, i, a) => a.findIndex(t => (t.nome_categoria === v.nome_categoria)) === i)"
          :key="category.id"
          class="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-150 ease-in-out cursor-pointer"
          @click="filterByCategory(category.nome_categoria)">
          {{ category.nome_categoria }}
        </button>
      </div>

      <div v-if="!isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div v-for="product in products" :key="product.id_maquina"
          class="group rounded-lg overflow-hidden  flex flex-col">
          <div class="h-100 w-full bg-gray-100 overflow-hidden relative">
            <NuxtLink :to="`/product/${product.id_maquina}`" class="block h-full w-full">
              <img :src="product.img_path || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'"
                :alt="`Imagem de ${product.nome}`" class="h-full w-full object-cover object-center " />
            </NuxtLink>
          </div>
          <div class="p-4 flex flex-col flex-grow">
            <h3 class="text-lg font-semibold text-gray-800">
              <NuxtLink :to="`/product/${product.id_maquina}`"
                class="hover:text-yellow-600 transition-colors duration-200 focus:outline-none">
                {{ product.nome }}
              </NuxtLink>
            </h3>
            <p class="text-sm text-gray-500 mt-1">{{ product.categoria_maquina.nome_categoria }}</p>

            <p class="text-gray-600 text-xs mt-2 flex-grow min-h-[3em]">
              {{ product.descricao }}
            </p>

            <div class="flex justify-between items-center mt-3">
              <p class="text-xl font-bold text-gray-900">R$ {{ product.preco_diaria }} <span
                  class="text-sm font-normal text-gray-500">/ dia</span></p>
              <span class="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full"
                :class="product.disponivel ? 'text-green-800' : 'text-red-800'">
                {{ product.disponivel ? 'Disponível' : 'Indisponível' }}
              </span>
            </div>

            <div class="mt-4">
              <NuxtLink :to="`/product/${product.id_maquina}`" class="block w-full">
                <button
                  class="w-full py-2 px-4 rounded-md font-semibold text-sm transition-colors duration-150 ease-in-out cursor-pointer"
                  :class="product.disponivel ?
                    'bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50' :
                    'bg-gray-300 text-gray-500 cursor-not-allowed'" :disabled="!product.disponivel">
                  {{ product.disponivel ? 'Ver Detalhes' : 'Indisponível' }}
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const supabase = useSupabaseClient();
const products = ref([]);
const isLoading = ref(true);


const fetchProducts = async () => {
  isLoading.value = true;
  const { data, error } = await supabase
    .from('maquina')
    .select('*, categoria_maquina(*)')
    .eq('disponivel', true);

  if (error) {
    console.error('Erro ao buscar produtos:', error);
  } else {
    products.value = data;
    isLoading.value = false;
  }
};

onMounted(async () => {
  fetchProducts();
});

const searchProducts = () => {
  const searchTerm = document.querySelector('input[type="text"]').value.toLowerCase();
  if (searchTerm) {
    products.value = products.value.filter(product =>
      product.nome.toLowerCase().includes(searchTerm) ||
      product.categoria_maquina.nome_categoria.toLowerCase().includes(searchTerm)
    );
  } else {
    fetchProducts();
  }
  if (searchTerm === '') {
    fetchProducts();
  }
};

const filterByCategory = (category) => {
  if (category === '*') {
    fetchProducts();
  } else {
    products.value = products.value.filter(product => product.categoria_maquina.nome_categoria === category);
  }
};

</script>

<style scoped>
</style>
