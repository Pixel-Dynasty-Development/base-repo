<script setup>
const props = defineProps({
  members: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
    <div
      v-for="member in props.members"
      :key="member.name"
      class="rounded-custom border-border-subtle bg-surface border p-6 text-center shadow-sm"
    >
      <div
        class="bg-primary/10 text-primary mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full text-4xl"
      >
        <span>{{ member.avatar || member.initials || '👤' }}</span>
      </div>
      <h3 class="text-main-text text-xl font-semibold">{{ member.name }}</h3>
      <p class="text-primary text-sm font-semibold">{{ member.role }}</p>
      <p class="text-muted-text mt-4 leading-7">{{ member.bio }}</p>
    </div>
  </div>
</template>
