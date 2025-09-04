<template>
  <div class="admin-view">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 頁面標題 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">管理後台</h1>
        <p class="text-gray-600 mt-2">商品與訂單管理</p>
      </div>

      <!-- 統計卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">總商品數</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalProducts }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">總訂單數</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalOrders }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">總用戶數</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-white"
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
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">總銷售額</p>
              <p class="text-2xl font-bold text-gray-900">
                NT$ {{ stats.totalRevenue.toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 功能選項卡 -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <div class="p-6">
          <!-- 商品管理 -->
          <div v-if="activeTab === 'products'">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-900">商品管理</h2>
              <button
                @click="openProductModal()"
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                新增商品
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      商品
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      價格
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      庫存
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      狀態
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="product in products" :key="product.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <img
                          :src="product.image || '/images/default-shoe.jpg'"
                          :alt="product.name"
                          class="w-10 h-10 rounded-lg object-cover"
                        />
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      NT$ {{ product.price }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ product.stock || 0 }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="[
                          'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                          product.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800',
                        ]"
                      >
                        {{ product.active ? '上架中' : '已下架' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        @click="openProductModal(product)"
                        class="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        編輯
                      </button>
                      <button
                        @click="deleteProduct(product)"
                        class="text-red-600 hover:text-red-900"
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 訂單管理 -->
          <div v-else-if="activeTab === 'orders'">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">訂單管理</h2>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      訂單編號
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      客戶
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      金額
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      狀態
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      日期
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="order in adminOrders" :key="order.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ order.orderNumber }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ order.customerName }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      NT$ {{ order.total }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <select
                        v-model="order.status"
                        @change="updateOrderStatus(order)"
                        class="text-sm border-gray-300 rounded-md"
                      >
                        <option value="pending">待處理</option>
                        <option value="processing">處理中</option>
                        <option value="shipped">已出貨</option>
                        <option value="delivered">已送達</option>
                        <option value="cancelled">已取消</option>
                      </select>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(order.createdAt) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button class="text-blue-600 hover:text-blue-900">查看詳情</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 用戶管理 -->
          <div v-else-if="activeTab === 'users'">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">用戶管理</h2>
            <div class="text-gray-500 text-center py-12">用戶管理功能開發中...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import { ElMessage, ElMessageBox } from 'element-plus'

const productStore = useProductStore()

const activeTab = ref('products')
const stats = ref({
  totalProducts: 0,
  totalOrders: 0,
  totalUsers: 0,
  totalRevenue: 0,
})

const tabs = [
  { id: 'products', name: '商品管理' },
  { id: 'orders', name: '訂單管理' },
  { id: 'users', name: '用戶管理' },
]

const products = ref([])
const adminOrders = ref([])

// 模擬管理員數據
const mockProducts = [
  { id: 1, name: '經典牛津鞋', price: 3500, stock: 50, active: true, image: '/images/shoe1.jpg' },
  { id: 2, name: '休閒皮鞋', price: 2800, stock: 30, active: true, image: '/images/shoe2.jpg' },
  { id: 3, name: '商務皮鞋', price: 4200, stock: 25, active: false, image: '/images/shoe3.jpg' },
]

const mockOrders = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    customerName: '陳先生',
    total: 3500,
    status: 'processing',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    customerName: '王小姐',
    total: 2800,
    status: 'shipped',
    createdAt: '2024-01-10T14:20:00Z',
  },
]

// 打開商品編輯模態框
const openProductModal = (product = null) => {
  ElMessage.info('商品編輯功能開發中...')
}

// 刪除商品
const deleteProduct = async (product) => {
  try {
    await ElMessageBox.confirm(`確定要刪除商品「${product.name}」嗎？`, '確認刪除', {
      confirmButtonText: '確定刪除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    const index = products.value.findIndex((p) => p.id === product.id)
    if (index > -1) {
      products.value.splice(index, 1)
      stats.value.totalProducts--
      ElMessage.success('商品刪除成功')
    }
  } catch {
    // 用戶取消操作
  }
}

// 更新訂單狀態
const updateOrderStatus = (order) => {
  ElMessage.success(`訂單 ${order.orderNumber} 狀態已更新`)
}

// 格式化日期
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-TW')
}

onMounted(() => {
  // 載入模擬數據
  products.value = mockProducts
  adminOrders.value = mockOrders

  // 計算統計數據
  stats.value = {
    totalProducts: mockProducts.length,
    totalOrders: mockOrders.length,
    totalUsers: 156,
    totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
  }
})
</script>
