<script setup>
const props = defineProps({
  stats: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="stat in props.stats"
      :key="stat.label"
      class="rounded-custom border-border-subtle bg-surface border p-6 text-center shadow-sm"
    >
      <div class="text-primary text-4xl font-bold">{{ stat.value }}</div>
      <p class="text-muted-text mt-3 text-sm">{{ stat.label }}</p>
    </div>
  </div>
</template>
