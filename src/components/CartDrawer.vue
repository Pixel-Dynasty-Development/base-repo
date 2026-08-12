<template>
  <div>
    <div class="fixed inset-0 z-40 bg-black/40" @click="emitClose" />

    <aside class="fixed right-0 top-0 h-full w-80 bg-white border-l p-4 shadow-lg z-50">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold">Cart ({{ itemCount }})</h3>
        <button @click="emitClose" aria-label="Close cart" class="text-muted-text">✕</button>
      </div>

      <div v-if="items.length===0" class="mt-6 text-muted-text">Your cart is empty.</div>
      <ul class="mt-4 space-y-3">
        <li v-for="(it, idx) in items" :key="idx" class="flex justify-between items-center">
          <div>
            <div class="font-medium">{{ productName(it.productId) }}</div>
            <div class="text-sm text-muted-text">{{ formatPrice(it.unitPrice) }} × {{ it.quantity }}</div>
          </div>
          <div class="flex items-center gap-2">
            <button @click="dec(it)" class="px-2">-</button>
            <span>{{ it.quantity }}</span>
            <button @click="inc(it)" class="px-2">+</button>
          </div>
        </li>
      </ul>

      <div class="mt-6 border-t pt-4">
        <div class="flex justify-between"><span>Subtotal</span><strong>{{ formatPrice(subtotal) }}</strong></div>
        <div class="mt-4 flex gap-2">
          <button @click="checkout" class="bg-primary text-white px-4 py-2 rounded">Checkout</button>
          <button @click="clear" class="px-4 py-2 rounded border">Clear</button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, inject } from 'vue'
import cart from '../stores/cart'
import { useRouter } from 'vue-router'

const config = inject('config') || {}
const shop = config.shop || { products: [], currency: 'USD' }

const items = cart.state.items
const subtotal = cart.subtotal
const itemCount = cart.itemCount
const router = useRouter()

const emit = defineEmits(['close'])

function emitClose() {
  emit('close')
}

function formatPrice(cents) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: shop.currency || 'USD' }).format(cents / 100)
  } catch (e) {
    return `$${(cents / 100).toFixed(2)}`
  }
}

function productById(id) {
  return (shop.products || []).find(p => p.id === id) || { name: 'Unknown' }
}

function productName(id) {
  return productById(id).name
}

function inc(it) {
  cart.updateQuantity(it.productId, it.variantId, it.quantity + 1)
}
function dec(it) {
  cart.updateQuantity(it.productId, it.variantId, Math.max(0, it.quantity - 1))
}
function clear() { cart.clearCart() }
function checkout() { router.push('/checkout'); emitClose() }

function onKey(e) {
  if (e.key === 'Escape') emitClose()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>
