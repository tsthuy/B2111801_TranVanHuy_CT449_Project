<template>
  <header class="bg-blue-700 text-white p-4 uppercase">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold"
        >Hệ thống <br />
        quản lý thư viện</router-link
      >

      <nav>
        <ul class="flex space-x-4">
          <li>
            <router-link to="/reader" class="hover:text-gray-300"
              >Độc Giả</router-link
            >
          </li>

          <li>
            <router-link to="/book" class="hover:text-gray-300"
              >Quản lý sách</router-link
            >
          </li>
          <li>
            <router-link to="/return" class="hover:text-gray-300"
              >Trả sách</router-link
            >
          </li>
          <li>
            <router-link to="/history" class="hover:text-gray-300"
              >Lịch sử mượn trả</router-link
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:text-gray-300"
              @click.prevent="handleLogin"
            >
              <span v-if="loggedIn">Đăng Xuất</span>
              <span v-else>Đăng Nhập</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import VueCookies from "vue-cookies";
export default {
  data() {
    return {
      keyword: "",
      selectedCategory: "",
      categories: [
        { id: 1, tenLoai: "Kinh Tế" },
        { id: 2, tenLoai: "Hài Kịch" },
        { id: 3, tenLoai: "Văn Học" },
        { id: 4, tenLoai: "Tiểu Thuyết" },
        { id: 5, tenLoai: "Viễn Tưởng" },
      ],
    };
  },
  methods: {
    searchBooks() {
      this.$router.push(`/?keyword=${this.keyword}`);
    },
    navigateToCategory() {
      if (this.selectedCategory) {
        this.$router.push(this.selectedCategory);
      }
    },
    handleLogin() {
      if (this.loggedIn) {
        this.logout();
      } else {
        this.$router.push("/login");
      }
    },
    logout() {
      // Xóa cookie 'loggedIn'
      VueCookies.remove("loggedIn");
      // Chuyển hướng đến trang đăng nhập (hoặc trang chính)
      this.$router.push("/login");
    },
  },
  computed: {
    loggedIn() {
      // Kiểm tra xem cookie 'loggedIn' có tồn tại không
      return VueCookies.get("loggedIn") === "true";
    },
  },
};
</script>
y
