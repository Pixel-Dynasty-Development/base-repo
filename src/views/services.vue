<script setup>
import SectionHeading from '../components/SectionHeading.vue'
import FeatureGrid from '../components/FeatureGrid.vue'
import StatsGrid from '../components/StatsGrid.vue'

const defaultFeatures = [
  {
    icon: '⚡',
    title: 'Fast Launch',
    description:
      'Deploy a polished website quickly with modular sections that adapt to your brand.',
  },
  {
    icon: '💼',
    title: 'Custom Services',
    description:
      'Showcase consulting, development, design, or agency packages with clear service cards.',
  },
  {
    icon: '🌐',
    title: 'Multi-purpose',
    description:
      'Support portfolios, small businesses, non-profits, and online shops from the same base.',
  },
]

const defaultStats = [
  { label: 'Projects Completed', value: '120+' },
  { label: 'Happy Clients', value: '85%' },
  { label: 'Years Experience', value: '8' },
  { label: 'Launch Time', value: '2-4 weeks' },
]
</script>

<template>
  <div class="py-16 md:py-24">
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8"
      :style="{ maxWidth: $theme.layout.maxWidth }"
    >
      <SectionHeading
        eyebrow="$config.metadata?.servicesEyebrow || 'Our Services'"
        :title="$config.metadata?.servicesTitle || 'Solutions for every stage of your business'"
        :description="$config.metadata?.servicesDescription || 'Flexible offerings that fit startups, local shops, SaaS businesses, and creative agencies.'"
      />

      <div class="mt-16">
        <FeatureGrid :features="$config.services || defaultFeatures" />
      </div>

      <div class="mt-20">
        <SectionHeading
          title="Performance metrics you can share"
          description="Use these highlights as social proof on landing pages, investor decks, or sales brochures."
        />
        <div class="mt-10">
          <StatsGrid :stats="$config.stats || defaultStats" />
        </div>
      </div>
    </div>
  </div>
</template>
