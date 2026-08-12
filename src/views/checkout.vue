<template>
  <div class="py-12 container mx-auto max-w-lg">
    <h1 class="text-2xl font-bold mb-4">Checkout</h1>
    <div v-if="items.length===0">Your cart is empty.</div>

    <form @submit.prevent="submit">
      <label class="block mb-2">Name<input v-model="form.name" class="w-full border p-2 rounded" required /></label>
      <label class="block mb-2">Email<input v-model="form.email" type="email" class="w-full border p-2 rounded" required /></label>
      <label class="block mb-2">Address<textarea v-model="form.address" class="w-full border p-2 rounded" required /></label>

      <div class="mt-4">
        <div class="flex justify-between"><span>Subtotal</span><strong>{{ formatPrice(subtotal) }}</strong></div>
      </div>

      <div class="mt-6">
        <button type="submit" class="bg-primary text-white px-4 py-2 rounded">Place Order (Mock)</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue'
import cart from '../stores/cart'
import { useRouter } from 'vue-router'

const config = inject('config') || {}
const shop = config.shop || { currency: 'USD' }

const { state, subtotal } = cart
const items = state.items
const router = useRouter()

const form = reactive({ name: '', email: '', address: '' })

function formatPrice(cents) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: shop.currency || 'USD' }).format(cents / 100)
  } catch (e) {
    return `$${(cents / 100).toFixed(2)}`
  }
}

function submit() {
  // Basic validation done via required fields. This is a mock checkout.
  const order = {
    id: `MOCK-${Date.now()}`,
    customer: { name: form.name, email: form.email, address: form.address },
    items: JSON.parse(JSON.stringify(items)),
    subtotal: subtotal.value,
    createdAt: new Date().toISOString()
  }

  // Save mock order to localStorage for demo purposes
  try {
    const orders = JSON.parse(localStorage.getItem('mock_orders') || '[]')
    orders.push(order)
    localStorage.setItem('mock_orders', JSON.stringify(orders))
  } catch (e) { /* ignore */ }

  // Clear cart and redirect to confirmation
  cart.clearCart()
  router.push({ path: '/order-confirmation', query: { id: order.id } })
}
</script>
