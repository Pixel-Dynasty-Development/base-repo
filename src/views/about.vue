<script setup>
import TeamCards from '../components/TeamCards.vue';


const members = [
  {
    name: 'Ryan Buchanan',
    role: 'Founder & Lead Developer',
    bio: 'With a passion for efficient code and scalable solutions, Ryan leads our development efforts, ensuring every project is built to last.',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
]
</script>
<template>
  <div>
    <section class="bg-main-bg py-20 transition-colors">
      <div
        class="container mx-auto px-4 text-center sm:px-6 lg:px-8"
        :style="{ maxWidth: $theme.layout.maxWidth }"
      >
        <p class="text-secondary mb-2 text-lg font-semibold">Our Story</p>

        <h1
          class="text-main-text mb-6 text-4xl leading-tight font-extrabold md:text-5xl"
        >
          Building Digital Dynasties, One Efficient Pixel at a Time.
        </h1>

        <p class="text-muted-text mx-auto mb-10 max-w-4xl text-xl">
          Founded on the principle of **maximum efficiency**,
          {{ $config.businessName }}
          is a one-person web development firm dedicated to delivering
          high-performance, custom digital solutions. We don't just build
          websites; we craft lean, scalable architectures that ensure longevity
          and minimize long-term costs.
        </p>

        <div
          class="bg-primary mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full shadow-xl"
        >
          <span class="text-4xl text-white">👤</span>
        </div>
        <p class="text-primary text-lg font-semibold">Ryan Buchanan</p>
        <p class="text-muted-text text-sm">Founder & Lead Developer</p>
      </div>
    </section>

    <section class="bg-surface py-16 transition-colors">
      <div
        class="container mx-auto px-4 sm:px-6 lg:px-8"
        :style="{ maxWidth: $theme.layout.maxWidth }"
      >
        <h2 class="text-main-text mb-12 text-center text-3xl font-bold">
          The {{ $config.businessName }} Difference
        </h2>

        <div class="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div
            class="border-border-subtle rounded-custom border p-6 text-center"
          >
            <div class="text-accent mb-3 text-4xl">⚡</div>
            <h3 class="text-primary mb-2 text-xl font-semibold">
              Efficiency Obsession
            </h3>
            <p class="text-muted-text">
              Our code is clean, fast, and optimized. We believe great
              development minimizes overhead and maximizes performance from day
              one.
            </p>
          </div>

          <div
            class="border-border-subtle rounded-custom border p-6 text-center"
          >
            <div class="text-accent mb-3 text-4xl">🛡️</div>
            <h3 class="text-primary mb-2 text-xl font-semibold">
              Unwavering Quality
            </h3>
            <p class="text-muted-text">
              We deliver robust, well-tested solutions that stand up to modern
              demands, from Tailwind CSS implementation to complex routing.
            </p>
          </div>

          <div
            class="border-border-subtle rounded-custom border p-6 text-center"
          >
            <div class="text-accent mb-3 text-4xl">🤝</div>
            <h3 class="text-primary mb-2 text-xl font-semibold">
              Focused Partnership
            </h3>
            <p class="text-muted-text">
              As a dedicated partner, we provide clear communication and support
              for all our projects, including non-profits like **The Bloom
              Foundation**.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-main-bg py-16 transition-colors">
      <div
        class="container mx-auto px-4 text-center sm:px-6 lg:px-8"
        :style="{ maxWidth: $theme.layout.maxWidth }"
      >
    <h2>Meet the Team</h2>
    <team-cards :members="$config.members" />
    </div>
    </section>

    <section class="bg-main-bg py-16 transition-colors">
      <div
        class="container mx-auto px-4 text-center sm:px-6 lg:px-8"
        :style="{ maxWidth: $theme.layout.maxWidth }"
      >
        <h2 class="text-main-text mb-4 text-3xl font-bold">
          Working Across Key Sectors
        </h2>

        <p class="text-muted-text mx-auto mb-8 max-w-3xl text-lg">
          We divide our time efficiently among client work and high-impact
          initiatives.
        </p>

        <div class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            class="bg-surface border-border-subtle rounded-custom border p-4"
          >
            <h4 class="text-primary font-bold">
              {{ $config.businessName }} Clients
            </h4>
            <p class="text-muted-text text-sm">
              Custom web development and consulting services.
            </p>
          </div>
          <div
            class="bg-surface border-border-subtle rounded-custom border p-4"
          >
            <h4 class="text-primary font-bold">The Bloom Foundation</h4>
            <p class="text-muted-text text-sm">
              Non-profit support for child poverty initiatives.
            </p>
          </div>
          <div
            class="bg-surface border-border-subtle rounded-custom border p-4"
          >
            <h4 class="text-primary font-bold">Switch It</h4>
            <p class="text-muted-text text-sm">
              Supporting my day-job initiatives with technical expertise.
            </p>
          </div>
        </div>

        <router-link
          v-if="$config.features.contactForm"
          to="/contact"
          class="bg-accent rounded-custom inline-block px-10 py-4 text-lg font-bold text-white shadow-2xl transition duration-300 hover:opacity-90"
        >
          Discuss Your Project
        </router-link>
      </div>
    </section>
  </div>
</template>
