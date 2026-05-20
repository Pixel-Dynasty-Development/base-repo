# System Architecture 🏗️

A modular Vue 3 + Tailwind 4 engine.

## 🧠 The Engine Logic

1. **`config.json`**: The source of truth for content/styles.
2. **`main.js`**: Injects theme variables and sets up `$config`.
3. **`router.js`**: Generates routes dynamically from the config.
4. **`App.vue`**: The master layout and page transition logic.

## 🧩 Component Philosophy

- **Views**: Full-page components in `src/views/`.
- **Components**: Reusable blocks in `src/components/`.
- **Assets**: Processed images and global styles.
