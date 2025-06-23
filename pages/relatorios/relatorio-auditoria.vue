<template>
  <div class="min-h-screen">
    <div class="container mx-auto py-8 px-2 content-center">
      <h2 class="text-3xl font-bold mb-6 text-center">Relatório de Auditoria de Equipamentos</h2>
      <ReportTable
        :items="auditoriasFiltradas"
        :columns="columns"
        id-key="id_manutencao"
        :items-per-page="10"
        search-placeholder="Pesquisar equipamento, responsável, observação..."
        :search-keys="['maquina.nome','realizada_por','descricao']"
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
              <label for="data_inicio" class="mb-2 text-gray-600">Período:</label>
              <div class="flex gap-1">
                <input v-model="filtros.data_inicio" id="data_inicio" type="date" class="rounded px-2 py-1 text-black bg-gray-200" />
                <span class="text-gray-200">a</span>
                <input v-model="filtros.data_fim" id="data_fim" type="date" class="rounded px-2 py-1 text-black bg-gray-200" />
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
      </ReportTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ReportTable from '~/components/ReportTable.vue';

definePageMeta({
  layout: 'dashboard',
});

const supabase = useSupabaseClient();
const auditorias = ref([]);
const maquinas = ref([]);
const filtros = ref({
  equipamento: '',
  data_inicio: '',
  data_fim: '',
});
const columns = [
  { key: 'maquina', label: 'Equipamento' },
  { key: 'data_manutencao', label: 'Data' },
  { key: 'descricao', label: 'Observação' },
  { key: 'realizada_por', label: 'Responsável' },
];

function formatDateBR(dateStr) {
  if (!dateStr) return '';
  const [yyyy, mm, dd] = dateStr.split('-');
  return `${dd}/${mm}/${yyyy}`;
}

const fetchAuditorias = async () => {
  if (!supabase || typeof supabase.from !== 'function') {
    console.error('Supabase client não inicializado corretamente.');
    return;
  }
  // Considera manutenções como auditorias (ajuste conforme estrutura real)
  const { data } = await supabase
    .from('manutencao')
    .select('id_manutencao, id_maquina_fk, data_manutencao, descricao, realizada_por, maquina(id_maquina, nome)')
    .order('data_manutencao', { ascending: false });
  auditorias.value = data || [];
};

const fetchMaquinas = async () => {
  if (!supabase || typeof supabase.from !== 'function') {
    console.error('Supabase client não inicializado corretamente.');
    return;
  }
  const { data } = await supabase
    .from('maquina')
    .select('id_maquina, nome')
    .order('nome');
  maquinas.value = data || [];
};

onMounted(() => {
  fetchAuditorias();
  fetchMaquinas();
});

const auditoriasFiltradas = computed(() => {
  let arr = auditorias.value;
  if (filtros.value.equipamento) {
    arr = arr.filter(a => a.maquina && a.maquina.id_maquina == filtros.value.equipamento);
  }
  if (filtros.value.data_inicio) {
    arr = arr.filter(a => a.data_manutencao >= filtros.value.data_inicio);
  }
  if (filtros.value.data_fim) {
    arr = arr.filter(a => a.data_manutencao <= filtros.value.data_fim);
  }
  return arr;
});
</script>
