<template>
    <div id="background" class="flex items-center justify-center min-h-screen">
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-30 w-auto"
                    src="https://images.vexels.com/media/users/3/246036/isolated/preview/7fc227bbf22130d9ae893fac3efe7885-ranchfarmdecor-icons-28.png"
                    alt="Your Company"
                    style="filter: brightness(0) invert(70%) sepia(56%) saturate(2000%) brightness(100%) contrast(100%);" />
                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-700">Criar uma conta
                </h2>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" @submit.prevent="handleRegister">
                    <div>
                        <label for="name" class="block text-sm/6 font-medium text-gray-700">Nome</label>
                        <div class="mt-2">
                            <input v-model="dataForm.name" type="text" name="name" id="name" autocomplete="name"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                        <p v-if="errorMsg.name" class="mt-1 text-xs text-red-400">{{ errorMsg.name }}</p>
                    </div>

                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-700">Email</label>
                        <div class="mt-2">
                            <input v-model="dataForm.email" type="email" name="email" id="email" autocomplete="email"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                        <p v-if="errorMsg.email" class="mt-1 text-xs text-red-400">{{ errorMsg.email }}</p>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium text-gray-700">Senha</label>
                        </div>
                        <div class="mt-2">
                            <input v-model="dataForm.password" type="password" name="password" id="password"
                                autocomplete="current-password"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                        <p v-if="errorMsg.password" class="mt-1 text-xs text-red-400">{{ errorMsg.password }}</p>
                        <div class="flex items-center justify-between mt-2">
                            <label for="confirmPassword" class="block text-sm/6 font-medium text-gray-700">Confirmar
                                Senha</label>
                        </div>
                        <div class="mt-2">
                            <input v-model="dataForm.confirmPassword" type="password" name="confirmPassword"
                                id="confirmPassword" autocomplete="current-password"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                        <p v-if="errorMsg.confirmPassword" class="mt-1 text-xs text-red-400">{{ errorMsg.confirmPassword
                            }}</p>
                    </div>
                    <div v-if="errorMsg.general" class="mt-2 text-center text-sm text-red-400">
                        <p>{{ errorMsg.general }}</p>
                    </div>
                    <div>
                        <button type="submit"
                            class="cursor-pointer flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">Cadastrar-se
                        </button>
                    </div>
                    <div class="w-full flex items-center justify-between my-6">
                        <hr class="w-full border-gray-300" />
                        <span class="px-4 text-gray-700 text-sm">ou continue com</span>
                        <hr class="w-full border-gray-300" />
                    </div>

                    <div class="flex gap-4 justify-center">
                        <button
                            class="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                                class="w-5 h-5" />
                            <span class="text-sm text-gray-700">Google</span>
                        </button>

                        <button
                            class="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                            <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub"
                                class="w-5 h-5" />
                            <span class="text-sm text-gray-700">GitHub</span>
                        </button>
                    </div>

                </form>
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

const dataForm = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const errorMsg = ref({});

const handleRegister = async () => {
    try {
        errorMsg.value = {};
        let hasError = false;

        if (dataForm.value.name.trim() === '') {
            errorMsg.value.name = 'O nome é obrigatório.';
            hasError = true;
        }
        if (dataForm.value.email.trim() === '') {
            errorMsg.value.email = 'O email é obrigatório.';
            hasError = true;
        }
        if (dataForm.value.password.length < 6) {
            errorMsg.value.password = 'A senha deve ter pelo menos 6 caracteres.';
            hasError = true;
        }
        if (dataForm.value.password !== dataForm.value.confirmPassword) {
            errorMsg.value.confirmPassword = 'As senhas não coincidem.';
            hasError = true;
        }

        if (hasError) return;

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: dataForm.value.email,
            password: dataForm.value.password,
        });

        if (authError) {
            if (authError.message.toLowerCase().includes('email')) {
                errorMsg.value.email = authError.message;
            } else {
                errorMsg.value.general = authError.message;

            }
            return;
        }

        if (authData && authData.user) {
            const userId = authData.user.id;
            const userName = dataForm.value.name;

            const { error: profileError } = await supabase
                .from('cliente')
                .insert([
                    {
                        user_id: userId,
                        nome: userName
                    }
                ]);

            if (profileError) {
                console.error('Erro ao salvar perfil do cliente:', profileError);
                errorMsg.value.general = 'Usuário registrado, mas houve um problema ao salvar dados adicionais. Por favor, contate o suporte.';
                return;
            }
            if (authData.user && !authData.session) {
                alert('Registro bem-sucedido! Por favor, verifique seu e-mail para confirmar sua conta antes de fazer login.');
                router.push('/login');
            } else if (authData.user && authData.session) {
                router.push('/');
            } else {
                router.push('/login');
            }

        } else {
            errorMsg.value.general = "Registro falhou de forma inesperada.";
        }

    } catch (error) {
        console.error('Erro geral ao registrar:', error);
        errorMsg.value.general = 'Ocorreu um erro inesperado durante o registro.';
    }
};

</script>

<style scoped>
#background {
    background-color: #f2f2f2;
}
</style>