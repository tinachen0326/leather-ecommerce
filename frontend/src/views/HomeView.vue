<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-gray-900 to-gray-600 text-white">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left">
            <h1 class="text-4xl lg:text-6xl font-bold mb-6">
              精工細作
              <span class="text-primary-400">品味皮鞋</span>
            </h1>
            <p class="text-xl lg:text-2xl mb-8 text-gray-200">
              每一雙鞋都承載著工匠的精神，為您呈現無與倫比的穿著體驗
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <RouterLink to="/products" class="btn-primary text-lg px-8 py-3">
                探索商品
              </RouterLink>
              <button
                class="btn-secondary text-lg px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900"
              >
                了解更多
              </button>
            </div>
          </div>
          <div class="hidden lg:block">
            <img
              src="/images/hero-shoes.jpg"
              alt="精美皮鞋"
              class="w-full h-auto rounded-lg shadow-2xl"
              style="max-height: 500px; object-fit: cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 特色商品 -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">精選商品</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            嚴選高品質皮革，結合現代工藝與經典設計，打造您的完美風格
          </p>
        </div>

        <div v-if="productStore.isLoading" class="flex justify-center py-12">
          <el-loading />
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>

        <div class="text-center mt-12">
          <RouterLink to="/products" class="btn-primary text-lg px-8 py-3">
            查看所有商品
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 品牌特色 -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">為什麼選擇履藝</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">品質保證</h3>
            <p class="text-gray-600">
              嚴選優質皮革材料，每一雙鞋都經過嚴格的品質檢驗，確保您獲得最佳的產品體驗。
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">快速配送</h3>
            <p class="text-gray-600">
              提供快速可靠的配送服務，讓您能夠盡快收到心愛的皮鞋，享受購物的便利。
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">售後服務</h3>
            <p class="text-gray-600">
              提供完善的售後服務，包括免費退換貨、保養建議等，讓您購買無後顧之憂。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 客戶評價 -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">客戶好評</h2>
          <p class="text-lg text-gray-600">聽聽我們滿意客戶的真實回饋</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-gray-50 rounded-lg p-6">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <span v-for="star in 5" :key="star" class="text-xl">★</span>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              "配送速度很快，包裝也很仔細。皮鞋的做工真的很精緻，穿了一個月還是很新。會推薦給朋友！"
            </p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                <span class="text-gray-600 font-semibold">陳</span>
              </div>
              <div>
                <p class="font-semibold text-gray-900">陳先生</p>
                <p class="text-gray-500 text-sm">台中市</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter 訂閱 -->
    <section class="py-16 bg-primary-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="max-w-2xl mx-auto">
          <h2 class="text-3xl font-bold text-white mb-4">訂閱電子報</h2>
          <p class="text-primary-100 mb-8">第一時間獲得最新商品資訊、特惠活動和穿搭建議</p>
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              v-model="email"
              type="email"
              placeholder="請輸入您的電子郵件"
              class="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              @click="handleSubscribe"
              class="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              訂閱
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/ProductCard.vue'
import { ElMessage } from 'element-plus'

const productStore = useProductStore()
const email = ref('')

// 計算屬性：取前6個商品作為精選商品
const featuredProducts = computed(() => {
  return productStore.products.slice(0, 6)
})

// 訂閱電子報
const handleSubscribe = () => {
  if (!email.value) {
    ElMessage.warning('請輸入電子郵件地址')
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    ElMessage.error('請輸入有效的電子郵件地址')
    return
  }

  // 這裡應該要串接後端 API
  ElMessage.success('訂閱成功！感謝您的支持')
  email.value = ''
}

// 組件掛載時獲取商品資料
onMounted(async () => {
  await productStore.fetchProducts()
})
</script>

<style scoped>
/* Hero section 背景圖片 */
.hero-bg {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 平滑滾動效果 */
.scroll-smooth {
  scroll-behavior: smooth;
}

/* 動畫效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}
</style>
