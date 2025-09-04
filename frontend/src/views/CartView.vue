<template>
  <div class="cart-view">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 頁面標題 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">購物車</h1>
        <p class="text-gray-600 mt-2">檢視您選購的商品</p>
      </div>

      <!-- 購物車為空 -->
      <div v-if="cartStore.items.length === 0" class="text-center py-20">
        <div class="w-24 h-24 mx-auto mb-6">
          <svg
            class="w-full h-full text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H2M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6M9 19v2m4-2v2"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">購物車是空的</h2>
        <p class="text-gray-500 mb-8">您還沒有添加任何商品到購物車</p>
        <RouterLink
          to="/products"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          開始購物
        </RouterLink>
      </div>

      <!-- 購物車有商品 -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 商品列表 -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm border">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900">商品清單</h2>
            </div>
            <div class="divide-y divide-gray-200">
              <div
                v-for="item in cartStore.items"
                :key="`${item.id}-${item.size}`"
                class="p-6 flex items-center space-x-4"
              >
                <!-- 商品圖片 -->
                <div class="flex-shrink-0">
                  <img
                    :src="item.image || '/images/default-shoe.jpg'"
                    :alt="item.name"
                    class="w-20 h-20 object-cover rounded-lg"
                  />
                </div>

                <!-- 商品資訊 -->
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-medium text-gray-900">{{ item.name }}</h3>
                  <p class="text-gray-500">尺寸: {{ item.size }}</p>
                  <p class="text-lg font-semibold text-blue-600">NT$ {{ item.price }}</p>
                </div>

                <!-- 數量控制 -->
                <div class="flex items-center space-x-3">
                  <button
                    @click="updateQuantity(item, item.quantity - 1)"
                    class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span class="text-lg font-medium">{{ item.quantity }}</span>
                  <button
                    @click="updateQuantity(item, item.quantity + 1)"
                    class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>

                <!-- 小計 -->
                <div class="text-right">
                  <p class="text-lg font-semibold text-gray-900">
                    NT$ {{ item.price * item.quantity }}
                  </p>
                </div>

                <!-- 刪除按鈕 -->
                <button @click="removeItem(item)" class="text-red-500 hover:text-red-700 p-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 結算區域 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">訂單摘要</h2>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">商品數量</span>
                <span class="font-medium">{{ cartStore.totalItems }} 件</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">小計</span>
                <span class="font-medium">NT$ {{ cartStore.totalPrice }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">運費</span>
                <span class="font-medium">NT$ {{ shippingFee }}</span>
              </div>
              <div class="border-t pt-3 flex justify-between">
                <span class="text-lg font-semibold">總計</span>
                <span class="text-lg font-semibold text-blue-600">
                  NT$ {{ cartStore.totalPrice + shippingFee }}
                </span>
              </div>
            </div>

            <div class="space-y-3">
              <button
                @click="checkout"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                立即結帳
              </button>
              <RouterLink
                to="/products"
                class="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors text-center block"
              >
                繼續購物
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { ElMessage, ElMessageBox } from 'element-plus'

const cartStore = useCartStore()

// 運費計算
const shippingFee = computed(() => {
  return cartStore.totalPrice > 1500 ? 0 : 100
})

// 更新商品數量
const updateQuantity = (item, newQuantity) => {
  if (newQuantity <= 0) {
    removeItem(item)
  } else {
    cartStore.updateQuantity(item.id, item.size, newQuantity)
  }
}

// 移除商品
const removeItem = async (item) => {
  try {
    await ElMessageBox.confirm('確定要移除此商品嗎？', '確認移除', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    cartStore.removeItem(item.id, item.size)
    ElMessage.success('商品已移除')
  } catch {
    // 用戶取消操作
  }
}

// 結帳
const checkout = () => {
  ElMessage.info('結帳功能開發中...')
  // 這裡將來會導向結帳頁面
}
</script>
