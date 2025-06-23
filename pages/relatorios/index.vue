<template>
  <div>
    <h1 class="text-4xl font-bold mb-8 text-center">Dashboard de Relatórios</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-gray-700 rounded-lg p-6 shadow">
        <h2 class="text-xl font-semibold mb-4 text-white">Receitas vs Despesas (Mensal)</h2>
        <ClientOnly>
          <FinanceChart />
        </ClientOnly>
      </div>
      <div class="bg-gray-700 rounded-lg p-6 shadow">
        <h2 class="text-xl font-semibold mb-4 text-white">Status dos Equipamentos</h2>
        <ClientOnly>
          <DisponibilidadeChart />
        </ClientOnly>
      </div>
      <div class="bg-gray-700 rounded-lg p-6 shadow">
        <h2 class="text-xl font-semibold mb-4 text-white">Manutenções por Tipo</h2>
        <ClientOnly>
          <ManutencaoChart />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
import FinanceChart from '~/components/FinanceChart.vue';
import DisponibilidadeChart from '~/components/DisponibilidadeChart.vue';
import ManutencaoChart from '~/components/ManutencaoChart.vue';
definePageMeta({
  layout: 'dashboard',
});
</script>

<style scoped>
</style>
