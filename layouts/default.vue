<template>
    <div>
        <Navbar />
        <main class="bg-gray-100">
            <slot />
        </main>
        <Footer />
    </div>
</template>

<script setup>
import Navbar from '~/components/NavBar.vue';
import Footer from '~/components/Footer.vue';
</script>

<style scoped>
</style>