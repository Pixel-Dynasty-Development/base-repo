<template>
  <footer class="bg-surface border-border-subtle mt-auto border-t">
    <div
      class="mx-auto px-4 py-12 md:flex md:items-center md:justify-between"
      :style="{ maxWidth: $theme.layout.maxWidth }"
    >
      <div class="space-y-2">
        <p class="text-primary text-lg font-bold">{{ $config.businessName }}</p>
        <p class="text-muted-text text-sm">
          © {{ $config.foundingYear }} - {{ new Date().getFullYear() }}
        </p>
        <p class="text-muted-text text-sm">
          {{ $config.contact.address.display }}
        </p>
      </div>

      <div class="mt-8 flex gap-6 md:mt-0">
        <a
          v-for="(url, platform) in $config.contact.socials || {}"
          :key="platform"
          :href="url"
          target="_blank"
          rel="noreferrer noopener"
          class="text-muted-text hover:text-primary capitalize transition-colors"
        >
          {{ platform }}
        </a>
      </div>

      <div class="mt-8 md:mt-0">
        <a
          :href="`mailto:${$config.contact.email}`"
          class="text-sm font-medium hover:underline"
        >
          {{ $config.contact.email }}
        </a>
      </div>
    </div>
  </footer>
</template>
