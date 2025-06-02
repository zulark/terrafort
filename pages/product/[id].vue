<template>
  <div v-if="pending" class="container mx-auto p-4 text-center">
    Carregando detalhes da máquina...
  </div>
  <div v-else-if="error || !maquina" class="container mx-auto p-4 text-center text-red-500">
    Erro ao carregar detalhes da máquina ou máquina não encontrada.
  </div>
  <div v-else class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
    <div>
      <img :src="maquina?.img_path || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'"
        :alt="maquina?.nome || 'Imagem da Máquina'" class="mt-5 rounded-xl object-cover w-full h-100 cursor-pointer"
        @click="openModal" />
    </div>
    <div class="mt-5">
      <h2 class="text-2xl font-bold text-gray-900">{{ maquina?.nome || 'Nome da Máquina' }}</h2>
      <p class="text-xl text-gray-800 mt-1">R$ {{ maquina?.preco_diaria?.toLocaleString('pt-BR', {
        minimumFractionDigits: 2, maximumFractionDigits: 2
      }) || '0,00' }} / dia</p>

      <div class="flex items-center mt-2 text-sm text-yellow-500">
        <span>⭐⭐⭐⭐⭐</span>
        <a href="#avaliacoes" class="ml-2 text-sm text-gray-600">Ver avaliações</a>
      </div>

      <!-- Especificações Técnicas -->
      <!-- <div class="mt-4">
        <h4 class="text-sm font-medium text-gray-900">Modelo</h4>
        <p class="text-sm text-gray-700 mt-1">{{ maquina?.modelo_maquina || 'Não especificado' }}</p>
      </div> -->

      <!-- <div class="mt-4">
        <h4 class="text-sm font-medium text-gray-900">Marca</h4>
        <p class="text-sm text-gray-700 mt-1">{{ maquina?.marca_maquina || 'Não especificada' }}</p>
      </div>
       -->
      <!-- <div class="mt-4">
        <h4 class="text-sm font-medium text-gray-900">Condição</h4>
        <p class="text-sm text-gray-700 mt-1">{{ maquina?.condicao_maquina || 'Não especificada' }}</p>
      </div> -->


      <!-- Botão de Ação -->
      <button
        class="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium cursor-pointer">Consultar
        Disponibilidade</button>

      <!-- Descrição -->
      <div class="mt-6 text-sm text-gray-700">
        <h4 class="font-semibold text-gray-900 mb-1">Descrição Detalhada</h4>
        <p>{{ maquina.descricao || 'Descrição da máquina não disponível.' }}</p>
      </div>

      <!-- Características Adicionais -->
      <div class="mt-6 text-sm text-gray-700">
        <h4 class="font-semibold text-gray-900 mb-1">Características e Manutenção</h4>
        <ul class="list-disc ml-5 space-y-1">
          <!-- <li>Capacidade: {{ maquina?.capacidade_maquina || 'Não especificada' }}</li> -->
          <!-- <li>Potência: {{ maquina?.potencia_maquina || 'Não especificada' }}</li> -->
          <li>Manutenção preventiva recomendada</li>
          <li>Verificar manuais para operação segura</li>
        </ul>
      </div>

      <!-- Informações extras -->
      <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div class="p-4 bg-yellow-500 rounded-lg text-center">
          <h5 class="font-medium text-white">Entrega e Instalação</h5>
          <p class="text-sm text-gray-100">Consulte prazos e condições</p>
        </div>
        <div class="p-4 bg-yellow-500 rounded-lg text-center">
          <h5 class="font-medium text-white">Garantia</h5>
          <p class="text-sm text-gray-100">6 meses</p>
          <!-- <p class="text-sm text-gray-500">{{ maquina?.garantia_maquina || 'Informações sobre garantia' }}</p> -->
        </div>
      </div>
    </div>

    <section id="avaliacoes" class="col-span-1 md:col-span-2">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Avaliações dos Usuários</h3>
        <div class="space-y-4 mb-5">
          <div class="p-4 border
          rounded-lg bg-white shadow-sm">
            <div class="flex items-center mb-2">
              <span class="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span class="ml-2 text-sm text-gray-600">João Silva</span>
            </div>
            <p class="text-gray-700">Excelente máquina, atendeu todas as minhas expectativas!</p>
            <div class="mt-2">
              <button class="text-sm text-gray-600 hover:underline cursor-pointer">Responder</button>
            </div>
          </div>
        </div>
        <div class="space-y-4 mb-5">
          <div class="p-4 border
          rounded-lg bg-white shadow-sm">
            <div class="flex items-center mb-2">
              <span class="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span class="ml-2 text-sm text-gray-600">Eduardo Matias</span>
            </div>
            <p class="text-gray-700">Recomendo muito, excelente desempenho e equipamento muito bem conservado!</p>
            <div class="mt-2">
              <button class="text-sm text-gray-600 hover:underline cursor-pointer">Responder</button>
            </div>
          </div>
        </div>
    </section>
  </div>

  <!-- Modal for Expanded Image -->
  <div v-if="isModalOpen"
    class="fixed inset-0 flex items-center justify-center z-50 p-4" @click.self="closeModal">
    <div class="relative bg-white p-2 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh]">
      <img :src="maquina?.img_path || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'"
        :alt="maquina?.nome || 'Imagem da Máquina Ampliada'"
        class="w-full h-full object-contain max-h-[calc(90vh-2rem)] rounded-md" />
      <button @click="closeModal"
        class="absolute top-0 right-0 m-2 text-black bg-white/70 hover:bg-white rounded-full p-2 leading-none focus:outline-none focus:ring-2 focus:ring-gray-400">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const route = useRoute();
