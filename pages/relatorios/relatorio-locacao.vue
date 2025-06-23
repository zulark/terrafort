<template>
  <div class="min-h-screen">
    <div class="container mx-auto py-8 px-2 content-center">
      <h2 class="text-3xl font-bold mb-6 text-center">Relatório de Locações/Contratos</h2>
      <ReportTable :items="locacoes" :columns="columns" id-key="id_locacao" :items-per-page="10"
        search-placeholder="Pesquisar locação..."
        :search-keys="['cliente.nome', 'maquina.nome', 'status_locacao', 'data_inicio', 'data_fim_prevista', 'valor_total']"
        :custom-filter="(arr, search) => {
          // Filtros de equipamento, data, status + busca textual
          return arr.filter(loc => {
            const eq = !filtros.equipamento || (loc.maquina && loc.maquina.id_maquina == filtros.equipamento);
            let dt = true;
            if (filtros.data_inicio) dt = dt && loc.data_inicio >= filtros.data_inicio;
            if (filtros.data_fim) dt = dt && loc.data_fim_prevista <= filtros.data_fim;
            let st = true;
            if (filtros.status) st = loc.status_locacao === filtros.status;
            // Busca textual
            if (search) {
              const t = search.toLowerCase();
              return eq && dt && st && (
                (loc.cliente?.nome || '').toLowerCase().includes(t) ||
                (loc.maquina?.nome || '').toLowerCase().includes(t) ||
                (loc.status_locacao || '').toLowerCase().includes(t) ||
                (loc.data_inicio || '').toLowerCase().includes(t) ||
                (loc.data_fim_prevista || '').toLowerCase().includes(t) ||
                (loc.valor_total + '').toLowerCase().includes(t)
              );
            }
            return eq && dt && st;
          });
        }">
        <template #filters>
          <!-- Filtros específicos -->
          <div class="flex gap-3">
            <div class="flex flex-col">
              <label for="equipamento" class="mb-2 text-gray-600">Equipamento:</label>
              <select v-model="filtros.equipamento"
                class="rounded px-3 py-2 mb-6 text-black bg-gray-200">
                <option value="">Todos</option>
                <option v-for="maq in maquinas" :key="maq.id_maquina" :value="maq.id_maquina">{{ maq.nome }}</option>
              </select>
            </div>
            <div class="flex flex-col">
              <label for="data_inicio" class="mb-2 text-gray-600">Período:</label>
              <div class="flex gap-1">
                <input v-model="filtros.data_inicio" type="date"
                  class="rounded px-3 py-2 mb-6 text-black bg-gray-200" />
                <span class="text-black">-</span>
                <input v-model="filtros.data_fim" type="date"
                  class="rounded px-3 py-2 mb-6 text-black bg-gray-200" />
              </div>
            </div>
            <div class="flex flex-col">
              <label for="status" class="mb-2 text-gray-600">Status:</label>
              <select v-model="filtros.status" class="rounded px-3 py-2 mb-6 text-black bg-gray-200">
                <option value="">Todos</option>
                <option value="Ativa">Ativa</option>
                <option value="Pendente">Pendente</option>
                <option value="Finalizada">Finalizada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
          </div>
        </template>
        <template #cell-cliente="{ item }">
          {{ item.cliente?.nome || '-' }}
        </template>
        <template #cell-maquina="{ item }">
          {{ item.maquina?.nome || '-' }}
        </template>
        <template #cell-data_inicio="{ item }">
          {{ formatDateBR(item.data_inicio) }}
        </template>
        <template #cell-data_fim_prevista="{ item }">
          {{ formatDateBR(item.data_fim_prevista) }}
        </template>
        <template #cell-valor_total="{ item }">
          {{ Number(item.valor_total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
        </template>
        <template #cell-status_locacao="{ item }">
          <span :class="{
            'bg-green-100 text-green-800 px-2 py-1 rounded': item.status_locacao === 'Ativa',
            'bg-yellow-100 text-yellow-800 px-2 py-1 rounded': item.status_locacao === 'Pendente',
            'bg-gray-100 text-gray-800 px-2 py-1 rounded': item.status_locacao === 'Finalizada',
            'bg-red-100 text-red-800 px-2 py-1 rounded': item.status_locacao === 'Cancelada',
          }">
            {{ item.status_locacao }}
          </span>
        </template>
      </ReportTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ReportTable from '~/components/ReportTable.vue';

const supabase = useSupabaseClient();
const locacoes = ref([]);
const maquinas = ref([]);
const filtros = ref({
  equipamento: '',
  status: '',
  data_inicio: '',
  data_fim: '',
});
const searchTerm = ref("");
const sortKey = ref('data_inicio');
const sortOrder = ref('desc');
const columns = [
  { key: 'cliente', label: 'Cliente' },
  { key: 'maquina', label: 'Equipamento' },
  { key: 'data_inicio', label: 'Início' },
  { key: 'data_fim_prevista', label: 'Fim Previsto' },
  { key: 'valor_total', label: 'Valor (R$)' },
  { key: 'status_locacao', label: 'Status' },
];

function formatDateBR(dateStr) {
  if (!dateStr) return '';
  const [yyyy, mm, dd] = dateStr.split('-');
  return `${dd}/${mm}/${yyyy}`;
}

definePageMeta({
  layout: 'dashboard',
});

const fetchLocacoes = async () => {
  const { data, error } = await supabase
    .from('locacao')
    .select('id_locacao, data_inicio, data_fim_prevista, valor_total, status_locacao, cliente(id, nome), maquina(id_maquina, nome)')
    .order('data_inicio', { ascending: false });
  if (!error) locacoes.value = data;
};

const fetchMaquinas = async () => {
  const { data, error } = await supabase
    .from('maquina')
    .select('id_maquina, nome')
    .order('nome');
  if (!error) maquinas.value = data;
};

onMounted(() => {
  fetchLocacoes();
  fetchMaquinas();
});

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

const locacoesFiltradas = computed(() => {
  return locacoes.value.filter(loc => {
    const eq = !filtros.value.equipamento || (loc.maquina && loc.maquina.id_maquina == filtros.value.equipamento);
    let dt = true;
    if (filtros.value.data_inicio) dt = dt && loc.data_inicio >= filtros.value.data_inicio;
    if (filtros.value.data_fim) dt = dt && loc.data_fim_prevista <= filtros.value.data_fim;
    let st = true;
    if (filtros.value.status) st = loc.status_locacao === filtros.value.status;
    return eq && dt && st;
  });
});

const locacoesOrdenadasFiltradas = computed(() => {
  let arr = locacoesFiltradas.value;
  // Pesquisa textual
  if (searchTerm.value) {
    const t = searchTerm.value.toLowerCase();
    arr = arr.filter(loc =>
      (loc.cliente?.nome || '').toLowerCase().includes(t) ||
      (loc.maquina?.nome || '').toLowerCase().includes(t) ||
      (loc.status_locacao || '').toLowerCase().includes(t) ||
      (loc.data_inicio || '').toLowerCase().includes(t) ||
      (loc.data_fim_prevista || '').toLowerCase().includes(t) ||
      (loc.valor_total + '').toLowerCase().includes(t)
    );
  }
  // Ordenação
  return arr.slice().sort((a, b) => {
    let aVal, bVal;
    if (sortKey.value === 'cliente') {
      aVal = a.cliente?.nome || '';
      bVal = b.cliente?.nome || '';
    } else if (sortKey.value === 'maquina') {
      aVal = a.maquina?.nome || '';
      bVal = b.maquina?.nome || '';
    } else {
      aVal = a[sortKey.value] ?? '';
      bVal = b[sortKey.value] ?? '';
    }
    if (aVal === bVal) return 0;
    if (sortOrder.value === 'asc') return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });
});
</script>

<style scoped></style>
