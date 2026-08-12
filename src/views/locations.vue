<template>
  <div class="py-16 md:py-24 container mx-auto text-center">
    <h1 class="text-3xl font-bold mb-4">{{ $config.metadata?.locationsTitle || 'Locations' }}</h1>
    <p class="text-muted-text mx-auto mb-8 max-w-2xl">{{ $config.metadata?.locationsDescription || 'We serve our community both in-person and online. Contact us to find the nearest location.' }}</p>

    <div v-if="$config.locations && $config.locations.length" class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div v-for="loc in $config.locations" :key="loc.id" class="rounded-custom border-border-subtle border bg-surface p-6 text-left">
        <h3 class="text-primary font-semibold">{{ loc.name }}</h3>
        <p class="text-muted-text mt-1">{{ loc.address?.display || loc.addressLine }}</p>
        <p class="text-muted-text mt-2 text-sm">{{ loc.notes }}</p>
      </div>
    </div>

    <div v-else class="text-muted-text">No locations configured yet.</div>
  </div>
</template>

<script setup>
// Placeholder view to satisfy router and provide a friendly edit target for configuring locations in /config
</script>
