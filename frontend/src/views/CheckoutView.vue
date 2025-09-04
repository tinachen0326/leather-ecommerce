<template>
  <div class="checkout-view">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">結帳</h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 左側：結帳表單 -->
        <div class="space-y-6">
          <!-- 配送資訊 -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">配送資訊</h2>
            <form class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                  <input
                    v-model="shippingInfo.name"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">電話</label>
                  <input
                    v-model="shippingInfo.phone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">電子郵件</label>
                <input
                  v-model="shippingInfo.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">配送地址</label>
                <textarea
                  v-model="shippingInfo.address"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
            </form>
          </div>

          <!-- 付款方式 -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">付款方式</h2>
            <div class="space-y-3">
              <label class="flex items-center">
                <input v-model="paymentMethod" type="radio" value="credit_card" class="mr-3" />
                信用卡
              </label>
              <label class="flex items-center">
                <input v-model="paymentMethod" type="radio" value="bank_transfer" class="mr-3" />
                銀行轉帳
              </label>
              <label class="flex items-center">
                <input v-model="paymentMethod" type="radio" value="cash_on_delivery" class="mr-3" />
                貨到付款
              </label>
            </div>
          </div>
        </div>

        <!-- 右側：訂單摘要 -->
        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">訂單摘要</h2>

            <!-- 商品列表 -->
            <div class="space-y-3 mb-6">
              <div
                v-for="item in cartStore.items"
                :key="`${item.id}-${item.size}`"
                class="flex justify-between items-center"
              >
                <div class="flex-1">
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-sm text-gray-500">尺寸: {{ item.size }} × {{ item.quantity }}</p>
                </div>
                <span class="font-medium">NT$ {{ item.price * item.quantity }}</span>
              </div>
            </div>

            <!-- 費用明細 -->
            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">小計</span>
                <span>NT$ {{ cartStore.totalPrice }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">運費</span>
                <span>NT$ {{ shippingFee }}</span>
              </div>
              <div class="flex justify-between text-lg font-semibold border-t pt-2">
                <span>總計</span>
                <span class="text-blue-600">NT$ {{ cartStore.totalPrice + shippingFee }}</span>
              </div>
            </div>

            <!-- 確認按鈕 -->
            <button
              @click="submitOrder"
              :disabled="!isFormValid"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg mt-6 transition-colors"
            >
              確認訂單
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const cartStore = useCartStore()
const router = useRouter()

// 配送資訊
const shippingInfo = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
})

// 付款方式
const paymentMethod = ref('credit_card')

// 運費計算
const shippingFee = computed(() => {
  return cartStore.totalPrice > 1500 ? 0 : 100
})

// 表單驗證
const isFormValid = computed(() => {
  return (
    shippingInfo.value.name &&
    shippingInfo.value.phone &&
    shippingInfo.value.email &&
    shippingInfo.value.address &&
    paymentMethod.value &&
    cartStore.items.length > 0
  )
})

// 提交訂單
const submitOrder = () => {
  if (!isFormValid.value) {
    ElMessage.error('請填寫所有必填欄位')
    return
  }

  // 模擬訂單提交
  ElMessage.success('訂單提交成功！')

  // 清空購物車
  cartStore.clearCart()

  // 跳轉到首頁或訂單完成頁面
  router.push('/')
}
</script>
