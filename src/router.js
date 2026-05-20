import { createRouter, createWebHistory } from 'vue-router'
import config from '../config.json'
import menuData from './assets/menu.json'

const views = import.meta.glob('./views/*.vue')

const resolveView = component => {
  const filename = component?.toString().replace(/\.vue$/, '') || ''
  const viewPath = `./views/${filename}.vue`

  if (views[viewPath]) {
    return views[viewPath]
  }

  console.warn(`Missing view for route component: ${component}`)
  return () => import('./views/NotFound.vue')
}

if (!Array.isArray(config.navigation)) {
  config.navigation = []
}

if (config.features?.onlineMenu && menuData?.enabled) {
  const menuPath = menuData.path || '/menu'
  const menuName = menuData.label || 'Menu'

  if (!config.navigation.some(route => route.path === menuPath)) {
    config.navigation.push({
      name: menuName,
      path: menuPath,
      component: 'menu',
    })
  }
}

const routes = config.navigation.map(route => {
  return {
    path: route.path,
    name: route.name,
    component: resolveView(route.component),
    meta: { title: route.name },
  }
})

// Add a catch-all NotFound route
routes.push({
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('./views/NotFound.vue'),
  meta: { title: 'Not Found' },
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
})

// Update document title from route meta
router.afterEach(to => {
  try {
    const base = config?.businessName || ''
    if (to?.meta?.title) document.title = `${to.meta.title} · ${base}`
    else if (base) document.title = base
  } catch (e) {
    // ignore
  }
})

export default router
