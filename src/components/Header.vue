<script setup>
import { ref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header
    class="border-border-subtle bg-surface/80 sticky top-0 z-50 border-b backdrop-blur-md transition-colors"
  >
    <div
      class="mx-auto flex h-16 items-center justify-between px-4"
      :style="{ maxWidth: $theme.layout.maxWidth }"
    >
      <router-link to="/" class="flex items-center gap-2">
        <span class="text-primary text-xl font-bold tracking-tight">
          {{ $config.businessName }}
        </span>
      </router-link>

      <nav class="hidden items-center gap-6 md:flex">
        <router-link
          v-for="link in $config.navigation"
          :key="link.path"
          :to="link.path"
          class="text-main-text hover:text-primary text-sm font-medium transition-colors"
          active-class="!text-primary"
        >
          {{ link.name }}
        </router-link>

        <div
          class="border-border-subtle ml-2 flex items-center gap-4 border-l pl-6"
        >
          <ThemeToggle />
          <router-link
            to="/contact"
            class="rounded-custom bg-primary px-5 py-2 text-sm font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-95"
          >
            Contact Us
          </router-link>
        </div>
      </nav>

      <div class="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          @click="toggleMenu"
          class="text-main-text p-2 outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            v-if="!isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-4 transform opacity-0"
      enter-to-class="translate-y-0 transform opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 transform opacity-100"
      leave-to-class="-translate-y-4 transform opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="border-border-subtle bg-surface border-b md:hidden"
      >
        <nav class="flex flex-col space-y-4 p-6">
          <router-link
            v-for="link in $config.navigation"
            :key="link.path"
            :to="link.path"
            @click="isMenuOpen = false"
            class="text-main-text hover:text-primary text-base font-medium transition-colors"
            active-class="text-primary"
          >
            {{ link.name }}
          </router-link>

          <router-link
            to="/contact"
            @click="isMenuOpen = false"
            class="rounded-custom bg-primary py-3 text-center text-sm font-bold text-white shadow-lg transition-transform active:scale-95"
          >
            Start a Project
          </router-link>
        </nav>
      </div>
    </transition>
  </header>
</template>
