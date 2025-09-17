# 皮鞋電商網站專案架構
## 專案簡介
Luvo履藝皮鞋是一個模擬真實商業環境的全端電商練習專案，專注於高品質手工皮鞋的線上銷售。本專案旨在通過實作一個完整的電商系統，深入學習現代 Web 開發技術棧，包括前後端分離架構、資料庫設計、用戶體驗優化等核心技能。

## 核心價值
### 用戶功能
- 商品瀏覽：響應式商品展示，支援分類篩選和搜尋
- 購物車系統：即時更新，持久化存儲
- 會員系統：註冊登入、個人資料管理
- 訂單管理：完整的下單流程和訂單追蹤
- 商品評價：用戶評分和評論系統
- 收藏功能：心願清單管理

### 管理員功能
- 商品管理：CRUD 操作、庫存管理、圖片上傳
- 訂單管理：訂單狀態更新、出貨管理
- 用戶管理：會員資料查看和管理
- 數據統計：銷售報表和分析圖表
- 內容管理：輪播圖、公告管理

### 技術特色
- 響應式設計：完美支援桌面端和移動端
- 實時更新：購物車和庫存即時同步
- 圖片優化：自動壓縮和 CDN 加速
- SEO 友好：結構化數據和元標籤優化
- 安全防護：JWT 認證、XSS 和 CSRF 防護

## 資料結構
<img width="3201" height="2512" alt="Untitled" src="https://github.com/user-attachments/assets/3ab4c106-1bb4-44c5-9454-4e0acd80b512" />
### 核心資料表
```
 核心資料表:
├── users (使用者)
├── addresses (地址)  
├── categories (商品分類)
├── products (商品)
├── product_variants (商品規格)
├── product_images (商品圖片)
├── cart_items (購物車)
├── orders (訂單)
├── order_items (訂單項目)
├── order_status_history (訂單狀態歷史)
├── reviews (評價)
├── review_images (評價圖片)
├── coupons (優惠券)
└── coupon_usage (優惠券使用記錄)
```
## 專案結構
```
luvo-ecommerce-practice/
├──  frontend/                 # Vue.js 前端應用
│   ├──  src/
│   │   ├──  components/       # 組件庫
│   │   │   ├──  base/         # 基礎組件
│   │   │   ├──  business/     # 業務組件
│   │   │   └──  layout/       # 佈局組件
│   │   ├──  views/            # 頁面組件
│   │   ├──  stores/           # Pinia 狀態管理
│   │   ├──  router/           # 路由配置
│   │   ├──  utils/            # 工具函數
│   │   └──  assets/           # 靜態資源
│   ├──  package.json
│   ├──  tailwind.config.js
│   └──  vite.config.js
├──  backend/                  # Node.js 後端 API
│   ├──  src/
│   │   ├──  models/           # 資料模型
│   │   ├──  controllers/      # 控制器
│   │   ├──  routes/           # 路由定義
│   │   ├──  middleware/       # 中間件
│   │   ├──  services/         # 業務邏輯
│   │   ├──  utils/            # 工具函數
│   │   └──  config/           # 配置文件
│   ├──  uploads/              # 文件上傳
│   ├──  package.json
│   └──  server.js
├──  database/                 # 資料庫腳本
│   ├──  init.sql
│   └──  seed.js
├──  README.md
└──  .gitignore
```
## 版權聲明
此專案僅供個人學習與紀錄使用，無授權任何學習教材用途與商業用途。

