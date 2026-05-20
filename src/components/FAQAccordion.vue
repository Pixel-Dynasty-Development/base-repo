<script setup>
import { ref } from 'vue'

const props = defineProps({
  faqs: {
    type: Array,
    default: () => [],
  },
})

const openIndex = ref(null)

const toggle = index => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="(faq, index) in props.faqs"
      :key="faq.question"
      class="rounded-custom border-border-subtle bg-surface overflow-hidden border shadow-sm"
    >
      <button
        type="button"
        class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        @click="toggle(index)"
      >
        <span class="text-main-text font-semibold">{{ faq.question }}</span>
        <span class="text-primary text-2xl">{{
          openIndex === index ? '−' : '+'
        }}</span>
      </button>

      <div
        v-show="openIndex === index"
        class="border-border-subtle text-muted-text border-t px-6 pb-6"
      >
        <p class="leading-7">{{ faq.answer }}</p>
      </div>
    </div>
  </div>
</template>
