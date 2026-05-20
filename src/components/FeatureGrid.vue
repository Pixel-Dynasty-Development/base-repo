<script setup>
const props = defineProps({
  features: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
    <div
      v-for="feature in props.features"
      :key="feature.title"
      class="rounded-custom border-border-subtle bg-surface border p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        class="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-2xl"
      >
        {{ feature.icon || '✨' }}
      </div>
      <h3 class="text-main-text mb-3 text-xl font-semibold">
        {{ feature.title }}
      </h3>
      <p class="text-muted-text leading-7">{{ feature.description }}</p>
    </div>
  </div>
</template>
