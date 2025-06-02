<template>
   <div class="container mx-auto py-8 px-2">
      <h2 class="text-3xl mb-4 text-center">Destaques</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div v-for="item in maquina" :key="item.id_maquina" class="group rounded-lg overflow-hidden flex flex-col">
          <div class="h-100 w-full bg-gray-100 overflow-hidden relative">
            <NuxtLink :to="`/product/${item.id_maquina}`" class="block h-full w-full">
              <img :src="item.img_path || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'"
                :alt="`Imagem de ${item.nome}`" class="h-full w-full object-cover object-center" />
            </NuxtLink>
          </div>
          <div class="p-4 flex flex-col flex-grow">
            <h3 class="text-lg font-semibold text-gray-800">
              <NuxtLink :to="`/product/${item.id_maquina}`" class="hover:text-yellow-600 transition-colors duration-200 focus:outline-none">
                {{ item.nome }}
              </NuxtLink>
            </h3>
            <p class="text-gray-600 text-xs mt-2 flex-grow min-h-[3em]">
              {{ item.descricao }}
            </p>
            <div class="flex justify-between items-center mt-3">
              <p class="text-xl font-bold text-gray-900">R$ {{ item.preco_diaria }} <span class="text-sm font-normal text-gray-500">/ dia</span></p>
              <span class="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full"
                :class="item.disponivel ? 'text-green-800' : 'text-red-800'">
                {{ item.disponivel ? 'Disponível' : 'Indisponível' }}
              </span>
            </div>
            <div class="mt-4">
              <NuxtLink :to="`/product/${item.id_maquina}`" class="block w-full">
                <button
                  class="w-full py-2 px-4 rounded-md font-semibold text-sm transition-colors duration-150 ease-in-out cursor-pointer"
                  :class="item.disponivel ?
                    'bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50' :
                    'bg-gray-300 text-gray-500 cursor-not-allowed'"
                  :disabled="!item.disponivel">
                  {{ item.disponivel ? 'Ver Detalhes' : 'Indisponível' }}
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
        <NuxtLink to="/products" class="col-span-full text-center">
          <button class="cursor-pointer mt-8 py-4 px-10 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
            Ver Todos os Produtos
          </button>
        </NuxtLink>
      </div>
   </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const supabase = useSupabaseClient();
import { ref, onMounted } from 'vue';
const maquina = ref([]);

const goToDetails = (id) => {
   router.push(`/product/${id}`);
};

const getMaquinas = async () => {
   const { data, error } = await supabase
      .from('maquina')
      .select()
      .eq('disponivel', true)
      .limit(3);
   if (error) {
      console.error('Erro ao buscar máquinas:', error);
   } else {
      maquina.value = data;
   }
};

onMounted(() => {
   getMaquinas();
});

</script>

<style scoped>
</style>