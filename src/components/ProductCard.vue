<template>
  <div class="border rounded-lg p-4 flex flex-col">
    <img :src="product.images?.[0]" :alt="product.name" class="h-40 w-full object-cover rounded" />
    <h3 class="mt-3 text-lg font-semibold">{{ product.name }}</h3>
    <p class="text-muted-text mt-2">{{ product.description }}</p>
    <div class="mt-4 flex items-center justify-between">
      <div class="text-xl font-bold">{{ formatPrice(product.price) }}</div>
      <button @click="onAdd" class="bg-primary text-white px-3 py-1 rounded">Add</button>
    </div>
  </div>
</template>

<script setup>
import { toRefs, inject } from 'vue'
import cart from '../stores/cart'

const props = defineProps({ product: { type: Object, required: true } })
const { product } = toRefs(props)

const config = inject('config') || {}
const shop = config.shop || { currency: 'USD' }

const formatPrice = (cents) => {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: shop.currency || 'USD' }).format(cents / 100)
  } catch (e) {
    return `$${(cents / 100).toFixed(2)}`
  }
}

function onAdd() {
  cart.addToCart(product.value, null, 1)
}
</script>
