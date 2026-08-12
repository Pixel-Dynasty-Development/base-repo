<template>
  <div class="py-12 container mx-auto">
    <h1 class="text-3xl font-bold mb-6">{{ $config.metadata?.shopTitle || $config.shop?.title || 'Shop' }}</h1>
    <ProductList />
  </div>
</template>

<script setup>
import ProductList from '../components/ProductList.vue'
</script>
