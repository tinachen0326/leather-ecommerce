<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- 導航列 -->
    <NavBar />

    <!-- 主要內容 -->
    <main class="pt-16">
      <RouterView />
    </main>

    <!-- 頁尾 -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

const userStore = useUserStore()

onMounted(() => {
  // 應用程式啟動時，如果有 token 就嘗試獲取使用者資料
  if (userStore.token) {
    userStore.fetchUser()
  }
})
</script>

<style scoped>
/* 如果需要額外的樣式可以在這裡添加 */
</style>
