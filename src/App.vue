<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
   data() {
    return {
      // Sử dụng biến để kiểm tra trang
      isNotFound: false,
    };
  },
  watch: {
    // Sử dụng watch để theo dõi thay đổi trang và cập nhật biến isNotFound
    $route(to, from) {
      this.isNotFound = to.name === "notfound";
    },
  },
};
</script>
<template>
  <div id="app">
     <AppHeader v-if="!isNotFound" />
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>