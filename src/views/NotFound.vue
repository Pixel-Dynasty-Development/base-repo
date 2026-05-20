<template>
  <section class="flex min-h-screen items-center justify-center p-6">
    <div class="text-center">
      <h1 class="mb-4 text-4xl font-bold">Page not found</h1>
      <p class="text-muted mb-6">
        We couldn't find the page you were looking for.
      </p>
      <router-link to="/" class="btn-primary">Go home</router-link>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.text-muted {
  color: var(--theme-text-muted, #64748b);
}
.btn-primary {
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}
</style>
