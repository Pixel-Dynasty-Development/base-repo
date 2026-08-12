<script setup>
// Import your global components
import { ref } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import CartDrawer from './components/CartDrawer.vue'

const cartOpen = ref(false)
const toggleCart = () => { 
  // store last focused element so CartDrawer can return focus when closed
  if (!cartOpen.value && typeof window !== 'undefined') {
    window.__lastFocusedElement = document.activeElement
  }
  cartOpen.value = !cartOpen.value 
}
</script>

<template>
  <div class="bg-main-bg text-main-text flex min-h-screen flex-col">
    <Header :class="{ 'sticky top-0 z-50': $theme.layout.navSticky }" @toggle-cart="toggleCart" />

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

    <CartDrawer v-if="cartOpen" @close="toggleCart" />
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
