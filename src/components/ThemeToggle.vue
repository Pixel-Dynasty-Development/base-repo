<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
</script>

<template>
  <button
    @click="toggleTheme"
    class="bg-surface border-border-subtle hover:bg-main-bg rounded-custom flex items-center gap-2 border p-2 transition-colors"
    aria-label="Toggle Dark Mode"
  >
    <span>{{ isDark ? '☀️' : '🌙' }}</span>
    <span class="text-main-text text-sm font-medium">{{
      isDark ? 'Light' : 'Dark'
    }}</span>
  </button>
</template>
