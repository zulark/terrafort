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
    legend: { display: true },
    title: { display: false },
  },
  scales: {
    x: { grid: { color: '#444' }, ticks: { color: '#fff' } },
    y: { grid: { color: '#444' }, ticks: { color: '#fff' } },
  },
});

async function fetchDisponibilidade() {
  const { $supabase } = useNuxtApp();
  const { data } = await $supabase.from('maquina').select('status');
  const statusCount = { 'Disponível': 0, 'Alugada': 0, 'Em manutenção': 0 };
  (data || []).forEach(m => {
    if (statusCount[m.status] !== undefined) statusCount[m.status]++;
  });
  chartData.value = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        label: 'Quantidade',
        backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
        data: Object.values(statusCount),
      },
    ],
  };
}

onMounted(fetchDisponibilidade);
</script>
