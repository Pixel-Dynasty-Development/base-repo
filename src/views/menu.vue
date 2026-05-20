<script setup>
import OnlineMenu from '../components/OnlineMenu.vue'
import menuData from '../assets/menu.json'
import config from '../../config.json'
</script>

<template>
  <div class="py-16 md:py-24">
    <div class="mx-auto max-w-4xl text-center">
      <p class="text-accent font-semibold tracking-[0.3em] uppercase">
        {{ menuData.label || 'Menu' }}
      </p>
      <h1 class="text-main-text mt-4 text-4xl font-extrabold sm:text-5xl">
        {{ menuData.description || 'Discover our featured selections.' }}
      </h1>
      <p class="text-muted-text mx-auto mt-6 max-w-2xl text-lg leading-8">
        {{ config.description }}
      </p>
    </div>

    <div class="mt-16 px-4">
      <OnlineMenu />
    </div>
  </div>
</template>
