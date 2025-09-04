import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 狀態
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isLoading = ref(false)

  // 計算屬性
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // 動作
  const login = async (credentials) => {
    isLoading.value = true
    try {
      // 這裡之後會連接真正的 API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (response.ok) {
        const data = await response.json()
        token.value = data.token
        user.value = data.user
        localStorage.setItem('token', data.token)
        return { success: true }
      } else {
        throw new Error('登入失敗')
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userInfo) => {
    isLoading.value = true
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      })

      if (response.ok) {
        const data = await response.json()
        token.value = data.token
        user.value = data.user
        localStorage.setItem('token', data.token)
        return { success: true }
      } else {
        throw new Error('註冊失敗')
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  const fetchUser = async () => {
    if (!token.value) return

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      if (response.ok) {
        const userData = await response.json()
        user.value = userData
      } else {
        logout()
      }
    } catch (error) {
      console.error('獲取使用者資料失敗:', error)
      logout()
    }
  }

  return {
    // 狀態
    user,
    token,
    isLoading,

    // 計算屬性
    isAuthenticated,
    isAdmin,

    // 動作
    login,
    register,
    logout,
    fetchUser,
  }
})
