<template>
  <div class="bg-gray-100">
    <!-- Phần Header -->

    <!-- Phần Content -->
    <div class="container mx-auto py-8">
      <h2 class="text-2xl font-semibold mb-4 uppercase text-center">
        Danh sách các loại sách
      </h2>
      <div class="flex flex-wrap mb-3">
        <div class="w-full md:w-1/2">
          <form @submit.prevent="searchBooks" class="flex items-center">
            <input
              v-model="search"
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
        </div>
        <div class="w-full md:w-1/4">
          <select
            v-model="selectedCategory"
            @change="filterBooksByCategory"
            class="block appearance-none w-full bg-green-500 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-none focus:bg-gray focus:border-gray-500 focus:text-black"
          >
            <option value="">Thể loại</option>
            <option
              v-for="category in categories"
              :value="category.maLoai"
              :key="category.maLoai"
            >
              {{ category.tenLoai }}
            </option>
          </select>
        </div>
      </div>
      <!-- Hiển thị các loại sách -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="(book, index) in books"
          :key="index"
          class="bg-white p-4 shadow rounded text-center"
        >
          <h3 class="text-lg font-semibold mb-2 text-red-500">
            {{ book.bookName }}
          </h3>
          <p class="text-gray-600 mb-4">Tác giả: {{ book.writer }}</p>
          <p class="text-gray-600 mb-4">Số lượng: {{ book.numberBook }}</p>
          <a
            :href="'borrow?bookCode=' + book.bookCode"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >Mượn sách</a
          >
        </div>
      </div>
    </div>

    <!-- Phần Footer -->
    <!-- <Footer /> -->
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../server";
export default {
  components: {},
  data() {
    return {
      books: [],
      search: "",
      selectedCategory: "",
      categories: [
        { maLoai: "TL01", tenLoai: "Kinh Tế" },
        { maLoai: "TL02", tenLoai: "Hài Kịch" },
        { maLoai: "TL03", tenLoai: "Văn Học" },
        { maLoai: "TL04", tenLoai: "Tiểu Thuyết" },
        { maLoai: "TL05", tenLoai: "Viễn Tưởng" },
      ],
    };
  },
  methods: {
    async searchBooks() {
      try {
        if (!this.search.trim()) {
          await this.getBooks();
        } else {
          const filteredBooks = this.search
            ? this.books.filter((book) =>
                book.bookName.toLowerCase().includes(this.search.toLowerCase())
              )
            : this.books;
          this.books = filteredBooks;
        }
      } catch (error) {
        console.error("Error searching books:", error);
      }
    },
    async getBooks() {
      try {
        const response = await axios.get(`${server}/book/get-books`);
        this.books = response.data.books;
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
    async filterBooksByCategory() {
      try {
        this.$router.push("/");
        if (!this.selectedCategory) {
          await this.getBooks(); // Nếu không chọn category, lấy tất cả sách
        } else {
          // Lọc sách có cùng type với selectedCategory
          const filteredBooks = this.books.filter(
            (book) => book.type === this.selectedCategory
          );
          this.books = filteredBooks;
        }
      } catch (error) {
        console.error("Error filtering books by category:", error);
      }
    },
  },
  mounted() {
    this.getBooks();
  },
};
</script>

<style>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
