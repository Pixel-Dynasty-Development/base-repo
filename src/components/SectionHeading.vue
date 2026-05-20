<script setup>
const props = defineProps({
  eyebrow: String,
  title: {
    type: String,
    required: true,
  },
  description: String,
})
</script>

<template>
  <div class="text-center">
    <p
      v-if="props.eyebrow"
      class="text-accent font-semibold tracking-[0.28em] uppercase"
    >
      {{ props.eyebrow }}
    </p>
    <h2 class="text-main-text mt-4 text-3xl font-bold sm:text-4xl">
      {{ props.title }}
    </h2>
    <p
      v-if="props.description"
      class="text-muted-text mx-auto mt-4 max-w-3xl leading-8"
    >
      {{ props.description }}
    </p>
  </div>
</template>
