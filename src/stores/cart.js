import { reactive, computed } from 'vue'

const STORAGE_KEY = 'cart:v1'

const safeParse = (s, fallback) => {
  try {
    return JSON.parse(s)
  } catch (e) {
    return fallback
  }
}

const parsed = typeof window !== 'undefined' ? safeParse(localStorage.getItem(STORAGE_KEY), []) : []
const initial = Array.isArray(parsed) ? parsed : []

const state = reactive({ items: initial })

const save = () => {
  try {
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  } catch (e) {
    // ignore
  }
}

const findIndex = (productId, variantId) => state.items.findIndex(i => i.productId === productId && (i.variantId || null) === (variantId || null))

export function addToCart(product, variantId = null, quantity = 1) {
  const idx = findIndex(product.id, variantId)
  const unitPrice = variantId
    ? (product.variants?.find(v => v.id === variantId)?.price ?? product.price)
    : product.price

  if (idx > -1) {
    state.items[idx].quantity += quantity
  } else {
    state.items.push({ productId: product.id, variantId: variantId || null, quantity, unitPrice })
  }
  save()
}

export function updateQuantity(productId, variantId, quantity) {
  const idx = findIndex(productId, variantId)
  if (idx > -1) {
    if (quantity <= 0) state.items.splice(idx, 1)
    else state.items[idx].quantity = quantity
    save()
  }
}

export function removeItem(productId, variantId) {
  const idx = findIndex(productId, variantId)
  if (idx > -1) {
    state.items.splice(idx, 1)
    save()
  }
}

export function clearCart() {
  state.items.splice(0, state.items.length)
  save()
}

export const subtotal = computed(() => state.items.reduce((s, it) => s + (it.unitPrice * it.quantity), 0))
export const itemCount = computed(() => state.items.reduce((s, it) => s + it.quantity, 0))

export default {
  state,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
  subtotal,
  itemCount
}
