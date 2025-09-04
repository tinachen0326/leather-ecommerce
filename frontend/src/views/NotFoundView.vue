<template>
  <div class="not-found">
    <h1>404 - 找不到頁面</h1>
    <p>抱歉，您要找的頁面不存在。</p>
    <router-link to="/" class="back-home">回到首頁</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}

.back-home {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.back-home:hover {
  background-color: #0056b3;
}
</style>
