import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import configIndex from '../config/index.json' // index that references the modular config files
import './index.css'
import themeConfig from '../config/theme.json'

// Explicit static imports for config files (works in dev and production)
import metadata from '../config/metadata.json'
import contact from '../config/contact.json'
import navigation from '../config/navigation.json'
import features from '../config/features.json'
import testimonials from '../config/testimonials.json'
import team from '../config/team.json'
import faqs from '../config/faqs.json'
import seo from '../config/seo.json'
import shop from '../config/shop.json'
import locations from '../config/locations.json'
import events from '../config/events.json'

const configParts = { metadata, contact, navigation, features, testimonials, team, faqs, seo, shop, locations, events }
const config = { ...configIndex, ...configParts }



const app = createApp(App)

// Provide config for injection and also set globalProperties for backwards compatibility
app.provide('config', config)
app.config.globalProperties.$config = config
app.config.globalProperties.$theme = themeConfig

const root = typeof document !== 'undefined' ? document.documentElement : null

const setThemeClass = (mode) => {
  if (!root) return
  if (mode === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

const injectThemeVariables = () => {
  if (!root) return
  try {
    // Brand colors (kept as --color-<name> for direct use)
    const stored = typeof window !== 'undefined' ? window.localStorage?.getItem('theme') : null
    const prefersDark =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches

    const activeMode = config?.features?.darkMode
      ? stored === 'dark' || (!stored && prefersDark)
        ? 'dark'
        : 'light'
      : 'light'

    const themeData = themeConfig?.theme?.[activeMode] || {}
    const brand = themeData.brand || themeConfig?.theme?.brand || {}
    Object.entries(brand).forEach(([k, v]) => {
      if (v != null) root.style.setProperty(`--color-${k}`, v)
    })

    // Map themeData to canonical CSS variables used in index.css
    if (themeData.bg) {
      if (themeData.bg.page != null) root.style.setProperty('--main-bg', themeData.bg.page)
      if (themeData.bg.surface != null) root.style.setProperty('--surface', themeData.bg.surface)
      if (themeData.bg.input != null) root.style.setProperty('--input-bg', themeData.bg.input)
    }

    if (themeData.text) {
      if (themeData.text.main != null) root.style.setProperty('--main-text', themeData.text.main)
      if (themeData.text.muted != null) root.style.setProperty('--muted-text', themeData.text.muted)
      if (themeData.text.inverse != null) root.style.setProperty('--inverse-text', themeData.text.inverse)
    }

    if (themeData.border != null) root.style.setProperty('--border-subtle', themeData.border)

    // Layout variables
    const layout = themeConfig?.layout || {}
    if (layout.borderRadius != null) root.style.setProperty('--radius-custom', layout.borderRadius)
    if (layout.maxWidth != null) root.style.setProperty('--max-width', layout.maxWidth)

    setThemeClass(activeMode)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Theme injection failed', err)
  }
}

// Initial run
injectThemeVariables()

// React to system theme changes and storage changes
if (typeof window !== 'undefined') {
  try {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    if (mq && typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', () => injectThemeVariables())
    } else if (mq && typeof mq.addListener === 'function') {
      mq.addListener(() => injectThemeVariables())
    }

    window.addEventListener('storage', (e) => {
      if (e.key === 'theme') injectThemeVariables()
    })

    // Allow same-tab theme toggles to notify the injector
    window.addEventListener('theme-changed', () => injectThemeVariables())

    // Expose for manual calls if needed
    // eslint-disable-next-line no-undef
    window.__applyTheme = injectThemeVariables
  } catch (e) {
    /* ignore */
  }
}

// sensible title fallback
if (typeof document !== 'undefined') {
  try {
    const titleBase = config?.metadata?.businessName || 'App'
    const subtitle = config?.metadata?.tagline ? ` — ${config.metadata.tagline}` : ''
    document.title = `${titleBase}${subtitle}`
  } catch (e) {
    // ignore
  }
}

app.use(router)
app.mount('#app')
