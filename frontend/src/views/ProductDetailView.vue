<template>
  <div class="product-detail-view">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="text-lg text-gray-600">載入中...</div>
      </div>

      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- 商品圖片 -->
        <div class="space-y-4">
          <div class="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <img
              :src="product.image || '/images/default-shoe.jpg'"
              :alt="product.name"
              class="w-full h-96 object-cover"
            />
          </div>
        </div>

        <!-- 商品資訊 -->
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
            <p class="text-2xl font-semibold text-blue-600 mt-2">NT$ {{ product.price }}</p>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">商品描述</h3>
            <p class="text-gray-600">{{ product.description }}</p>
          </div>

          <!-- 尺寸選擇 -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">尺寸</h3>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="size in availableSizes"
                :key="size"
                @click="selectedSize = size"
                :class="[
                  'py-2 px-4 border rounded-lg text-center transition-colors',
                  selectedSize === size
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400',
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- 數量選擇 -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">數量</h3>
            <div class="flex items-center space-x-4">
              <button
                @click="quantity > 1 && quantity--"
                class="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span class="text-lg font-medium">{{ quantity }}</span>
              <button
                @click="quantity++"
                class="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <!-- 操作按鈕 -->
          <div class="space-y-4">
            <button
              @click="addToCart"
              :disabled="!selectedSize"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              加入購物車
            </button>
            <button
              class="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              加入收藏
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <p class="text-lg text-gray-600">找不到該商品</p>
        <RouterLink to="/products" class="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          返回商品列表
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const productStore = useProductStore()

const product = ref(null)
const isLoading = ref(true)
const selectedSize = ref('')
const quantity = ref(1)
const availableSizes = ref(['38', '39', '40', '41', '42', '43', '44', '45'])

const addToCart = () => {
  if (!selectedSize.value) {
    ElMessage.warning('請選擇尺寸')
    return
  }

  const cartItem = {
    ...product.value,
    size: selectedSize.value,
    quantity: quantity.value,
  }

  cartStore.addItem(cartItem)
  ElMessage.success('商品已加入購物車')
}

onMounted(async () => {
  try {
    const productId = parseInt(route.params.id)

    // 如果商品列表還沒載入，先載入
    if (productStore.products.length === 0) {
      await productStore.fetchProducts()
    }

    // 找到對應的商品
    product.value = productStore.products.find((p) => p.id === productId)

    if (!product.value) {
      ElMessage.error('商品不存在')
      router.push('/products')
    }
  } catch (error) {
    console.error('載入商品詳情失敗:', error)
    ElMessage.error('載入商品資訊失敗')
  } finally {
    isLoading.value = false
  }
})
</script>
