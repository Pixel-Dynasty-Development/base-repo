<template>
  <div class="py-12 container mx-auto">
    <div v-if="product">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img :src="product.images?.[0]" alt="" class="w-full rounded object-cover" />
        <div>
          <h1 class="text-3xl font-bold">{{ product.name }}</h1>
          <p class="text-muted-text mt-2">{{ product.description }}</p>
          <div class="text-2xl font-bold mt-4">{{ formatPrice(product.price) }}</div>
          <div class="mt-4">
            <button @click="add" class="bg-primary text-white px-4 py-2 rounded">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Product not found.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import cart from '../stores/cart'

const config = inject('config') || {}
const shop = config.shop || { products: [], currency: 'USD' }

const route = useRoute()
const router = useRouter()
const product = ref(null)

const slug = route.params.slug

onMounted(() => {
  product.value = (shop.products || []).find(p => p.slug === slug)
  if (!product.value) {
    // redirect back to shop if not found
    router.replace('/shop')
  }
})

function formatPrice(cents) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: shop.currency || 'USD' }).format(cents / 100)
  } catch (e) {
    return `$${(cents / 100).toFixed(2)}`
  }
}

function add() {
  if (product.value) {
    cart.addToCart(product.value, null, 1)
    router.push('/shop')
  }
}
</script>
