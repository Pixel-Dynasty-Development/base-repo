import { createRouter, createWebHistory } from 'vue-router'
import metadata from '../config/metadata.json'
import navigation from '../config/navigation.json'
import features from '../config/features.json'
import menuData from '../config/menu.json'

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

// Start from the navigation array; make a shallow copy so we don't mutate the source file
const nav = Array.isArray(navigation) ? [...navigation] : []

if (features?.onlineMenu && menuData?.enabled) {
  const menuPath = menuData.path || '/menu'
  const menuName = menuData.label || 'Menu'

  if (!nav.some(route => route.path === menuPath)) {
    nav.push({ name: menuName, path: menuPath, component: 'menu' })
  }
}

const routes = nav.map(route => ({
  path: route.path,
  name: route.name,
  component: resolveView(route.component),
  meta: { title: route.name },
}))

// Add product and checkout routes when shop exists
try {
  // add product detail route
  routes.push({ path: '/shop/:slug', name: 'Product', component: () => import('./views/product.vue'), meta: { title: 'Product' } })
  // checkout and order confirmation
  routes.push({ path: '/checkout', name: 'Checkout', component: () => import('./views/checkout.vue'), meta: { title: 'Checkout' } })
  routes.push({ path: '/order-confirmation', name: 'OrderConfirmation', component: () => import('./views/order-confirmation.vue'), meta: { title: 'Order Confirmation' } })
} catch (e) {
  // ignore if views don't exist
}

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
    const base = metadata?.businessName || ''
    if (to?.meta?.title) document.title = `${to.meta.title} · ${base}`
    else if (base) document.title = base
  } catch (e) {
    // ignore
  }
})

export default router
