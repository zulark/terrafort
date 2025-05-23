<template>
  <section class="py-16 sm:py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Equipamentos Robustos"
          description="Máquinas potentes e em perfeito estado"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.471-2.471a1.085 1.085 0 0 0-1.536-1.536L9.914 13.635m2.471-2.471L5.877 5.877a2.652 2.652 0 0 0-3.75 3.75L8.398 16.081" />
            </svg>
          </template>
        </FeatureCard>

        <FeatureCard
          title="Entrega Rápida"
          description="Disponibilidade imediata na sua obra"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
          </template>
        </FeatureCard>

        <FeatureCard
          title="Segurança Garantida"
          description="Todos os equipamentos com manutenção em dia"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </template>
        </FeatureCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FeatureCard from './FeatureCard.vue';
// Os ícones SVG foram colocados diretamente no template.
// Você pode também importá-los como componentes se preferir.
</script>