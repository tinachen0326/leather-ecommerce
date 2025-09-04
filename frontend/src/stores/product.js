import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('product', () => {
  // 狀態
  const products = ref([])
  const currentProduct = ref(null)
  const isLoading = ref(false)
  const filters = ref({
    search: '',
    brand: '',
    minPrice: 0,
    maxPrice: 50000,
    sizes: [],
    colors: [],
  })

  // 模擬商品資料
  const mockProducts = [
    {
      id: 1,
      name: '經典牛津皮鞋',
      brand: 'ClassicLeather',
      price: 8900,
      originalPrice: 12000,
      image: '/images/oxford-shoes.jpg',
      images: ['/images/oxford-1.jpg', '/images/oxford-2.jpg', '/images/oxford-3.jpg'],
      description: '採用頂級真皮製作，手工縫製的經典牛津皮鞋，適合正式場合穿著。',
      sizes: [39, 40, 41, 42, 43, 44, 45],
      colors: ['黑色', '棕色'],
      category: '正裝鞋',
      stock: 50,
      rating: 4.5,
      reviews: 128,
    },
    {
      id: 2,
      name: '休閒樂福鞋',
      brand: 'ComfortWalk',
      price: 5900,
      originalPrice: 7500,
      image: '/images/loafers.jpg',
      images: ['/images/loafers-1.jpg', '/images/loafers-2.jpg'],
      description: '舒適的樂福鞋設計，採用柔軟皮革和舒適鞋墊，適合日常穿搭。',
      sizes: [39, 40, 41, 42, 43, 44],
      colors: ['黑色', '棕色', '深藍'],
      category: '休閒鞋',
      stock: 35,
      rating: 4.3,
      reviews: 85,
    },
    {
      id: 3,
      name: '布洛克雕花皮鞋',
      brand: 'ArtisanCraft',
      price: 12500,
      originalPrice: 16000,
      image: '/images/brogues.jpg',
      images: ['/images/brogues-1.jpg', '/images/brogues-2.jpg', '/images/brogues-3.jpg'],
      description: '精緻的布洛克雕花設計，展現英式紳士風格，每一雙都是工藝傑作。',
      sizes: [40, 41, 42, 43, 44, 45],
      colors: ['棕色', '黑色'],
      category: '正裝鞋',
      stock: 20,
      rating: 4.8,
      reviews: 67,
    },
    {
      id: 4,
      name: '運動休閒皮鞋',
      brand: 'SportyStyle',
      price: 4500,
      originalPrice: 6000,
      image: '/images/sport-casual.jpg',
      images: ['/images/sport-1.jpg', '/images/sport-2.jpg'],
      description: '結合運動鞋舒適性和皮鞋優雅的混合設計，適合現代都市生活。',
      sizes: [39, 40, 41, 42, 43, 44, 45, 46],
      colors: ['白色', '黑色', '灰色'],
      category: '休閒鞋',
      stock: 60,
      rating: 4.2,
      reviews: 156,
    },
    {
      id: 5,
      name: '高筒靴',
      brand: 'RuggedStyle',
      price: 9800,
      originalPrice: 13000,
      image: '/images/boots.jpg',
      images: ['/images/boots-1.jpg', '/images/boots-2.jpg'],
      description: '堅固耐用的高筒靴，採用防水皮革和防滑鞋底，適合戶外活動。',
      sizes: [40, 41, 42, 43, 44, 45],
      colors: ['棕色', '黑色'],
      category: '靴子',
      stock: 25,
      rating: 4.6,
      reviews: 93,
    },
    {
      id: 6,
      name: '商務正裝皮鞋',
      brand: 'BusinessElite',
      price: 15800,
      originalPrice: 20000,
      image: '/images/business.jpg',
      images: ['/images/business-1.jpg', '/images/business-2.jpg', '/images/business-3.jpg'],
      description: '頂級商務正裝皮鞋，採用意大利進口皮革，完美展現專業形象。',
      sizes: [39, 40, 41, 42, 43, 44, 45],
      colors: ['黑色'],
      category: '正裝鞋',
      stock: 15,
      rating: 4.9,
      reviews: 42,
    },
  ]

  // 計算屬性
  const filteredProducts = computed(() => {
    let filtered = products.value

    // 搜尋過濾
    if (filters.value.search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
          product.brand.toLowerCase().includes(filters.value.search.toLowerCase()),
      )
    }

    // 品牌過濾
    if (filters.value.brand) {
      filtered = filtered.filter((product) => product.brand === filters.value.brand)
    }

    // 價格過濾
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.value.minPrice && product.price <= filters.value.maxPrice,
    )

    // 尺寸過濾
    if (filters.value.sizes.length > 0) {
      filtered = filtered.filter((product) =>
        filters.value.sizes.some((size) => product.sizes.includes(size)),
      )
    }

    // 顏色過濾
    if (filters.value.colors.length > 0) {
      filtered = filtered.filter((product) =>
        filters.value.colors.some((color) => product.colors.includes(color)),
      )
    }

    return filtered
  })

  const brands = computed(() => {
    const allBrands = products.value.map((product) => product.brand)
    return [...new Set(allBrands)]
  })

  const allSizes = computed(() => {
    const sizes = products.value.flatMap((product) => product.sizes)
    return [...new Set(sizes)].sort((a, b) => a - b)
  })

  const allColors = computed(() => {
    const colors = products.value.flatMap((product) => product.colors)
    return [...new Set(colors)]
  })

  // 動作
  const fetchProducts = async () => {
    isLoading.value = true
    try {
      // 模擬 API 延遲
      await new Promise((resolve) => setTimeout(resolve, 1000))
      products.value = mockProducts
    } catch (error) {
      console.error('獲取商品失敗:', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchProduct = async (id) => {
    isLoading.value = true
    try {
      // 模擬 API 延遲
      await new Promise((resolve) => setTimeout(resolve, 500))
      currentProduct.value = mockProducts.find((product) => product.id === parseInt(id))
    } catch (error) {
      console.error('獲取商品詳情失敗:', error)
    } finally {
      isLoading.value = false
    }
  }

  const updateFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearFilters = () => {
    filters.value = {
      search: '',
      brand: '',
      minPrice: 0,
      maxPrice: 50000,
      sizes: [],
      colors: [],
    }
  }

  return {
    // 狀態
    products,
    currentProduct,
    isLoading,
    filters,

    // 計算屬性
    filteredProducts,
    brands,
    allSizes,
    allColors,

    // 動作
    fetchProducts,
    fetchProduct,
    updateFilters,
    clearFilters,
  }
})
