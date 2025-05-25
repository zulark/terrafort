  <template>
    <nav class="bg-black shadow-md">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <div class="flex-shrink-0">
            <a href="/" class="text-2xl font-bold text-gray-200 flex items-center">
              <img
                src="https://images.vexels.com/media/users/3/246036/isolated/preview/7fc227bbf22130d9ae893fac3efe7885-ranchfarmdecor-icons-28.png"
                alt="Terrafor Logo" class="h-16 w-16 mr-2"
                style="filter: brightness(0) invert(70%) sepia(56%) saturate(2000%) brightness(100%) contrast(100%);">
              <span class="text-white">Terra</span><span class="text-yellow-500">Fort</span>
            </a>
          </div>
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/" :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              route.path === '/' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-200 hover:text-yellow-500 hover:border-b-2 hover:border-yellow-500'
            ]">
              Home
            </NuxtLink>
            <NuxtLink to="/products" :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              route.path === '/products' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-200 hover:text-yellow-500 hover:border-b-2 hover:border-yellow-500'
            ]">
              Equipamentos
            </NuxtLink>
            <div v-if="userName">
              <span class="text-gray-200">Olá, </span>
              <span class="text-gray-200 capitalize font-bold"> {{ userName }}</span>
              <button @click="handleLogout"
                class="cursor-pointer mx-5 px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-yellow-500">
                Sair
              </button>
            </div>
            <div v-else>
              <NuxtLink to="/login" :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                route.path === '/login' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-200 hover:text-yellow-500 hover:border-b-2 hover:border-yellow-500'
              ]">
                Login
              </NuxtLink>
              <NuxtLink to="/signup" :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                route.path === '/signup' ? 'text-white bg-yellow-600' : 'text-white bg-yellow-500 hover:bg-yellow-600'
              ]">
                Cadastre-se
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="md:hidden flex items-center">
          <button @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-200 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NuxtLink to="/" :class="[
            'block px-3 py-2 rounded-md text-base font-medium',
            route.path === '/' ? 'text-yellow-500 bg-gray-100' : 'text-gray-200 hover:bg-gray-50 hover:text-yellow-500'
          ]">Home</NuxtLink>
          <NuxtLink to="/products" :class="[
            'block px-3 py-2 rounded-md text-base font-medium',
            route.path === '/products' ? 'text-yellow-500 bg-gray-100' : 'text-gray-200 hover:bg-gray-50 hover:text-yellow-500'
          ]">Equipamentos</NuxtLink>
          <NuxtLink to="/login" :class="[
            'block px-3 py-2 rounded-md text-base font-medium',
            route.path === '/login' ? 'text-yellow-500 bg-gray-100' : 'text-gray-200 hover:bg-gray-50 hover:text-yellow-500'
          ]">Login</NuxtLink>
          <NuxtLink to="/signup" :class="[
            'block px-3 py-2 rounded-md text-base font-medium',
            route.path === '/signup' ? 'bg-yellow-600 text-white' : 'bg-yellow-500 text-white hover:bg-yellow-600'
          ]">Cadastre-se</NuxtLink>
        </div>
      </div>
    </nav>
  </template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const mobileMenuOpen = ref(false);
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();
const route = useRoute();
const userName = ref('');


interface ClienteProfile {
  nome: string;
}

watchEffect(async () => {
  if (user.value && user.value.id) {
    try {
      const { data, error } = await supabase
        .from('cliente')
        .select('nome')
        .eq('user_id', user.value.id)
        .single<ClienteProfile>();

      if (error) {
        console.error("Erro ao buscar nome do usuário:", error.message);
        userName.value = '';
      } else if (data) {
        userName.value = data.nome;
      } else {
        userName.value = '';
      }
    } catch (e) {
      console.error("Erro ao buscar nome do usuário:", e);
      userName.value = '';
    }
  } else {
    userName.value = '';
  }
});

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Erro ao sair:', error.message);
  } else {
    return;
  }
};


</script>

<style scoped></style>