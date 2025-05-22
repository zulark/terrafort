<template>
  <div class="relative bg-gray-800 text-white overflow-hidden hero-carousel">
    <div
      v-for="(slide, index) in slides"
      :key="slide.id"
      class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      :class="{ 'opacity-100': index === currentIndex, 'opacity-0': index !== currentIndex }"
      role="tabpanel"
      :aria-hidden="index !== currentIndex"
      :id="`slide-${slide.id}`"
      aria-labelledby="`slide-tab-${slide.id}`"
    >
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url('${slide.imageUrl}')` }"
      >
        <div class="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center py-16 md:py-24">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight slide-title">
          {{ slide.title }}
        </h1>
        <p class="mt-6 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-gray-200 slide-subtitle">
          {{ slide.subtitle }}
        </p>
        <div class="mt-10">
          <a
            :href="slide.buttonLink || '#'"
            class="inline-block bg-red-600 text-white font-semibold uppercase text-sm px-8 py-4 rounded-md hover:bg-red-700 transition-colors shadow-lg slide-button"
          >
            {{ slide.buttonText }}
          </a>
        </div>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 ml-2 sm:ml-4 p-3 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full text-white focus:outline-none z-10"
      aria-label="Slide anterior"
      aria-controls="slide-content"
    >
      <svg class="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 sm:mr-4 p-3 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full text-white focus:outline-none z-10"
      aria-label="Próximo slide"
      aria-controls="slide-content"
    >
      <svg class="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <div class="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10" role="tablist" aria-label="Navegação dos slides">
      <button
        v-for="(slide, index) in slides"
        :key="`dot-${slide.id}`"
        @click="goToSlide(index)"
        class="w-3 h-3 sm:w-4 sm:h-4 rounded-full focus:outline-none transition-colors"
        :class="{ 'bg-white': index === currentIndex, 'bg-gray-400 hover:bg-gray-200': index !== currentIndex }"
        :aria-selected="index === currentIndex"
        :aria-controls="`slide-${slide.id}`"
        :id="`slide-tab-${slide.id}`"
        role="tab"
        :aria-label="`Ir para o slide ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Slide {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink?: string;
}

// Definição dos slides com os novos textos
// Por favor, substitua as imageUrl por URLs reais das suas imagens.
const slides = ref<Slide[]>([
  {
    id: 1,
    imageUrl: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?cs=srgb&dl=pexels-rezwan-1078884.jpg&fm=jpg',
    title: 'SUPORTE ESPECIALIZADO',
    subtitle: 'Nossa equipe técnica está pronta para auxiliar na escolha do equipamento ideal',
    buttonText: 'FALE COM UM ESPECIALISTA',
    buttonLink: '#contato',
  },
  {
    id: 2,
    imageUrl: 'https://cacarvalho.com.br/wp-content/uploads/2021/05/canteiro-de-obras.jpg', // Exemplo: Canteiro de obras amplo
    title: 'FORÇA PARA SUA OBRA!',
    subtitle: 'Os melhores equipamentos de terraplanagem com preços competitivos',
    buttonText: 'VER EQUIPAMENTOS',
    buttonLink: '#equipamentos',
  },
  {
    id: 3,
    imageUrl: '../img/slide3.png', // Exemplo: Maquinário em detalhe
    title: 'LOCAÇÃO FLEXÍVEL',
    subtitle: 'Alugue por dias, semanas ou meses conforme sua necessidade',
    buttonText: 'CONHEÇA NOSSOS PLANOS',
    buttonLink: '#planos',
  },
]);

const currentIndex = ref(0);
let autoplayInterval: ReturnType<typeof setInterval> | null = null;
const autoplayDelay = 5000; // 5 segundos

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  resetAutoplay();
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
  resetAutoplay();
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
  resetAutoplay();
};

const startAutoplay = () => {
  if (autoplayInterval) clearInterval(autoplayInterval);
  autoplayInterval = setInterval(nextSlide, autoplayDelay);
};

const resetAutoplay = () => {
  if (autoplayInterval) clearInterval(autoplayInterval);
  startAutoplay();
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
});
</script>

<style scoped>
.hero-carousel {
  min-height: 70vh; 

}

.slide-title, .slide-subtitle, .slide-button {
  animation: fadeInText 0.8s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInText {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.opacity-100 .slide-title {
  animation-delay: 0.3s;
}
.opacity-100 .slide-subtitle {
  animation-delay: 0.5s;
}
.opacity-100 .slide-button {
  animation-delay: 0.7s;
}

.opacity-0 {
  pointer-events: none; 
}
</style>