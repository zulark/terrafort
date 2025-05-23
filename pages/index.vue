<template>
   <div class="min-h-screen">
      <Carousel />
      <Cards />
      <section id="produtos">
         <div class="container mx-auto py-8 px-2">
            <h2 class="text-3xl font-bold mb-4 text-center">Destaques</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
               <div
                  v-for="(product, i) in products"
                  :key="i"
                  class="col-span-1 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
               >
                  <div
                     class="h-100 bg-cover bg-center"
                     :style="`background-image: url('${product.image}')`"
                  ></div>
                  <div class="p-4 flex-1 flex flex-col">
                     <h3 class="text-2xl font-bold mb-1">{{ product.name }}</h3>
                     <p class="text-green-700 text-xl font-semibold mb-1">R$ {{ product.price }} / dia</p>
                     <p class="text-gray-600 text-base mb-2 flex-1">{{ product.description }}</p>
                     <span
                        class="text-center inline-block px-2 py-1 rounded text-base font-semibold"
                        :class="product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                     >
                        {{ product.available ? 'Disponível' : 'Indisponível' }}
                     </span>
                     <NuxtLink to="/productDetails">
                        <button
                           class="mt-4 py-2 px-4 rounded transition-colors w-full text-white"
                           :class="product.available ?
                              'bg-yellow-500 hover:bg-yellow-600 cursor-pointer' :
                              'bg-yellow-500    cursor-not-allowed'"
                           :disabled="!product.available"
                        >
                           Alugar
                        </button>
                     </NuxtLink>
                  </div>
               </div>
               <NuxtLink to="/products" class="col-span-full text-center">
                  <button class="cursor-pointer mt-8 py-4 px-10 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
                     Ver Todos os Produtos
                  </button>
               </NuxtLink>
            </div>
   
         </div>
      </section>
   </div>
</template>

<script setup>
import Cards from '~/components/Cards.vue';
import Carousel from '~/components/Carousel.vue';

const products = [
   {
      name: 'Escavadeira Deere 180G ',
      price: '220,00',
      description: 'Escavadeira de 18 toneladas, ideal para obras de grande porte. Possui caçamba de 0,8m³ e motor potente.',
      available: true,
      image: 'https://www.deere.com.br/assets/images/region-3/products/excavators/180g-lc/escavadeira_180g_estudio_1_large_f5bf43c97d57e86b8d13d816cde23b1667ee3117.jpg'
   },
   {
      name: 'Escavadeira Volvo EC950EL',
      price: '875,00',
      description: 'Com mais de 424kN de força de desagregação e 408kN de força de arranque do braço, é um modelo que tem a combinação perfeita de potência e estabilidade para suportar tarefas de grande capacidade nas aplicações mais difíceis. ',
      available: false,
      image: 'https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/1860x1050-11?wid=1024'
   },
   {
      name: 'Escavadeira Compacta E680F',
      price: '440,00',
      description: 'A E680F é uma escavadeira compacta de 8 toneladas, ideal para espaços reduzidos. Possui caçamba de 0,4m³ e motor eficiente.',
      available: true,
      image: 'https://www.sdlgla.com/hubfs/Produtos%20Pt-Br/Resolu%C3%A7%C3%A3o%20%5BBAIXA%5D/E690F/Escav_E680F_2000x1330_Baixa_06.jpg'
   },

]
</script>

<style scoped></style>