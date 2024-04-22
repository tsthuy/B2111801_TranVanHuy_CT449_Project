<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      // Sử dụng biến để kiểm tra trang
      isNotFoundOrLoginOrSignup: false,
    };
  },
  watch: {
    $route(to, from) {
      // Kiểm tra xem trang hiện tại có phải là "notfound", "login" hoặc "signup" không
      this.isNotFoundOrLoginOrSignup = ["notfound", "login", "signup"].includes(
        to.name
      );
    },
  },
};
</script>

<template>
  <div id="app">
    <!-- Sử dụng điều kiện để kiểm tra xem header có nên được hiển thị không -->
    <AppHeader v-if="!isNotFoundOrLoginOrSignup" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style></style>
