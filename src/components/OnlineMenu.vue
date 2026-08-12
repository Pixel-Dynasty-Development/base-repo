<script setup>
import { computed, inject } from 'vue'

const config = inject('config') || {}
const menu = config.menu || {}
const sections = computed(() => {
  if (Array.isArray(menu.categories) && menu.categories.length) {
    return menu.categories
  }

  if (Array.isArray(menu.items)) {
    return [
      {
        name: menu.label || 'Menu',
        description: menu.description || '',
        items: menu.items,
      },
    ]
  }

  return []
})
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-12">
    <div
      v-if="!sections.length"
      class="rounded-custom border-border-subtle bg-surface text-muted-text border p-12 text-center text-lg"
    >
      Our menu is coming soon. Check back later or contact us for special
      requests.
    </div>

    <div v-else class="grid gap-10 lg:grid-cols-2">
      <div
        v-for="section in sections"
        :key="section.name"
        class="rounded-custom border-border-subtle bg-surface border p-8 shadow-sm"
      >
        <div class="mb-6">
          <p class="text-accent font-semibold tracking-[0.25em] uppercase">
            {{ section.name }}
          </p>
          <p v-if="section.description" class="text-muted-text mt-3">
            {{ section.description }}
          </p>
        </div>

        <div class="space-y-5">
          <div
            v-for="item in section.items || []"
            :key="item.name"
            class="rounded-custom border-border-subtle hover:border-primary/50 border bg-white/80 p-5 transition hover:shadow-lg"
          >
            <div
              class="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <h3 class="text-main-text text-xl font-semibold">
                {{ item.name }}
              </h3>
              <span class="text-primary text-sm font-bold">{{
                item.price
              }}</span>
            </div>
            <p class="text-muted-text mt-2 text-sm leading-6">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
