<template>
  <div>
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartData = ref(null);
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Rentabilidade Líquida por Equipamento', color: '#fff' },
    tooltip: { callbacks: { label: ctx => `R$ ${Number(ctx.parsed.y).toLocaleString('pt-BR')}` } }
  },
  scales: {
    x: { grid: { color: '#444' }, ticks: { color: '#fff' } },
    y: { grid: { color: '#444' }, ticks: { color: '#fff' } },
  },
});

const supabase = useSupabaseClient();

async function fetchRentabilidade() {
  const { data, error } = await supabase.from('rentabilidade_maquina').select('nome, rentabilidade_liquida');
  if (error || !data) {
    chartData.value = null;
    return;
  }
  chartData.value = {
    labels: data.map(e => e.nome),
    datasets: [
      {
        label: 'Rentabilidade Líquida',
        backgroundColor: data.map(e => Number(e.rentabilidade_liquida) >= 0 ? '#22c55e' : '#ef4444'),
        data: data.map(e => Number(e.rentabilidade_liquida)),
      },
    ],
  };
}

onMounted(fetchRentabilidade);
</script>
