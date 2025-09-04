<template>
  <div
    class="register-view min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">註冊新帳戶</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          或者
          <RouterLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
            登入現有帳戶
          </RouterLink>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">姓名</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="請輸入您的姓名"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">電子郵件</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="請輸入電子郵件地址"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">密碼</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="請輸入密碼"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
              >確認密碼</label
            >
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="請再次輸入密碼"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span v-if="isLoading">註冊中...</span>
            <span v-else>註冊</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const isLoading = ref(false)

const handleRegister = async () => {
  // 驗證表單
  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.password ||
    !form.value.confirmPassword
  ) {
    ElMessage.warning('請填寫所有欄位')
    return
  }

  if (form.value.password !== form.value.confirmPassword) {
    ElMessage.error('密碼不一致')
    return
  }

  if (form.value.password.length < 6) {
    ElMessage.error('密碼至少需要6個字符')
    return
  }

  isLoading.value = true

  try {
    // 模擬 API 註冊
    await new Promise((resolve) => setTimeout(resolve, 1000))

    ElMessage.success('註冊成功，請登入')
    router.push('/login')
  } catch (error) {
    ElMessage.error('註冊失敗，請稍後再試')
  } finally {
    isLoading.value = false
  }
}
</script>
