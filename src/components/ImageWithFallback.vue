<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  fallback: { type: String, default: '/assets/seo/event-placeholder.svg' },
  lazy: { type: Boolean, default: true },
  className: { type: [String, Object, Array], default: '' }
})

const imgSrc = ref(props.src || props.fallback)

watch(() => props.src, (v) => {
  imgSrc.value = v || props.fallback
})

function onError(e) {
  if (imgSrc.value !== props.fallback) imgSrc.value = props.fallback
}
</script>

<template>
  <img
    :src="imgSrc"
    :alt="alt"
    :class="className"
    :loading="lazy ? 'lazy' : 'eager'"
    @error="onError"
    decoding="async"
  />
</template>
