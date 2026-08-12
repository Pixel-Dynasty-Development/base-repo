<template>
  <div class="py-12 container mx-auto max-w-lg text-center">
    <h1 class="text-2xl font-bold mb-4">Thank you!</h1>
    <p class="mb-4">Your order <strong>{{ orderId }}</strong> has been placed (mock).</p>
    <p class="text-muted-text">This is a demo checkout. Integrate a real payment provider for production.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = ref(route.query.id || 'UNKNOWN')

onMounted(() => {
  // nothing for now
})
</script>