const supabase = useSupabaseClient();
const productId = route.params.id;

const maquina = ref(null);
const pending = ref(true);
const error = ref(null);

// Modal state and functions
const isModalOpen = ref(false);
const openModal = () => {
  if (maquina.value?.img_path) { // Only open if there's an image
    isModalOpen.value = true;
  }
};
const closeModal = () => {
  isModalOpen.value = false;
};

const { data, error: fetchError, pending: fetchPending } = await useAsyncData(
  `maquina-${productId}`,
  async () => {
    const { data: machineData, error: machineError } = await supabase
      .from('maquina')
      .select('*') // Seleciona todas as colunas, ou especifique as que precisa
      .eq('id_maquina', productId)
      .single(); // .single() é usado pois esperamos apenas um resultado

    if (machineError) {
      console.error('Erro ao buscar detalhes da máquina:', machineError);
      throw machineError; // Lança o erro para ser pego pelo useAsyncData
    }
    return machineData;
  }
);

maquina.value = data.value;
error.value = fetchError.value;
pending.value = fetchPending.value;

// Opcional: Definir metadados da página (título, etc.)
if (maquina.value) {
  useHead({
    title: `Detalhes - ${maquina.value.nome || 'Máquina'}`,
    meta: [
      // Assumindo que você tem um campo descricao_maquina ou similar
      { name: 'description', content: maquina.value.descricao_maquina || 'Detalhes da máquina' }
    ]
  });
} else if (!pending.value && !maquina.value) { // Se não está carregando e não encontrou a máquina
  useHead({
    title: 'Máquina não encontrada',
    meta: [
      { name: 'description', content: 'A máquina que você está procurando não foi encontrada.' }
    ]
  });
}

</script>
<style scoped>
/* Add any additional scoped styles if needed */
.h-100 { /* Assuming h-100 is a custom class for height, e.g., height: 100px or similar. Adjust if it's from a framework or a typo. */
  /* For example, if it means 400px height: */
  /* height: 400px; */ 
  /* Or if it's meant to be a Tailwind class like h-96 (24rem) or a specific aspect ratio, adjust accordingly */
}
</style>
