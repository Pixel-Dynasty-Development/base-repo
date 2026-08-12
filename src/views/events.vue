<template>
  <div class="py-16 md:py-24 container mx-auto text-center">
    <h1 class="text-3xl font-bold mb-4">{{ $config.metadata?.eventsTitle || 'Events' }}</h1>
    <p class="text-muted-text mx-auto mb-8 max-w-2xl">{{ $config.metadata?.eventsDescription || 'Upcoming events and gatherings will appear here.' }}</p>

    <div v-if="$config.events && $config.events.length" class="space-y-6">
      <div v-for="ev in $config.events" :key="ev.id" class="rounded-custom border-border-subtle border bg-surface p-6 text-left">
        <h3 class="text-primary font-semibold">{{ ev.title }}</h3>
        <p class="text-muted-text mt-1">{{ ev.date }} • {{ ev.location }}</p>
        <p class="text-muted-text mt-2 text-sm">{{ ev.description }}</p>
      </div>
    </div>

    <div v-else class="text-muted-text">No events configured yet.</div>
  </div>
</template>

<script setup>
// Placeholder events view — update /config/events.json or add events to /config/index.json to populate
</script>
