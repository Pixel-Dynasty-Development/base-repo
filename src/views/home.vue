<script setup>
import Testimonials from '../components/Testimonials.vue'
import ContactForm from '../components/ContactForm.vue'
</script>

<template>
  <div class="relative min-h-screen">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="bg-primary/10 dark:bg-primary/5 absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full blur-[120px]"
      ></div>
      <div
        class="bg-secondary/10 dark:bg-secondary/5 absolute top-[20%] -right-[5%] h-[400px] w-[400px] rounded-full blur-[100px]"
      ></div>
    </div>

    <div class="space-y-24 py-12">
      <section class="text-center">
        <h1
          class="text-primary text-5xl font-extrabold tracking-tight sm:text-7xl"
        >
          {{ $config.tagline }}
        </h1>
        <p class="text-muted-text mx-auto mt-6 max-w-2xl text-xl leading-8">
          {{ $config.description }}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <router-link
            to="/about"
            class="rounded-custom bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90"
          >
            Our Story
          </router-link>
        </div>
      </section>

      <section v-if="$config.features.testimonials" class="container mx-auto">
        <div class="mb-12 text-center">
          <h2 class="text-main-text text-3xl font-bold italic">
            "Real Results from Real Partners"
          </h2>
          <div class="bg-accent mx-auto mt-2 h-1 w-20 rounded-full"></div>
        </div>
        <Testimonials />
      </section>

      <section
        v-if="$config.features.contactForm"
        class="rounded-custom border-border-subtle bg-surface border p-8 md:p-16"
      >
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 class="text-main-text text-4xl leading-tight font-bold">
              Ready to build your
              <span class="text-primary">Digital Dynasty?</span>
            </h2>
            <p class="text-muted-text mt-4 text-lg">
              Whether it's a client project, a non-profit initiative for
              <strong>The Bloom Foundation</strong>, or a
              <strong>Switch It</strong> workflow optimization, let's make it
              efficient.
            </p>

            <div class="mt-8 space-y-4">
              <div class="flex items-center gap-3">
                <span class="text-accent text-2xl">📍</span>
                <span class="text-muted-text">{{
                  $config.contact.address.display
                }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-accent text-2xl">✉️</span>
                <span class="text-muted-text">{{ $config.contact.email }}</span>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  </div>
</template>
