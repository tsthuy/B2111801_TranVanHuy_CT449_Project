<template>
  <header class="bg-blue-700 text-white p-4 uppercase">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold"
        >Hệ thống <br />
        quản lý thư viện</router-link
      >
      <!-- Phần tìm kiếm -->
      <form @submit.prevent="searchBooks" class="flex items-center">
        <input
          v-model="keyword"
          type="text"
          placeholder="Tìm kiếm sách"
          class="p-2 border rounded-md mr-2 text-black"
        />
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Tìm kiếm
        </button>
      </form>
      <!-- Kết thúc phần tìm kiếm -->

      <!-- Dropdown danh sách thể loại sách -->
      <div class="relative">
        <select
          v-model="selectedCategory"
          @change="navigateToCategory"
          class="block appearance-none w-full bg-green-500 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-none focus:bg-black focus:border-gray-500 focus:text-white"
        >
          <option value="">Thể loại</option>
          <option
            v-for="category in categories"
            :value="'/home?category=' + encodeURIComponent(category.tenLoai)"
            :key="category.id"
          >
            {{ category.tenLoai }}
          </option>
        </select>

        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M14.293 7.293a1 1 0 0 0-1.414-1.414l-3 3a1 1 0 0 0-.001 1.415l3 3a1 1 0 0 0 1.415-1.415L11.414 11H16a1 1 0 0 0 0-2h-4.586l2.293-2.293z"
            />
          </svg>
        </div>
      </div>
      <!-- Kết thúc dropdown danh sách thể loại sách -->

      <!-- Thêm phần Độc giả -->
      <router-link to="/reader" class="hover:text-gray-300"
        >Độc giả</router-link
      >

      <!-- Thêm phần Thẻ thư viện -->
      <router-link to="/reader_card" class="hover:text-gray-300"
        >Thẻ thư viện</router-link
      >
      <nav>
        <ul class="flex space-x-4">
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
            <a href="/login" class="hover:text-gray-300">
              <span v-if="loggedIn">Log out</span>
              <span v-else>Đăng Nhập</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
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
      // Xử lý tìm kiếm sách
      // Redirect hoặc hiển thị kết quả tìm kiếm
    },
    navigateToCategory() {
      // Chuyển hướng đến trang danh sách sách theo thể loại đã chọn
      if (this.selectedCategory) {
        this.$router.push(this.selectedCategory);
      }
    },
  },
  computed: {
    loggedIn() {
      // Kiểm tra xem người dùng đã đăng nhập chưa
      // Trả về true nếu đã đăng nhập, ngược lại trả về false
      return /* Thêm điều kiện kiểm tra đăng nhập */;
    },
  },
};
</script>
y
