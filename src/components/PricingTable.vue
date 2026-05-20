<script setup>
const props = defineProps({
  plans: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-3">
    <div
      v-for="plan in props.plans"
      :key="plan.name"
      class="rounded-custom border-border-subtle bg-surface border p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div class="mb-4 flex items-center justify-between gap-4">
        <div>
          <p class="text-muted-text text-sm tracking-[0.2em] uppercase">
            {{ plan.type }}
          </p>
          <h3 class="text-main-text mt-2 text-2xl font-bold">
            {{ plan.name }}
          </h3>
        </div>
        <span
          v-if="plan.recommended"
          class="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold"
        >
          Recommended
        </span>
      </div>

      <div class="mb-6">
        <p class="text-primary text-4xl font-bold">{{ plan.price }}</p>
        <p class="text-muted-text mt-2">{{ plan.summary }}</p>
      </div>

      <ul class="text-muted-text mb-8 space-y-3 text-sm">
        <li v-for="feature in plan.features" :key="feature">• {{ feature }}</li>
      </ul>

      <button
        class="rounded-custom bg-primary w-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Choose Plan
      </button>
    </div>
  </div>
</template>
