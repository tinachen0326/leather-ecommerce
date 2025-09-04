<template>
  <div class="orders-view">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 頁面標題 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">我的訂單</h1>
        <p class="text-gray-600 mt-2">查看您的所有訂單記錄</p>
      </div>

      <!-- 篩選器 -->
      <div class="mb-6 flex flex-wrap gap-4 items-center">
        <select v-model="statusFilter" class="px-3 py-2 border border-gray-300 rounded-lg">
          <option value="">所有狀態</option>
          <option value="pending">待處理</option>
          <option value="processing">處理中</option>
          <option value="shipped">已出貨</option>
          <option value="delivered">已送達</option>
          <option value="cancelled">已取消</option>
        </select>

        <select v-model="timeFilter" class="px-3 py-2 border border-gray-300 rounded-lg">
          <option value="">所有時間</option>
          <option value="30">最近 30 天</option>
          <option value="90">最近 3 個月</option>
          <option value="365">最近一年</option>
        </select>
      </div>

      <!-- 訂單列表 -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="text-lg text-gray-600">載入中...</div>
      </div>

      <div v-else-if="filteredOrders.length === 0" class="text-center py-12">
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
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-700 mb-2">沒有找到訂單</h2>
        <p class="text-gray-500 mb-6">您還沒有任何訂單記錄</p>
        <RouterLink
          to="/products"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          開始購物
        </RouterLink>
      </div>

      <div v-else class="space-y-6">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="bg-white rounded-lg shadow-sm border"
        >
          <!-- 訂單標題 -->
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex flex-col md:flex-row md:items-center justify-between">
              <div class="mb-2 md:mb-0">
                <h3 class="text-lg font-semibold text-gray-900">
                  訂單編號: {{ order.orderNumber }}
                </h3>
                <p class="text-sm text-gray-500">下單時間: {{ formatDate(order.createdAt) }}</p>
              </div>
              <div class="flex items-center space-x-4">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    getStatusClass(order.status),
                  ]"
                >
                  {{ getStatusText(order.status) }}
                </span>
                <span class="text-lg font-bold text-blue-600"> NT$ {{ order.total }} </span>
              </div>
            </div>
          </div>

          <!-- 訂單商品 -->
          <div class="px-6 py-4">
            <div class="space-y-3">
              <div
                v-for="item in order.items"
                :key="`${order.id}-${item.id}`"
                class="flex items-center space-x-4"
              >
                <img
                  :src="item.image || '/images/default-shoe.jpg'"
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">{{ item.name }}</h4>
                  <p class="text-sm text-gray-500">
                    尺寸: {{ item.size }} | 數量: {{ item.quantity }}
                  </p>
                  <p class="text-sm font-medium text-gray-900">NT$ {{ item.price }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 訂單操作 -->
          <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-600">配送地址: {{ order.shippingAddress }}</div>
              <div class="flex space-x-2">
                <button
                  v-if="order.status === 'delivered'"
                  @click="reorder(order)"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  重新訂購
                </button>
                <button
                  v-if="canCancel(order.status)"
                  @click="cancelOrder(order)"
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  取消訂單
                </button>
                <RouterLink
                  :to="`/orders/${order.id}`"
                  class="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium rounded-lg transition-colors"
                >
                  查看詳情
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { ElMessage, ElMessageBox } from 'element-plus'

const cartStore = useCartStore()

const orders = ref([])
const isLoading = ref(true)
const statusFilter = ref('')
const timeFilter = ref('')

// 模擬訂單資料
const mockOrders = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    status: 'delivered',
    total: 3500,
    createdAt: '2024-01-15T10:30:00Z',
    shippingAddress: '台北市大安區信義路四段1號',
    items: [
      {
        id: 1,
        name: '經典牛津鞋',
        price: 3500,
        size: '42',
        quantity: 1,
        image: '/images/shoe1.jpg',
      },
    ],
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    status: 'processing',
    total: 2800,
    createdAt: '2024-01-10T14:20:00Z',
    shippingAddress: '台中市西區台灣大道二段2號',
    items: [
      {
        id: 2,
        name: '休閒皮鞋',
        price: 2800,
        size: '41',
        quantity: 1,
        image: '/images/shoe2.jpg',
      },
    ],
  },
  {
    id: 3,
    orderNumber: 'ORD-2024-003',
    status: 'shipped',
    total: 4200,
    createdAt: '2024-01-05T09:15:00Z',
    shippingAddress: '高雄市前金區中正四路3號',
    items: [
      {
        id: 3,
        name: '商務皮鞋',
        price: 4200,
        size: '43',
        quantity: 1,
        image: '/images/shoe3.jpg',
      },
    ],
  },
]

// 篩選後的訂單
const filteredOrders = computed(() => {
  let filtered = orders.value

  if (statusFilter.value) {
    filtered = filtered.filter((order) => order.status === statusFilter.value)
  }

  if (timeFilter.value) {
    const days = parseInt(timeFilter.value)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    filtered = filtered.filter((order) => new Date(order.createdAt) >= cutoffDate)
  }

  return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

// 獲取狀態樣式
const getStatusClass = (status) => {
  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

// 獲取狀態文字
const getStatusText = (status) => {
  const statusMap = {
    pending: '待處理',
    processing: '處理中',
    shipped: '已出貨',
    delivered: '已送達',
    cancelled: '已取消',
  }
  return statusMap[status] || '未知'
}

// 格式化日期
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 是否可以取消
const canCancel = (status) => {
  return ['pending', 'processing'].includes(status)
}

// 重新訂購
const reorder = (order) => {
  order.items.forEach((item) => {
    cartStore.addItem({
      ...item,
      quantity: item.quantity,
    })
  })
  ElMessage.success(`已將 ${order.items.length} 件商品加入購物車`)
}

// 取消訂單
const cancelOrder = async (order) => {
  try {
    await ElMessageBox.confirm(`確定要取消訂單 ${order.orderNumber} 嗎？`, '確認取消', {
      confirmButtonText: '確定取消',
      cancelButtonText: '保留訂單',
      type: 'warning',
    })

    // 模擬 API 取消訂單
    order.status = 'cancelled'
    ElMessage.success('訂單已取消')
  } catch {
    // 用戶取消操作
  }
}

// 載入訂單資料
onMounted(async () => {
  try {
    // 模擬 API 調用
    await new Promise((resolve) => setTimeout(resolve, 1000))
    orders.value = mockOrders
  } catch (error) {
    ElMessage.error('載入訂單失敗')
  } finally {
    isLoading.value = false
  }
})
</script>
