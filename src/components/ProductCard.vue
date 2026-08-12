<template>
  <div class="border-border-subtle flex flex-col rounded-lg border p-4">
    <ImageWithFallback
      :src="product.images?.[0]"
      :fallback="'/assets/products/placeholder-1.svg'"
      className="h-40 w-full rounded object-cover"
      :alt="product.name"
    />
    <h3 class="text-main-text mt-3 text-lg font-semibold">{{ product.name }}</h3>
    <p class="text-muted-text mt-2">{{ product.description }}</p>
    <div class="mt-4 flex items-center justify-between">
      <div class="text-main-text text-xl font-bold">{{ formatPrice(product.price) }}</div>
      <button @click="onAdd" class="bg-primary rounded px-3 py-1 text-white">Add</button>
    </div>
  </div>
</template>

<script setup>
import { toRefs, inject } from 'vue'
import ImageWithFallback from './ImageWithFallback.vue'
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
