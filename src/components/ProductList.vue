<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProductCard v-for="p in products" :key="p.id" :product="p" />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import ProductCard from './ProductCard.vue'

const config = inject('config') || {}
const products = (config.shop && config.shop.products) || []
</script>
