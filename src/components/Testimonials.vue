<template>
  <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
    <div
      v-for="item in ($config.testimonials || [])"
      :key="item.author"
      class="bg-surface border-border-subtle rounded-custom border p-6 shadow-sm"
    >
      <p class="text-muted-text mb-4 italic">"{{ item.quote }}"</p>
      <div class="text-primary font-bold">{{ item.author }}</div>
      <div class="text-muted-text text-xs">{{ item.role }}</div>
    </div>
  </div>
</template>
