<script setup>
import ContactForm from '../components/ContactForm.vue'
</script>

<template>
  <div>
    <div class="py-16 md:py-24">
      <div class="mx-auto max-w-4xl text-center">
        <h1 class="text-main-text text-4xl font-extrabold sm:text-6xl">
          Get in Touch
        </h1>
        <p class="text-muted-text mt-6 text-lg">
          Have a question about a project or want to chat about 3D prototyping?
          Use the form below and I'll get back to you within 24 hours.
        </p>
      </div>

      <div class="mx-auto mt-16 max-w-2xl">
        <ContactForm />
      </div>

      <div class="text-muted-text mt-16 text-center text-sm">
        <p>
          Operating out of
          <strong>{{ $config.contact.address.display }}</strong>
        </p>
        <p class="mt-2 italic">Standard response time: &lt; 1 Business Day</p>
      </div>
    </div>
  </div>
</template>
