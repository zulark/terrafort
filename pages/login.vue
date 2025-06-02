<template>
    <div id="background" class="flex items-center justify-center min-h-screen">
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-30 w-auto"
                    src="https://images.vexels.com/media/users/3/246036/isolated/preview/7fc227bbf22130d9ae893fac3efe7885-ranchfarmdecor-icons-28.png"
                    alt="Your Company"
                    style="filter: brightness(0) invert(70%) sepia(56%) saturate(2000%) brightness(100%) contrast(100%);" />
                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-700">Entrar na sua conta
                </h2>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" @submit.prevent="handleLogin">
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-700">Email</label>
                        <div class="mt-2">
                            <input v-model="email" type="email" name="email" id="email" autocomplete="email" required
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium text-gray-700">Senha</label>
                            <div class="text-sm">
                                <a href="#" class="font-semibold text-yellow-600 hover:text-yellow-500">Esqueceu a
                                    senha?</a>
                            </div>
                        </div>
                        <div class="mt-2">
                            <input v-model="password" type="password" name="password" id="password"
                                autocomplete="current-password" required
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                    <div v-if="errorMsg" class="mt-2 text-center text-sm text-red-400">
                        <p>{{ errorMsg }}</p>
                    </div>
                    <div>
                        <button type="submit"
                            class="cursor-pointer flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">Entrar
                        </button>
                    </div>
                </form>

                <p class="mt-10 text-center text-sm/6 text-gray-700">
                    Ainda não tem uma conta?
                    {{ ' ' }}
                    <a href="./signup" class="font-semibold text-yellow-600 hover:text-yellow-500">Cadastre-se</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
    layout: false,
});

const supabase = useSupabaseClient();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMsg = ref(null);
const isLoading = ref(false);

const handleLogin = async () => {
    try {
        errorMsg.value = null;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });
        isLoading.value = true;

        if (error) {
            throw error;
        }

        router.push('/');
    } catch (err) {
        if (err && typeof err.message === 'string') {
            errorMsg.value = err.message;
        } else if (err && err.error_description) {
            errorMsg.value = err.error_description;
        }
        else {
            errorMsg.value = "Ocorreu um erro inesperado ao tentar fazer login.";
        }
        console.error("Erro no login:", err);
    }
};
</script>

<style scoped>
#background {
    background-color: #f2f2f2;
}
</style>