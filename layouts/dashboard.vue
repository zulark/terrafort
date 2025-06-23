<template>
    <div class="flex min-h-screen bg-gray-100">
        <aside class="w-64 bg-gray-800 text-white flex flex-col py-6 px-4">
            <div class="mb-8 flex items-center gap-2">
                <img src="https://images.vexels.com/media/users/3/246036/isolated/preview/7fc227bbf22130d9ae893fac3efe7885-ranchfarmdecor-icons-28.png"
                    alt="Terrafor Logo" class="h-16 w-16 mr-2"
                    style="filter: brightness(0) invert(70%) sepia(56%) saturate(2000%) brightness(100%) contrast(100%);">
                <div class="flex flex-col">
                    <div>
                        <span class="text-white">Terra</span>
                        <span class="text-yellow-500">Fort</span>
                    </div>
                    <span class="text-gray-400">Painel Admin</span>
                </div>
            </div>
            <nav class="flex-1">
                <ul class="space-y-2">
                    <li>
                        <NuxtLink to="/relatorios" class="block py-2 px-3 rounded hover:bg-yellow-600"
                            active-class="bg-yellow-700">Dashboard</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/relatorios/relatorio-disponibilidade"
                            class="block py-2 px-3 rounded hover:bg-yellow-600" active-class="bg-yellow-700">
                            Disponibilidade</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/relatorios/relatorio-locacao" class="block py-2 px-3 rounded hover:bg-yellow-600"
                            active-class="bg-yellow-700">Contratos</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/relatorios/relatorio-manutencao"
                            class="block py-2 px-3 rounded hover:bg-yellow-600" active-class="bg-yellow-700">Manutenção
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/relatorios/relatorio-financeiro"
                            class="block py-2 px-3 rounded hover:bg-yellow-600" active-class="bg-yellow-700">Rentabilidade
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/relatorios/relatorio-auditoria"
                            class="block py-2 px-3 rounded hover:bg-yellow-600" active-class="bg-yellow-700">Auditoria
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
            <div class="mt-8 text-xs text-gray-400">© {{ new Date().getFullYear() }} Terrafort</div>
        </aside>
        <main class="flex-1 p-6">
            <slot />
        </main>
    </div>
</template>

<script setup>
</script>

<style>
.router-link-exact-active {
    background: #facc15;
    color: #222;
}
</style>
