<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center h-64">
      <span class="text-gray-300">Carregando dados financeiros...</span>
    </div>
    <div v-else>
      <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartData = ref(null);
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { display: true },
    title: { display: false },
  },
  scales: {
    x: { grid: { color: '#444' }, ticks: { color: '#fff' } },
    y: { grid: { color: '#444' }, ticks: { color: '#fff' } },
  },
});
const loading = ref(true);

async function fetchFinanceiro() {
  loading.value = true;
  // Busca receitas e despesas por mês
  const supabase = useSupabaseClient();
  const receitas = await supabase.from('locacao')
    .select('data_inicio, valor_total')
    .eq('status_locacao', 'Finalizada');
  const despesas = await supabase.from('manutencao')
    .select('data_manutencao, custo');
  // Agrupa por mês
  const receitaPorMes = {};
  const despesaPorMes = {};
  (receitas.data || []).forEach(l => {
    const mes = (l.data_inicio || '').slice(0,7);
    receitaPorMes[mes] = (receitaPorMes[mes] || 0) + (l.valor_total || 0);
  });
  (despesas.data || []).forEach(m => {
    const mes = (m.data_manutencao || '').slice(0,7);
    despesaPorMes[mes] = (despesaPorMes[mes] || 0) + (m.custo || 0);
  });
  // Meses ordenados
  const meses = Array.from(new Set([...Object.keys(receitaPorMes), ...Object.keys(despesaPorMes)])).sort();
  chartData.value = {
    labels: meses.map(m => m.split('-').reverse().join('/')),
    datasets: [
      {
        label: 'Receitas',
        backgroundColor: '#22c55e',
        data: meses.map(m => receitaPorMes[m] || 0),
      },
      {
        label: 'Despesas',
        backgroundColor: '#ef4444',
        data: meses.map(m => despesaPorMes[m] || 0),
      },
    ],
  };
  loading.value = false;
}

onMounted(fetchFinanceiro);
</script>

<style scoped>
</style>
