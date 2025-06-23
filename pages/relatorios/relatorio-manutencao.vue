<template>
  <div class="min-h-screen">
    <div class="container mx-auto py-8 px-2 content-center">
      <h2 class="text-3xl font-bold mb-6 text-center">Relatório de Manutenção de Equipamentos</h2>
      <div class="flex justify-end mb-4">
        <button @click="abrirModalNovaManutencao = true"
          class="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded">
          Nova Manutenção
        </button>
      </div>
      <!-- Modal Nova Manutenção -->
      <div v-if="abrirModalNovaManutencao" class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
          <button @click="abrirModalNovaManutencao = false"
            class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <h3 class="text-xl font-bold mb-4 text-center">Nova Manutenção</h3>
          <form @submit.prevent="criarManutencao">
            <div class="mb-3">
              <label class="block font-medium mb-1">Equipamento</label>
              <select v-model="novaManutencao.id_maquina_fk" class="w-full border rounded px-3 py-2">
                <option value="" disabled>Selecione</option>
                <option v-for="maq in maquinas" :key="maq.id_maquina" :value="maq.id_maquina">{{ maq.nome }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="block font-medium mb-1">Data da Manutenção</label>
              <input v-model="novaManutencao.data_manutencao" type="date" class="w-full border rounded px-3 py-2" />
            </div>
            <div class="mb-3">
              <label class="block font-medium mb-1">Tipo</label>
              <input v-model="novaManutencao.tipo_manutencao" class="w-full border rounded px-3 py-2"
                placeholder="Ex: Preventiva, Corretiva" />
            </div>
            <div class="mb-3">
              <label class="block font-medium mb-1">Descrição</label>
              <textarea v-model="novaManutencao.descricao" class="w-full border rounded px-3 py-2" rows="2"
                placeholder="Detalhes da manutenção"></textarea>
            </div>
            <div class="mb-3">
              <label class="block font-medium mb-1">Custo (R$)</label>
              <input v-model="novaManutencao.custo" type="number" min="0" step="0.01"
                class="w-full border rounded px-3 py-2" />
            </div>
            <div class="mb-3">
              <label class="block font-medium mb-1">Realizada por</label>
              <input v-model="novaManutencao.realizada_por" class="w-full border rounded px-3 py-2"
                placeholder="Nome do responsável" />
            </div>
            <div class="mb-3">
              <label class="block font-medium mb-1">Horas de uso até a manutenção</label>
              <input v-model="novaManutencao.horas_uso_na_manutencao" type="number" min="0" step="0.1"
                class="w-full border rounded px-3 py-2" placeholder="Ex: 120.5" />
            </div>
            <button type="submit"
              class="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded">Salvar</button>
            <div v-if="erroNovaManutencao" class="text-red-500 text-center mt-2">{{ erroNovaManutencao }}</div>
          </form>
        </div>
      </div>
      <!-- Tabela e filtros -->
        <ReportTable
          :items="manutencoes"
          :columns="columns"
          id-key="id_manutencao"
          :items-per-page="10"
          search-placeholder="Pesquisar máquina..."
          :search-keys="['maquina.nome', 'tipo_manutencao', 'descricao', 'realizada_por', 'custo', 'horas_uso_na_manutencao']"
          :custom-filter="(arr, search) => {
            return arr.filter(man => {
              const eq = !filtros.equipamento || (man.maquina && man.maquina.id_maquina == filtros.equipamento);
              let dt = true;
              if (filtros.data_inicio) dt = dt && man.data_manutencao >= filtros.data_inicio;
              if (filtros.data_fim) dt = dt && man.data_manutencao <= filtros.data_fim;
              let st = true;
              if (filtros.status && man.status) st = man.status === filtros.status;
              if (search) {
                const t = search.toLowerCase();
                return eq && dt && st && (
                  (man.maquina?.nome || '').toLowerCase().includes(t) ||
                  (man.tipo_manutencao || '').toLowerCase().includes(t) ||
                  (man.descricao || '').toLowerCase().includes(t) ||
                  (man.realizada_por || '').toLowerCase().includes(t) ||
                  (man.custo + '').toLowerCase().includes(t) ||
                  (man.horas_uso_na_manutencao + '').toLowerCase().includes(t)
                );
              }
              return eq && dt && st;
            });
          }"
        >
          <template #filters>
            <div class="flex gap-3">
              <div class="flex flex-col">
                <label for="equipamento" class="mb-2 text-gray-600">Equipamento:</label>
                <select v-model="filtros.equipamento" id="equipamento" class="rounded px-3 py-2 mb-6 text-black bg-gray-200">
                  <option value="">Todos</option>
                  <option v-for="maq in maquinas" :key="maq.id_maquina" :value="maq.id_maquina">{{ maq.nome }}</option>
                </select>
              </div>
              <div class="flex flex-col">
                <label for="status" class="mb-2 text-gray-600">Status:</label>
                <select v-model="filtros.status" id="status" class="rounded px-3 py-2 mb-6 text-black bg-gray-200">
                  <option value="">Todos</option>
                  <option value="Em manutenção">Em manutenção</option>
                  <option value="Concluída">Concluída</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>
              <div class="flex flex-col">
                <label for="data_inicio" class="mb-2 text-gray-600">Período:</label>
                <div class="flex items-center gap-2">
                  <input v-model="filtros.data_inicio" id="data_inicio" type="date" class="rounded px-3 py-2 text-black bg-gray-200" />
                  <span class="text-gray-600">a</span>
                  <input v-model="filtros.data_fim" id="data_fim" type="date" class="rounded px-3 py-2 text-black bg-gray-200" />
                </div>
              </div>
            </div>
          </template>
          <template #cell-maquina="{ item }">
            {{ item.maquina?.nome || '-' }}
          </template>
          <template #cell-data_manutencao="{ item }">
            {{ formatDateBR(item.data_manutencao) }}
          </template>
          <template #cell-custo="{ item }">
            {{ Number(item.custo || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
          </template>
        </ReportTable>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ReportTable from '~/components/ReportTable.vue';
const supabase = useSupabaseClient();
const manutencoes = ref([]);
const maquinas = ref([]);
const filtros = ref({
  equipamento: '',
  status: '',
  data_inicio: '',
  data_fim: '',
});
const abrirModalNovaManutencao = ref(false);
const novaManutencao = ref({
  id_maquina_fk: '',
  data_manutencao: '',
  tipo_manutencao: '',
  descricao: '',
  custo: '',
  realizada_por: '',
  horas_uso_na_manutencao: '',
});
const erroNovaManutencao = ref('');
const columns = [
  { key: 'maquina', label: 'Equipamento' },
  { key: 'data_manutencao', label: 'Data' },
  { key: 'tipo_manutencao', label: 'Tipo' },
  { key: 'descricao', label: 'Descrição' },
  { key: 'custo', label: 'Custo (R$)' },
  { key: 'realizada_por', label: 'Realizada por' },
  { key: 'horas_uso_na_manutencao', label: 'Horas de uso até manutenção' },
];

function formatDateBR(dateStr) {
  if (!dateStr) return '';
  const [yyyy, mm, dd] = dateStr.split('-');
  return `${dd}/${mm}/${yyyy}`;
}

definePageMeta({
  layout: 'dashboard',
});

const fetchManutencoes = async () => {
  const { data, error } = await supabase
    .from('manutencao')
    .select(`
      id_manutencao,
      id_maquina_fk,
      data_manutencao,
      tipo_manutencao,
      descricao,
      custo,
      realizada_por,
      horas_uso_na_manutencao,
      maquina(id_maquina, nome)
    `)
    .order('data_manutencao', { ascending: false });
  if (!error && data) {
    manutencoes.value = data;
  } else {
    manutencoes.value = [];
  }
};

const fetchMaquinas = async () => {
  const { data, error } = await supabase
    .from('maquina')
    .select('id_maquina, nome')
    .order('nome');
  if (!error) maquinas.value = data;
};

onMounted(() => {
  fetchManutencoes();
  fetchMaquinas();
});

const criarManutencao = async () => {
  erroNovaManutencao.value = '';
  if (!novaManutencao.value.id_maquina_fk || !novaManutencao.value.data_manutencao || !novaManutencao.value.tipo_manutencao) {
    erroNovaManutencao.value = 'Preencha todos os campos obrigatórios.';
    return;
  }
  const { error } = await supabase.from('manutencao').insert([
    { ...novaManutencao.value }
  ]);
  if (error) {
    erroNovaManutencao.value = 'Erro ao salvar: ' + (error.message || '');
    return;
  }
  abrirModalNovaManutencao.value = false;
  Object.assign(novaManutencao.value, { id_maquina_fk: '', data_manutencao: '', tipo_manutencao: '', descricao: '', custo: '', realizada_por: '', horas_uso_na_manutencao: '' });
  await fetchManutencoes();
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Quicksand', sans-serif;
  font-optical-sizing: auto;
}
</style>
