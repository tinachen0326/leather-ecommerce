import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // 狀態
  const items = ref(JSON.parse(localStorage.getItem('cartItems') || '[]'))

  // 計算屬性
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  const isEmpty = computed(() => items.value.length === 0)

  // 動作
  const addItem = (product, size, quantity = 1) => {
    const existingItemIndex = items.value.findIndex(
      (item) => item.id === product.id && item.size === size,
    )

    if (existingItemIndex > -1) {
      // 如果商品已存在，增加數量
      items.value[existingItemIndex].quantity += quantity
    } else {
      // 如果是新商品，添加到購物車
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        quantity,
        brand: product.brand,
      })
    }

    saveToLocalStorage()
  }

  const removeItem = (productId, size) => {
    const index = items.value.findIndex((item) => item.id === productId && item.size === size)

    if (index > -1) {
      items.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const updateQuantity = (productId, size, quantity) => {
    const item = items.value.find((item) => item.id === productId && item.size === size)

    if (item) {
      if (quantity <= 0) {
        removeItem(productId, size)
      } else {
        item.quantity = quantity
        saveToLocalStorage()
      }
    }
  }

  const clearCart = () => {
    items.value = []
    saveToLocalStorage()
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(items.value))
  }

  return {
    // 狀態
    items,

    // 計算屬性
    itemCount,
    totalPrice,
    isEmpty,

    // 動作
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
})
