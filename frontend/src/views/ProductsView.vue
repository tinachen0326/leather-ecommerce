<template>
  <div class="products-view">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 頁面標題 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">所有商品</h1>
        <p class="text-lg text-gray-600">探索我們精選的皮鞋系列</p>
      </div>

      <!-- 篩選和搜尋 -->
      <div class="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div class="flex gap-4">
          <select v-model="selectedCategory" class="px-4 py-2 border rounded-lg">
            <option value="">所有分類</option>
            <option value="formal">正式</option>
            <option value="casual">休閒</option>
            <option value="sports">運動</option>
          </select>
        </div>
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜尋商品..."
            class="px-4 py-2 pl-10 border rounded-lg w-64"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg
              class="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- 商品載入中 -->
      <div v-if="productStore.isLoading" class="flex justify-center py-12">
        <div class="text-lg text-gray-600">載入中...</div>
      </div>

      <!-- 商品列表 -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>

      <!-- 沒有商品 -->
      <div
        v-if="!productStore.isLoading && filteredProducts.length === 0"
        class="text-center py-12"
      >
        <p class="text-lg text-gray-600">找不到符合條件的商品</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()
const searchQuery = ref('')
const selectedCategory = ref('')

// 篩選商品
const filteredProducts = computed(() => {
  let filtered = productStore.products

  if (searchQuery.value) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter((product) => product.category === selectedCategory.value)
  }

  return filtered
})

onMounted(async () => {
  await productStore.fetchProducts()
})
</script>
