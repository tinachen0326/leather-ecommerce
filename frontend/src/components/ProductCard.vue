<template>
  <div
    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
  >
    <div class="aspect-w-1 aspect-h-1">
      <img
        :src="product.image || '/images/default-shoe.jpg'"
        :alt="product.name"
        class="w-full h-64 object-cover"
      />
    </div>
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
      <p class="text-gray-600 mb-4">{{ product.description }}</p>
      <div class="flex items-center justify-between">
        <span class="text-2xl font-bold text-blue-600">NT$ {{ product.price }}</span>
        <button
          @click="addToCart"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { ElMessage } from 'element-plus'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()

const addToCart = () => {
  cartStore.addItem(props.product)
  ElMessage.success('商品已加入購物車')
}
</script>
