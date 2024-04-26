<template>
  <div class="min-h-screen bg-gray-100 mt-2">
    <a
      href="/book"
      class="text-white pb-1 px-3 rounded hover:text-blue-600 text-4xl bg-blue-500"
      >&larr;</a
    >

    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-semibold text-center mb-8">Edit Book</h1>

      <!-- Form chỉnh sửa thông tin sách -->
      <form
        @submit.prevent="updateBook"
        class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        <div class="mb-4">
          <label for="bookCode" class="block text-sm font-medium text-gray-700"
            >Mã Sách:</label
          >
          <input
            disabled
            v-model="book.bookCode"
            type="text"
            id="bookCode"
            class="border p-2 font-bold cursor-not-allowed mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="bookName" class="block text-sm font-medium text-gray-700"
            >Tên Sách:</label
          >
          <input
            v-model="book.bookName"
            type="text"
            id="bookName"
            class="mt-1 border p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="price" class="block text-sm font-medium text-gray-700"
            >Đơn Giá:</label
          >
          <input
            v-model="book.price"
            type="text"
            id="price"
            class="mt-1 border p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label
            for="numberBook"
            class="block text-sm font-medium text-gray-700"
            >Số Lượng:</label
          >
          <input
            v-model="book.numberBook"
            type="text"
            id="numberBook"
            class="mt-1 border p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="yearPB" class="block text-sm font-medium text-gray-700"
            >Năm Xuất Bản:</label
          >
          <input
            v-model="book.yearPB"
            type="text"
            id="yearPB"
            class="mt-1 border p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="NXBCode" class="block text-sm font-medium text-gray-700"
            >Mã Nhà Xuất Bản:</label
          >
          <input
            v-model="book.NXBCode"
            type="text"
            id="NXBCode"
            class="mt-1 border p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="writer" class="block text-sm font-medium text-gray-700"
            >Mã Tác Giả:</label
          >
          <input
            v-model="book.writer"
            type="text"
            id="writer"
            class="mt-1 border p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="writer" class="block text-sm font-medium text-gray-700"
            >Thể Loại:</label
          >
          <input
            v-model="book.type"
            type="text"
            id="writer"
            class="mt-1 border p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../server";

export default {
  data() {
    return {
      book: {
        bookCode: "",
        bookName: "",
        price: "",
        numberBook: "",
        yearPB: "",
        NXBCode: "",
        writer: "",
        type: "",
      },
      updateBookResult: "",
    };
  },
  async created() {
    // Trích xuất mã sách từ query string trong URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookCode = urlParams.get("bookCode");

    // Nếu không có mã sách trong query string, không làm gì cả
    if (!bookCode) {
      alert("No book code provided in the URL");
      return;
    }

    try {
      const response = await axios.get(
        `${server}/book/get-book?bookCode=${bookCode}`
      );
      const bookData = response.data.book;

      // Gán thông tin của cuốn sách vào data để hiển thị trong form
      this.book = {
        bookCode: bookData.bookCode,
        bookName: bookData.bookName,
        price: bookData.price,
        numberBook: bookData.numberBook,
        yearPB: bookData.yearPB,
        NXBCode: bookData.NXBCode,
        writer: bookData.writer,
        type: bookData.type,
      };
    } catch (error) {
      console.error("Error loading book data:", error);
    }
  },
  methods: {
    async updateBook() {
      try {
        const response = await axios.put(
          `${server}/book/update-book`,
          this.book
        );
        if (response.data && response.data.success) {
          this.updateBookResult = "Book updated successfully!";
          this.$router.push("/book");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
/* Tailwind CSS styles */
</style>
