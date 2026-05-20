<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: '',
})

const submitForm = () => {
  // Add your submission logic here
}
</script>

<template>
  <div class="bg-surface rounded-custom p-8 shadow-lg">
    <h2 class="text-primary mb-6 text-2xl font-semibold">Send a Message</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="mb-1 block text-sm font-medium">Full Name</label>
        <input
          v-model="formData.name"
          type="text"
          class="rounded-custom border-border-subtle bg-main-bg focus:ring-secondary w-full border px-4 py-2 outline-none focus:ring-1"
          required
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium">Email</label>
        <input
          v-model="formData.email"
          type="email"
          class="rounded-custom border-border-subtle bg-main-bg focus:ring-secondary w-full border px-4 py-2 outline-none focus:ring-1"
          required
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium">Message</label>
        <textarea
          v-model="formData.message"
          rows="4"
          class="rounded-custom border-border-subtle bg-main-bg focus:ring-secondary w-full border px-4 py-2 outline-none focus:ring-1"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-accent rounded-custom px-6 py-2 font-bold text-white transition-opacity hover:opacity-90"
      >
        Send Inquiry
      </button>
    </form>
  </div>
</template>
