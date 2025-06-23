<template>
  <div class="min-h-screen">
    <div class="container mx-auto py-8 px-2 content-center">
      <h2 class="text-3xl font-bold mb-6 text-center">Relatório de Rentabilidade por Equipamento</h2>
      <ReportTable
        :items="maquinasFiltradas"
        :columns="columns"
        id-key="id_maquina"
        :items-per-page="10"
        search-placeholder="Pesquisar equipamento..."
        :search-keys="['nome']"
      >
        <template #filters>
          <div class="flex gap-3 mb-4">
            <div class="flex flex-col">
              <label for="equipamento" class="mb-2 text-gray-600">Equipamento:</label>
              <select v-model="filtros.equipamento" id="equipamento" class="rounded px-3 py-2 mb-6 text-black bg-gray-200">
                <option value="">Todos</option>
                <option v-for="item in maquinasFinanceiro" :key="item.id_maquina" :value="item.id_maquina">{{ item.nome }}</option>
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
        <template #cell-rentabilidade_liquida="{ item }">
          <span :class="Number(item.rentabilidade_liquida) >= 0 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'">
            {{ Number(item.rentabilidade_liquida).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
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
const maquinasFinanceiro = ref([]); // Rentabilidade por máquina
const filtros = ref({
  data_inicio: '',
  data_fim: '',
  equipamento: '',
});
const columns = [
  { key: 'nome', label: 'Equipamento' },
  { key: 'receita_total', label: 'Receita Total', format: v => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
  { key: 'custo_total_manutencao', label: 'Custo Total Manutenção', format: v => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
  { key: 'rentabilidade_liquida', label: 'Rentabilidade Líquida', format: (v, row) => `<span class='${Number(v) >= 0 ? 'text-green-400' : 'text-red-400'} font-bold'>${Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>` }
];

definePageMeta({
  layout: 'dashboard',
});

const fetchFinanceiro = async () => {
  // Busca rentabilidade por máquina (view ou tabela agregada)
  const { data: maqFin } = await supabase
    .from('rentabilidade_maquina')
    .select('id_maquina, nome, receita_total, custo_total_manutencao, rentabilidade_liquida');
  maquinasFinanceiro.value = maqFin || [];
};

onMounted(fetchFinanceiro);

// Filtro para rentabilidade por máquina
const maquinasFiltradas = computed(() => {
  let arr = maquinasFinanceiro.value;
  if (filtros.value.equipamento) {
    arr = arr.filter(item => item.id_maquina == filtros.value.equipamento);
  }
  if (filtros.value.data_inicio) {
    arr = arr.filter(item => !item.data_ultima_locacao || item.data_ultima_locacao >= filtros.value.data_inicio);
  }
  if (filtros.value.data_fim) {
    arr = arr.filter(item => !item.data_primeira_locacao || item.data_primeira_locacao <= filtros.value.data_fim);
  }
  return arr;
});
</script>
