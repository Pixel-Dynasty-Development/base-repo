# Theming & Configuration Guide 🎨

This template is driven by `config.json`.

## 🎨 Global Colors

- `--color-primary`: Main brand color (Buttons, active links).
- `--color-secondary`: Accent color for highlights.
- `--color-main-bg`: Background of the entire page.
- `--color-surface`: Background for cards and headers.
- `--color-main-text`: Primary text color.
- `--color-muted-text`: Supportive text color.

## ⚙️ Layout Settings

- `maxWidth`: Container width (e.g., `1200px`).
- `navSticky`: Toggle fixed header.
- `borderRadius`: Controls the `rounded-custom` class.

## 🧭 Navigation

Add objects to the `navigation` array:

```json
{ "name": "New Page", "path": "/new", "component": "NewPage" }
```
