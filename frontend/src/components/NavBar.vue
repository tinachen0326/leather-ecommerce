<template>
  <nav class="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-sm">履</span>
            </div>
            <span class="text-xl font-bold text-gray-900">履藝</span>
          </RouterLink>
        </div>

        <!-- 搜尋欄 (桌面版) -->
        <div class="hidden md:block flex-1 max-w-lg mx-8">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜尋皮鞋..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              @keyup.enter="handleSearch"
            />
            <Search class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <!-- 導航連結 (桌面版) -->
        <div class="hidden md:flex items-center space-x-6">
          <RouterLink
            to="/"
            class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            :class="{ 'text-primary-600': $route.name === 'home' }"
          >
            首頁
          </RouterLink>
          <RouterLink
            to="/products"
            class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            :class="{ 'text-primary-600': $route.name === 'products' }"
          >
            商品
          </RouterLink>

          <!-- 購物車 -->
          <RouterLink to="/cart" class="relative p-2">
            <ShoppingCart class="w-6 h-6 text-gray-700 hover:text-primary-600" />
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartStore.itemCount }}
            </span>
          </RouterLink>

          <!-- 使用者選單 -->
          <div v-if="userStore.isAuthenticated" class="relative">
            <el-dropdown trigger="click" @command="handleUserMenuCommand">
              <button class="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                <User class="w-5 h-5" />
                <span class="font-medium">{{ userStore.user?.name }}</span>
                <ChevronDown class="w-4 h-4" />
              </button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">個人資料</el-dropdown-item>
                  <el-dropdown-item command="orders">訂單查詢</el-dropdown-item>
                  <el-dropdown-item v-if="userStore.isAdmin" command="admin"
                    >後台管理</el-dropdown-item
                  >
                  <el-dropdown-item divided command="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <!-- 登入/註冊 -->
          <div v-else class="flex items-center space-x-4">
            <RouterLink to="/login" class="text-gray-700 hover:text-primary-600 font-medium">
              登入
            </RouterLink>
            <RouterLink to="/register" class="btn-primary"> 註冊 </RouterLink>
          </div>
        </div>

        <!-- 手機版選單按鈕 -->
        <div class="md:hidden flex items-center space-x-4">
          <RouterLink to="/cart" class="relative p-2">
            <ShoppingCart class="w-6 h-6 text-gray-700" />
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartStore.itemCount }}
            </span>
          </RouterLink>
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- 手機版選單 -->
      <div v-show="isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
          <!-- 搜尋欄 -->
          <div class="mb-4">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜尋皮鞋..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                @keyup.enter="handleSearch"
              />
              <Search class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <!-- 導航連結 -->
          <RouterLink
            to="/"
            class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
            @click="isMobileMenuOpen = false"
          >
            首頁
          </RouterLink>
          <RouterLink
            to="/products"
            class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
            @click="isMobileMenuOpen = false"
          >
            商品
          </RouterLink>

          <!-- 使用者相關連結 -->
          <div v-if="userStore.isAuthenticated" class="border-t border-gray-200 pt-4">
            <div class="flex items-center px-3 py-2 mb-2">
              <User class="w-5 h-5 text-gray-400 mr-2" />
              <span class="text-base font-medium text-gray-900">{{ userStore.user?.name }}</span>
            </div>
            <RouterLink
              to="/profile"
              class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
              @click="isMobileMenuOpen = false"
            >
              個人資料
            </RouterLink>
            <RouterLink
              to="/orders"
              class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
              @click="isMobileMenuOpen = false"
            >
              訂單查詢
            </RouterLink>
            <RouterLink
              v-if="userStore.isAdmin"
              to="/admin"
              class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
              @click="isMobileMenuOpen = false"
            >
              後台管理
            </RouterLink>
            <button
              @click="handleLogout"
              class="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
            >
              登出
            </button>
          </div>
          <div v-else class="border-t border-gray-200 pt-4">
            <RouterLink
              to="/login"
              class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
              @click="isMobileMenuOpen = false"
            >
              登入
            </RouterLink>
            <RouterLink
              to="/register"
              class="block px-3 py-2 text-base font-medium bg-primary-600 text-white hover:bg-primary-700 rounded-md"
              @click="isMobileMenuOpen = false"
            >
              註冊
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const productStore = useProductStore()

const isMobileMenuOpen = ref(false)
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    productStore.updateFilters({ search: searchQuery.value.trim() })
    router.push('/products')
    isMobileMenuOpen.value = false
  }
}

const handleUserMenuCommand = (command) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'orders':
      router.push('/orders')
      break
    case 'admin':
      router.push('/admin')
      break
    case 'logout':
      handleLogout()
      break
  }
}

const handleLogout = () => {
  userStore.logout()
  isMobileMenuOpen.value = false
  router.push('/')
}
</script>
