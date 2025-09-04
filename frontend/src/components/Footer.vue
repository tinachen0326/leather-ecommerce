<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 公司資訊 -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-sm">履</span>
            </div>
            <span class="text-xl font-bold">履藝</span>
          </div>
          <p class="text-gray-300 mb-4 max-w-md">
            履藝專注於提供高品質的皮鞋，結合傳統工藝與現代設計， 為每一位顧客打造完美的穿著體驗。
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-300 hover:text-primary-400 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-300 hover:text-primary-400 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-300 hover:text-primary-400 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.162-1.499-.69-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017 0z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- 快速連結 -->
        <div>
          <h3 class="text-lg font-semibold mb-4">快速連結</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink
                to="/products"
                class="text-gray-300 hover:text-primary-400 transition-colors"
              >
                所有商品
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/products"
                class="text-gray-300 hover:text-primary-400 transition-colors"
              >
                正裝鞋
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/products"
                class="text-gray-300 hover:text-primary-400 transition-colors"
              >
                休閒鞋
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/products"
                class="text-gray-300 hover:text-primary-400 transition-colors"
              >
                靴子
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- 客戶服務 -->
        <div>
          <h3 class="text-lg font-semibold mb-4">客戶服務</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-300 hover:text-primary-400 transition-colors">
                常見問題
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-primary-400 transition-colors">
                配送資訊
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-primary-400 transition-colors">
                退換貨政策
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-primary-400 transition-colors">
                聯絡我們
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-primary-400 transition-colors">
                尺寸指南
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 分隔線 -->
      <div class="border-t border-gray-700 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-400 text-sm">
            <p>&copy; {{ currentYear }} 履藝. 版權所有.</p>
          </div>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              隱私權政策
            </a>
            <a href="#" class="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              服務條款
            </a>
            <a href="#" class="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Cookie 政策
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
