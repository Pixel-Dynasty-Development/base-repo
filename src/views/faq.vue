<script setup>
import SectionHeading from '../components/SectionHeading.vue'
import FAQAccordion from '../components/FAQAccordion.vue'

// const faqs = [
//   {
//     question: 'How quickly can a new site launch?',
//     answer:
//       'A simple site can be launched in a few weeks, while larger custom projects may take longer depending on scope.',
//   },
//   {
//     question: 'Can you support both design and development?',
//     answer:
//       'Yes. This template is built for full-stack web projects and works well for teams offering combined design and development services.',
//   },
//   {
//     question: 'Is the site easy to maintain after launch?',
//     answer:
//       'The architecture prioritizes simplicity and reuse, making maintenance and updates easy for future developers.',
//   },
// ]
</script>

<template>
  <div class="py-16 md:py-24">
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8"
      :style="{ maxWidth: $theme.layout.maxWidth }"
    >
      <SectionHeading
        eyebrow="FAQ"
        title="Questions we often hear from clients"
        description="Use a dedicated FAQ page to reduce friction, boost conversions, and clarify your process."
      />

      <div class="mt-16">
        <FAQAccordion :faqs="$config.faqs" />
      </div>
    </div>
  </div>
</template>
