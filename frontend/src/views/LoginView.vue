<template>
  <div
    class="login-view min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">登入您的帳戶</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          或者
          <RouterLink to="/register" class="font-medium text-blue-600 hover:text-blue-500">
            註冊新帳戶
          </RouterLink>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">電子郵件</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="電子郵件地址"
            />
          </div>
          <div>
            <label for="password" class="sr-only">密碼</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="密碼"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> 記住我 </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500"> 忘記密碼？ </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span v-if="isLoading">登入中...</span>
            <span v-else>登入</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  email: '',
  password: '',
  rememberMe: false,
})

const isLoading = ref(false)

const handleLogin = async () => {
  if (!form.value.email || !form.value.password) {
    ElMessage.warning('請填寫所有欄位')
    return
  }

  isLoading.value = true

  try {
    // 模擬 API 登入
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 模擬登入成功
    if (form.value.email === 'admin@example.com' && form.value.password === 'password') {
      const userData = {
        id: 1,
        name: '管理員',
        email: form.value.email,
      }

      userStore.login(userData)
      ElMessage.success('登入成功')
      router.push('/')
    } else {
      ElMessage.error('帳號或密碼錯誤')
    }
  } catch (error) {
    ElMessage.error('登入失敗，請稍後再試')
  } finally {
    isLoading.value = false
  }
}
</script>
