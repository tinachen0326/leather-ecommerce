# 履藝皮鞋電商網站專案架構
## 整體架構概覽
這是一個全端電商網站專案，採用前後端分離的架構：
```
luvo-ecommerce-practice/
├── frontend/                 # Vue.js 前端應用程式
├── backend/                  # Node.js/Express 後端 API
├── database/                 # 資料庫初始化腳本
└── README.md                 # 專案說明文件
```

## 前端架構 (Frontend)
### 技術棧
- **Vue.js 3** - 主要前端框架
- **Composition API** - Vue 3 的組合式 API
- **Vue Router 4** - 路由管理
- **Pinia** - 狀態管理
- **Tailwind CSS** - CSS 框架
- **Element Plus** - UI 組件庫
- **Axios** - HTTP 請求庫

### 資料夾結構
```
frontend/
├── src/
│   ├── components/           # 可重用組件
│   │   ├── NavBar.vue       # 導航列
│   │   ├── Footer.vue       # 頁尾
│   │   ├── ProductCard.vue  # 商品卡片
│   │   └── ...
│   ├── views/               # 頁面組件
│   │   ├── HomeView.vue     # 首頁
│   │   ├── ProductsView.vue # 商品列表頁
│   │   ├── ProductDetailView.vue # 商品詳情頁
│   │   ├── CartView.vue     # 購物車頁
│   │   ├── CheckoutView.vue # 結帳頁
│   │   ├── LoginView.vue    # 登入頁
│   │   ├── RegisterView.vue # 註冊頁
│   │   ├── ProfileView.vue  # 個人資料頁
│   │   ├── OrdersView.vue   # 訂單查詢頁
│   │   ├── AdminView.vue    # 後台管理頁
│   │   └── NotFoundView.vue # 404 頁面
│   ├── stores/              # Pinia 狀態管理
│   │   ├── user.js          # 使用者狀態
│   │   ├── cart.js          # 購物車狀態
│   │   ├── product.js       # 商品狀態
│   │   └── order.js         # 訂單狀態
│   ├── router/              # 路由設定
│   │   └── index.js         # 路由配置
│   ├── assets/              # 靜態資源
│   │   ├── main.css         # 主要樣式
│   │   └── images/          # 圖片資源
│   ├── utils/               # 工具函數
│   │   ├── api.js           # API 封裝
│   │   ├── auth.js          # 認證工具
│   │   └── helpers.js       # 輔助函數
│   ├── App.vue              # 根組件
│   └── main.js              # 應用程式入口
├── public/                  # 公共資源
├── index.html               # HTML 模板
├── package.json             # 依賴管理
├── tailwind.config.js       # Tailwind 配置
└── vite.config.js           # Vite 構建配置
```

## 後端架構 (Backend)
### 技術棧
- **Node.js** - 運行環境
- **Express.js** - 後端框架
- **MongoDB/MySQL** - 資料庫（可選擇）
- **JWT** - 身份驗證
- **Bcrypt** - 密碼加密
- **Multer** - 文件上傳
- **Cors** - 跨域處理

### 資料夾結構
```
backend/
├── models/                  # 資料模型
│   ├── User.js             # 使用者模型
│   ├── Product.js          # 商品模型
│   ├── Order.js            # 訂單模型
│   └── Cart.js             # 購物車模型
├── routes/                 # 路由處理
│   ├── auth.js             # 認證路由
│   ├── products.js         # 商品路由
│   ├── orders.js           # 訂單路由
│   └── users.js            # 使用者路由
├── controllers/            # 控制器
│   ├── authController.js   # 認證控制器
│   ├── productController.js # 商品控制器
│   ├── orderController.js  # 訂單控制器
│   └── userController.js   # 使用者控制器
├── middleware/             # 中間件
│   ├── auth.js             # 認證中間件
│   ├── upload.js           # 文件上傳中間件
│   └── validation.js       # 數據驗證中間件
├── uploads/                # 上傳文件存儲
├── config/                 # 配置文件
│   ├── database.js         # 資料庫配置
│   └── jwt.js              # JWT 配置
├── .env                    # 環境變數
├── server.js               # 伺服器入口
└── package.json            # 依賴管理
```

## 狀態管理架構
### Pinia Stores
1. **User Store** (`stores/user.js`)
   - 使用者認證狀態
   - 登入/登出功能
   - 使用者資料管理

2. **Product Store** (`stores/product.js`)
   - 商品列表管理
   - 商品篩選和搜尋
   - 商品詳情獲取

3. **Cart Store** (`stores/cart.js`)
   - 購物車狀態管理
   - 添加/移除商品
   - 數量更新和總價計算

4. **Order Store** (`stores/order.js`)
   - 訂單管理
   - 訂單歷史
   - 結帳流程

## 路由架構
### 公開路由
- `/` - 首頁
- `/products` - 商品列表
- `/products/:id` - 商品詳情
- `/login` - 登入頁
- `/register` - 註冊頁

### 需要認證的路由
- `/profile` - 個人資料
- `/cart` - 購物車
- `/checkout` - 結帳
- `/orders` - 訂單查詢

### 管理員路由
- `/admin` - 後台管理

## API 架構
### RESTful API 設計
```
/api/auth/
├── POST /register          # 使用者註冊
├── POST /login             # 使用者登入
├── POST /logout            # 使用者登出
└── GET /me                 # 獲取當前使用者資訊

/api/products/
├── GET /                   # 獲取商品列表
├── GET /:id                # 獲取單個商品
├── POST /                  # 新增商品 (管理員)
├── PUT /:id                # 更新商品 (管理員)
└── DELETE /:id             # 刪除商品 (管理員)

/api/orders/
├── GET /                   # 獲取訂單列表
├── GET /:id                # 獲取單個訂單
├── POST /                  # 建立訂單
└── PUT /:id/status         # 更新訂單狀態

/api/users/
├── GET /profile            # 獲取使用者資料
├── PUT /profile            # 更新使用者資料
└── GET /orders             # 獲取使用者訂單
```

## 資料庫設計
### 主要資料表
1. **users** - 使用者表
2. **products** - 商品表
3. **orders** - 訂單表
4. **order_items** - 訂單項目表
5. **categories** - 商品分類表

## 開發流程
1. **初始化專案** - 建立前後端資料夾結構
2. **設定開發環境** - 安裝依賴、配置工具
3. **設計資料庫** - 建立資料模型
4. **開發後端 API** - 實作各項功能
5. **開發前端頁面** - 建立 UI 組件和頁面
6. **整合測試** - 前後端整合測試
7. **部署上線** - 用Vercel部署來展示

## 版權聲明
此專案僅供個人學習參考使用，無授權用途。
