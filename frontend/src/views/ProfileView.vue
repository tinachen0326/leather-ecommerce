<template>
  <div class="profile-view">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white shadow rounded-lg">
        <!-- 個人資料標題 -->
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-gray-900">個人資料</h1>
          <p class="mt-1 text-sm text-gray-500">管理您的個人資訊和帳戶設定</p>
        </div>

        <div class="px-4 py-5 sm:p-6">
          <!-- 個人資訊 -->
          <div class="mb-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">基本資料</h2>
            <form @submit.prevent="updateProfile" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                  <input
                    v-model="profile.name"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">電子郵件</label>
                  <input
                    v-model="profile.email"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">電話</label>
                  <input
                    v-model="profile.phone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">生日</label>
                  <input
                    v-model="profile.birthday"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">地址</label>
                <textarea
                  v-model="profile.address"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                更新資料
              </button>
            </form>
          </div>

          <!-- 密碼變更 -->
          <div class="mb-8 border-t pt-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">變更密碼</h2>
            <form @submit.prevent="changePassword" class="space-y-4 max-w-md">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">目前密碼</label>
                <input
                  v-model="passwordForm.currentPassword"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">新密碼</label>
                <input
                  v-model="passwordForm.newPassword"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">確認新密碼</label>
                <input
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                變更密碼
              </button>
            </form>
          </div>

          <!-- 購買歷史 -->
          <div class="border-t pt-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">購買歷史</h2>
            <div class="space-y-4">
              <div
                v-for="order in orders"
                :key="order.id"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <p class="font-medium">訂單編號: {{ order.orderNumber }}</p>
                    <p class="text-sm text-gray-500">{{ order.date }}</p>
                  </div>
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800',
                    ]"
                  >
                    {{ getStatusText(order.status) }}
                  </span>
                </div>
                <div class="text-sm text-gray-600">
                  <p>共 {{ order.items.length }} 件商品</p>
                  <p class="font-medium text-gray-900">總計: NT$ {{ order.total }}</p>
                </div>
              </div>

              <div v-if="orders.length === 0" class="text-center py-8 text-gray-500">
                尚無購買紀錄
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

// 個人資料表單
const profile = ref({
  name: '',
  email: '',
  phone: '',
  birthday: '',
  address: '',
})

// 密碼變更表單
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// 訂單歷史
const orders = ref([
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'completed',
    items: [{ name: '經典牛津鞋', quantity: 1 }],
    total: 3500,
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    date: '2024-01-10',
    status: 'processing',
    items: [{ name: '休閒皮鞋', quantity: 1 }],
    total: 2800,
  },
])

// 更新個人資料
const updateProfile = () => {
  // 驗證表單
  if (!profile.value.name || !profile.value.email) {
    ElMessage.warning('請填寫必要欄位')
    return
  }

  // 模擬 API 更新
  ElMessage.success('個人資料更新成功')
}

// 變更密碼
const changePassword = () => {
  if (
    !passwordForm.value.currentPassword ||
    !passwordForm.value.newPassword ||
    !passwordForm.value.confirmPassword
  ) {
    ElMessage.warning('請填寫所有密碼欄位')
    return
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    ElMessage.error('新密碼不一致')
    return
  }

  if (passwordForm.value.newPassword.length < 6) {
    ElMessage.error('新密碼至少需要6個字符')
    return
  }

  // 模擬 API 更新
  ElMessage.success('密碼變更成功')

  // 清空表單
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
}

// 獲取訂單狀態文字
const getStatusText = (status) => {
  const statusMap = {
    completed: '已完成',
    processing: '處理中',
    cancelled: '已取消',
  }
  return statusMap[status] || '未知'
}

// 初始化資料
onMounted(() => {
  if (userStore.user) {
    profile.value.name = userStore.user.name || ''
    profile.value.email = userStore.user.email || ''
  }
})
</script>
