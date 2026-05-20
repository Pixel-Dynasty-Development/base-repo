<script setup>
// Import your global components
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="bg-main-bg text-main-text flex min-h-screen flex-col">
    <Header :class="{ 'sticky top-0 z-50': $theme.layout.navSticky }" />

    <main
      class="container mx-auto grow px-4 py-8"
      :style="{ maxWidth: $theme.layout.maxWidth }"
    >
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Footer />
  </div>
</template>

<style>
/* Simple fade transition between pages */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
