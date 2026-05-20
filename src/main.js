import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js' // Pointing to your single file
import config from '../config.json'
import themeConfig from './assets/theme.json'
import './index.css'

const app = createApp(App)
const root = typeof document !== 'undefined' ? document.documentElement : null

/**
 * 🎨 Dynamic Theme Engine
 * Injects colors from config.json into CSS variables
 */
const injectTheme = () => {
  try {
    if (!root) return

    // 1. Map Brand Colors (e.g., --color-primary)
    const brand = themeConfig?.theme?.brand || {}
    Object.entries(brand).forEach(([key, val]) => {
      if (val != null) root.style.setProperty(`--color-${key}`, val)
    })

    // 2. Map Layout Variables (e.g., --borderRadius)
    const layout = themeConfig?.layout || {}
    Object.entries(layout).forEach(([key, val]) => {
      if (val != null) root.style.setProperty(`--${key}`, val)
    })

    // 3. Setup semantic theme (Light/Dark)
    const storedTheme =
      typeof window !== 'undefined' && window.localStorage?.getItem('theme')
        ? window.localStorage.getItem('theme')
        : null

    const userPrefersDark =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches

    const activeMode = config?.features?.darkMode
      ? storedTheme === 'dark' || (!storedTheme && userPrefersDark)
        ? 'dark'
        : 'light'
      : 'light'

    const themeData =
      themeConfig?.theme?.[activeMode] || themeConfig?.theme?.light || {}

    // Recursively map nested theme objects (bg, text, border)
    const processTheme = (obj, prefix = '') => {
      Object.entries(obj).forEach(([key, val]) => {
        if (val && typeof val === 'object') {
          processTheme(val, `${prefix}${key}-`)
        } else if (val != null) {
          root.style.setProperty(`--theme-${prefix}${key}`, val)
        }
      })
    }

    processTheme(themeData)

    // Add dark class to root for Tailwind's dark: variant support
    if (activeMode === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  } catch (err) {
    // Fail safe: avoid breaking app startup on theme errors
    // eslint-disable-next-line no-console
    console.warn('injectTheme failed:', err)
  }
}

// Run the engine
injectTheme()

// Set a sensible document title if available
if (typeof document !== 'undefined') {
  try {
    const titleBase = config?.businessName || 'App'
    const subtitle = config?.tagline ? ` — ${config.tagline}` : ''
    document.title = `${titleBase}${subtitle}`
  } catch (e) {
    // ignore
  }
}

// Make config globally available as $config in all components
app.config.globalProperties.$config = config
app.config.globalProperties.$theme = themeConfig

app.use(router)
app.mount('#app')
