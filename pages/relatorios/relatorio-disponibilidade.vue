<template>
  <div class="min-h-screen">
    <div class="container mx-auto py-8 px-2 content-center">
      <h2 class="text-3xl font-bold mb-6 text-center">Relatório de Disponibilidade e Utilização</h2>
      <ReportTable :items="maquinas" :columns="columns" id-key="id_maquina" :items-per-page="10"
        search-placeholder="Pesquisar máquina..." :search-keys="['nome', 'categoria_maquina.nome_categoria', 'status']"
        :custom-filter="(arr, search) => {
          // Filtros de categoria, status + busca textual
          return arr.filter(m => {
            const cat = !filtros.categoria || (m.categoria_maquina && m.categoria_maquina.nome_categoria === filtros.categoria);
            const st = !filtros.status || m.status === filtros.status;
            if (search) {
              const t = search.toLowerCase();
              return cat && st && (
                (m.nome || '').toLowerCase().includes(t) ||
                (m.categoria_maquina?.nome_categoria || '').toLowerCase().includes(t) ||
                (m.status || '').toLowerCase().includes(t)
              );
            }
            return cat && st;
          });
        }">
        <template #filters>
          <!-- Filtros específicos -->
          <div class="flex gap-3">
            <div class="flex flex-col">
              <label for="categoria" class="mb-2 text-gray-600">Categoria:</label>
              <select v-model="filtros.categoria" id="categoria" class="rounded px-3 py-2 mb-6 text-black bg-gray-200">
                <option value="">Todas</option>
                <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div class="flex flex-col">
              <label for="status" class="mb-2 text-gray-600">Status:</label>
              <select v-model="filtros.status" id="status" class="rounded px-3 py-2 mb-6 text-black bg-gray-200">
                <option value="">Todos</option>
                <option value="Disponível">Disponível</option>
                <option value="Alugada">Alugada</option>
                <option value="Em manutenção">Em manutenção</option>
              </select>
            </div>
          </div>
        </template>
        <template #cell-categoria="{ item }">
          {{ item.categoria_maquina?.nome_categoria || '-' }}
        </template>
        <template #cell-status="{ item }">
          <select v-model="item.status"
                  @change="updateMachineStatus(item.id_maquina, $event.target.value)"
                  :class="getStatusClasses(item.status)"
                  class="appearance-none rounded px-3 py-1 font-semibold text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
            <option value="Disponível">Disponível</option>
            <option value="Alugada">Alugada</option>
            <option value="Em manutenção">Em manutenção</option>
          </select>
        </template>
      </ReportTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ReportTable from '~/components/ReportTable.vue';
const supabase = useSupabaseClient();
const maquinas = ref([]);
const filtros = ref({
  categoria: '',
  status: '',
});
const searchTerm = ref("");
const sortKey = ref('nome');
const sortOrder = ref('asc');
const columns = [
  { key: 'nome', label: 'Nome' },
  { key: 'categoria', label: 'Categoria' },
  { key: 'status', label: 'Status' },
];
const categorias = ref([]);

definePageMeta({
  layout: 'dashboard',
});

const fetchMaquinas = async () => {
  const { data, error } = await supabase
    .from('maquina')
    .select('id_maquina, nome, status, categoria_maquina(nome_categoria)')
    .order('nome', { ascending: true });
  if (error) {
    console.error('Erro ao buscar máquinas:', error);
  } else {
    maquinas.value = data;
    // Preenche categorias únicas
    const set = new Set(data.map(m => m.categoria_maquina?.nome_categoria).filter(Boolean));
    categorias.value = Array.from(set);
  }
};

onMounted(fetchMaquinas);

const getStatusClasses = (status) => {
  switch (status) {
    case 'Disponível':
      return 'bg-green-100 text-green-800';
    case 'Alugada':
      return 'bg-yellow-100 text-yellow-800';
    case 'Em manutenção':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const updateMachineStatus = async (machineId, newStatus) => {
  const { error } = await supabase
    .from('maquina')
    .update({ status: newStatus })
    .eq('id_maquina', machineId);

  if (error) {
    console.error('Erro ao atualizar status da máquina:', error.message);
    await fetchMaquinas(); // Recarrega para reverter a UI em caso de erro
  } else {
    const machine = maquinas.value.find(m => m.id_maquina === machineId);
    if (machine) {
      machine.status = newStatus;
    }
  }
};

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}
</script>

<style scoped>
body {
  background-color: #f3f3f3;
}
</style>