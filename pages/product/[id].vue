<template>

  <div v-if="pending" class="container mx-auto p-4 text-center">
    <Loading message="Carregando detalhes da máquina..." />
  </div>
  <div v-else-if="error || !maquina" class="container mx-auto p-4 text-center text-red-500">
    Erro ao carregar detalhes da máquina ou máquina não encontrada.
  </div>

  <div v-else class="container max-w-7xl mx-auto px-4 py-8">
    <nav class="mb-6 sm:mb-8" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 text-sm font-medium text-gray-700">
        <li>
          <NuxtLink to="/" class="text-yellow-500 hover:text-yellow-600">Início</NuxtLink>
        </li>
        <li>
          <span class="mx-2">/</span>
        </li>
        <li class="text-gray-500">
          <NuxtLink to="/products" class="text-yellow-500 hover:text-yellow-600">Produtos</NuxtLink>
        </li>
        <li>
          <span class="mx-2">/</span>
        </li>
        <li class="text-gray-500">
          {{ maquina?.nome || 'Máquina' }}
        </li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
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

        <!-- Botão de Ação -->
        <button
          v-if="maquina?.status === 'Disponível'"
          class="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium cursor-pointer"
          @click="showLocacaoModal = true"
        >Alugar este equipamento</button>
        <button
          v-else
          class="mt-6 w-full bg-gray-400 text-white py-3 rounded-lg font-medium cursor-not-allowed"
          disabled
        >{{ formatDisponibilidade(maquina.status === 'Disponível') }}</button>

        <!-- Modal de Locação -->
        <Transition
          enter-active-class="transition-all ease-out duration-300"
          enter-from-class="opacity-0 transform -translate-y-6"
          enter-to-class="opacity-100 transform translate-y-0"
          leave-active-class="transition-all ease-in duration-200"
          leave-from-class="opacity-100 transform translate-y-0"
          leave-to-class="opacity-0 transform -translate-y-6"
        >
          <div v-if="showLocacaoModal" class="fixed inset-0 flex items-center justify-center z-50 p-4" @click.self="showLocacaoModal = false">
            <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative" @click.stop>
              <button @click="showLocacaoModal = false" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <h3 class="text-xl font-bold mb-4 text-center">Alugar {{ maquina?.nome }}</h3>
              <form @submit.prevent="handleLocacao">
                <div class="flex gap-2 mb-3">
                  <div class="flex-1">
                    <label class="block font-medium mb-1">Data início</label>
                    <input v-model="locacaoForm.data_inicio" type="date" required class="w-full border rounded px-3 py-2" />
                  </div>
                  <div class="flex-1">
                    <label class="block font-medium mb-1">Data fim</label>
                    <input v-model="locacaoForm.data_fim" type="date" required class="w-full border rounded px-3 py-2" />
                  </div>
                </div>
                <div v-if="locacaoForm.data_inicio && locacaoForm.data_fim && diasLocacao > 0" class="mb-3 text-center">
                  <span class="block text-gray-700">Dias selecionados: <b>{{ diasLocacao }}</b></span>
                  <span class="block text-gray-700">Valor total: <b>R$ {{ valorTotalLocacao.toLocaleString('pt-BR', {minimumFractionDigits: 2}) }}</b></span>
                  <span class="block text-gray-700">Período: <b>{{ formatDateBR(locacaoForm.data_inicio) }} a {{ formatDateBR(locacaoForm.data_fim) }}</b></span>
                </div>
                <button type="submit" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded">Confirmar Locação</button>
                <div v-if="locacaoError" class="text-red-500 text-center mt-2">{{ locacaoError }}</div>
                <div v-if="locacaoSuccess" class="text-green-600 text-center mt-2">{{ locacaoSuccess }}</div>
              </form>
            </div>
          </div>
        </Transition>

        <!-- Descrição -->
        <div class="mt-6 text-sm text-gray-700">
          <h4 class="font-semibold text-gray-900 mb-1">Descrição Detalhada</h4>
          <p>{{ maquina.descricao || 'Descrição da máquina não disponível.' }}</p>
        </div>

        <!-- Características Adicionais -->
        <div class="mt-6 text-sm text-gray-700">
          <h4 class="font-semibold text-gray-900 mb-1">Características e Manutenção</h4>
          <ul class="list-disc ml-5 space-y-1">
            <li>Manutenção preventiva recomendada</li>
            <li>Verificar manuais para operação segura</li>
          </ul>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div class="p-4 bg-yellow-500 rounded-lg text-center">
            <h5 class="font-medium text-white">Entrega e Instalação</h5>
            <p class="text-sm text-gray-100">Consulte prazos e condições</p>
          </div>
          <div class="p-4 bg-yellow-500 rounded-lg text-center">
            <h5 class="font-medium text-white">Garantia</h5>
            <p class="text-sm text-gray-100">6 meses</p>
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
  </div>

  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50 p-4" @click.self="closeModal">
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
import { ref, computed } from 'vue';
const route = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const productId = route.params.id;

