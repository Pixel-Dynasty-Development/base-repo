<template>
  <footer class="bg-surface border-border-subtle mt-auto border-t">
    <div
      class="mx-auto px-4 py-12 md:flex md:items-center md:justify-between"
      :style="{ maxWidth: $theme.layout.maxWidth }"
    >
      <div class="space-y-2">
        <p class="text-primary text-lg font-bold">{{ $config.metadata?.displayName || $config.metadata?.businessName || 'Business' }}</p>
        <p class="text-muted-text text-sm">© {{ $config.metadata?.foundingYear || $config.foundingYear || new Date().getFullYear() }} - {{ new Date().getFullYear() }}</p>
        <p v-if="$config.contact?.address?.display" class="text-muted-text text-sm">{{ $config.contact?.address?.display || $config.contact?.addressLine }}</p>
      </div>

      <div class="mt-8 flex gap-6 md:mt-0">
        <template v-if="$config.contact?.socials">
          <a
            v-for="(url, platform) in $config.contact.socials"
            :key="platform"
            :href="url"
            target="_blank"
            rel="noreferrer noopener"
            class="text-muted-text hover:text-primary capitalize transition-colors"
            >
            {{ platform }}
          </a>
        </template>
      </div>

      <div class="mt-8 md:mt-0">
        <a
          v-if="$config.contact?.email"
          :href="`mailto:${$config.contact.email}`"
          class="text-sm font-medium hover:underline"
        >
          {{ $config.contact.email }}
        </a>
      </div>
    </div>
  </footer>
</template>