const maquina = ref(null);
const pending = ref(true);
const error = ref(null);

const isModalOpen = ref(false);
const showLocacaoModal = ref(false);

const locacaoForm = ref({
  data_inicio: '',
  data_fim: '',
});
const locacaoError = ref('');
const locacaoSuccess = ref('');

const diasLocacao = computed(() => {
  if (!locacaoForm.value.data_inicio || !locacaoForm.value.data_fim) return 0;
  const start = new Date(locacaoForm.value.data_inicio + 'T00:00:00');
  const end = new Date(locacaoForm.value.data_fim + 'T00:00:00');
  const diff = (end - start) / (1000 * 60 * 60 * 24) + 1;
  return diff > 0 ? diff : 0;
});

const valorTotalLocacao = computed(() => {
  if (!maquina.value || !maquina.value.preco_diaria || diasLocacao.value <= 0) return 0;
  return diasLocacao.value * maquina.value.preco_diaria;
});

const openModal = () => {
  if (maquina.value?.img_path) {
    isModalOpen.value = true;
  }
};
const closeModal = () => {
  isModalOpen.value = false;
};

const formatDisponibilidade = (disponibilidade) => {
  return disponibilidade ? 'Disponível' : 'Indisponível';
};

function formatDateBR(dateStr) {
  if (!dateStr) return '';
  const [yyyy, mm, dd] = dateStr.split('-');
  return `${mm}/${dd}/${yyyy}`;
}

const { data, error: fetchError, pending: fetchPending } = await useAsyncData(
  `maquina-${productId}`,
  async () => {
    const { data: machineData, error: machineError } = await supabase
      .from('maquina')
      .select('*')
      .eq('id_maquina', productId)
      .single();

    if (machineError) {
      console.error('Erro ao buscar detalhes da máquina:', machineError);
      throw machineError;
    }
    return machineData;
  }
);

maquina.value = data.value;
error.value = fetchError.value;
pending.value = fetchPending.value;

if (maquina.value) {
  useHead({
    title: `Detalhes - ${maquina.value.nome || 'Máquina'}`,
    meta: [
      { name: 'description', content: maquina.value.descricao_maquina || 'Detalhes da máquina' }
    ]
  });
} else if (!pending.value && !maquina.value) {
  useHead({
    title: 'Máquina não encontrada',
    meta: [
      { name: 'description', content: 'A máquina que você está procurando não foi encontrada.' }
    ]
  });
}

const handleLocacao = async () => {
  locacaoError.value = '';
  locacaoSuccess.value = '';
  if (!user.value) {
    locacaoError.value = 'Você precisa estar logado para alugar.';
    return;
  }
  if (!locacaoForm.value.data_inicio || !locacaoForm.value.data_fim) {
    locacaoError.value = 'Preencha as datas.';
    return;
  }
  if (diasLocacao.value <= 0) {
    locacaoError.value = 'A data final deve ser igual ou após a data inicial.';
    return;
  }
  // Busca o id do cliente pelo user_id do auth
  const { data: cliente, error: clienteError } = await supabase
    .from('cliente')
    .select('id')
    .eq('user_id', user.value.id)
    .single();
  if (clienteError || !cliente) {
    locacaoError.value = 'Não foi possível identificar seu perfil de cliente.';
    return;
  }
  // Cria a locação
  const { error: locError } = await supabase.from('locacao').insert([
    {
      id_cliente_fk: cliente.id,
      id_maquina_fk: productId,
      data_inicio: locacaoForm.value.data_inicio,
      data_fim_prevista: locacaoForm.value.data_fim,
      valor_total: valorTotalLocacao.value,
      status_locacao: 'Ativa',
    },
  ]);
  if (locError) {
    locacaoError.value = 'Erro ao registrar locação: ' + (locError.message || '');
    return;
  }
  // Atualiza status da máquina
  const { error: maqError } = await supabase.from('maquina').update({ status: 'Alugada' }).eq('id_maquina', productId);
  if (maqError) {
    locacaoError.value = 'Locação criada, mas erro ao atualizar status da máquina: ' + (maqError.message || '');
    return;
  }
  locacaoSuccess.value = 'Locação registrada e máquina alugada com sucesso!';
  showLocacaoModal.value = false;
  if (maquina.value) maquina.value.status = 'Alugada';
  locacaoForm.value = { data_inicio: '', data_fim: '' };
};

</script>
<style scoped></style>
