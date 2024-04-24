<template>
  <div>
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Form tìm kiếm sách -->
      <form @submit.prevent="searchBooks" class="mb-4">
        <input
          v-model="search"
          type="text"
          placeholder="Search"
          class="p-2 border rounded-md mr-2 text-black"
        />
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Search
        </button>
      </form>

      <!-- Danh sách sách -->
      <h2 class="text-2xl font-bold mb-4 uppercase text-center">
        Books (Tổng số lượng sách: {{ totalBooks }})
      </h2>
      <div class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-200">
              <th class="px-4 py-2">Mã Sách</th>
              <th class="px-4 py-2">Tên Sách</th>
              <th class="px-4 py-2">Đơn Giá</th>
              <th class="px-4 py-2">Số Quyển</th>
              <th class="px-4 py-2">Năm Xuất Bản</th>
              <th class="px-4 py-2">Mã Nhà Xuất Bản</th>
              <th class="px-4 py-2">Mã Tác Giả</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in searchResults" :key="book.bookCode">
              <td class="border px-4 py-2">{{ book.bookCode }}</td>
              <td class="border px-4 py-2">{{ book.bookName }}</td>
              <td class="border px-4 py-2">{{ book.price }}</td>
              <td class="border px-4 py-2">{{ book.numberBook }}</td>
              <td class="border px-4 py-2">{{ book.yearPB }}</td>
              <td class="border px-4 py-2">{{ book.NXBCode }}</td>
              <td class="border px-4 py-2">{{ book.writer }}</td>
              <td class="border px-4 py-2">
                <a
                  :href="'book_manage.php?delete_id=' + book.bookCode"
                  @click.prevent="confirmDelete(book.bookCode)"
                  class="text-red-500"
                  >Delete</a
                >
                <span class="px-2">|</span>
                <a
                  :href="'edit-book?bookCode=' + book.bookCode"
                  class="text-blue-500"
                  >Edit</a
                >
              </td>
            </tr>
            <tr v-if="searchResults.length === 0">
              <td colspan="8" class="text-center">No books found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Form thêm sách mới -->
      <h2 class="text-2xl font-bold mt-8">Add New Book</h2>
      <form @submit.prevent="addBook" class="mt-4">
        <input
          v-model="newBook.bookCode"
          type="text"
          placeholder="Mã Sách"
          class="p-2 border rounded-md mr-2 text-black"
        />
        <input
          v-model="newBook.bookName"
          type="text"
          placeholder="Tên Sách"
          class="p-2 border rounded-md mr-2 text-black"
        />
        <input
          v-model="newBook.price"
          type="text"
          placeholder="Đơn Giá"
          class="p-2 border rounded-md mr-2 text-black"
        />
        <input
          v-model="newBook.numberBook"
          type="Number"
          placeholder="Số Quyển"
          class="p-2 border rounded-md mr-2 text-black"
        />
        <input
          v-model="newBook.yearPB"
          type="text"
          placeholder="Năm Xuất Bản"
          class="p-2 border rounded-md mr-2 text-black"
        />
        <input
          v-model="newBook.NXBCode"
          type="text"
          placeholder="Mã Nhà Xuất Bản"
          class="p-2 border rounded-md mr-2 text-black"
        />
        <input
          v-model="newBook.writer"
          type="text"
          placeholder="Mã Tác Giả"
          class="p-2 border rounded-md mr-2 text-black"
        />
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add Book
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { server } from "../../server";
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      searchResults: [],
      totalBooks: 0,
      newBook: {
        bookCode: "",
        bookName: "",
        price: "",
        numberBook: "",
        yearPB: "",
        NXBCode: "",
        writer: "",
      },
      isLoggedIn: false,
    };
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    async searchBooks() {
      try {
        if (!this.search.trim()) {
          await this.getBooks();
        } else {
          const filteredBooks = this.search
            ? this.searchResults.filter((book) =>
                book.bookName.toLowerCase().includes(this.search.toLowerCase())
              )
            : this.searchResults;
          this.searchResults = filteredBooks;
          this.totalBooks = filteredBooks.length;
        }
      } catch (error) {
        console.error("Error searching books:", error);
      }
    },
    async getBooks() {
      try {
        const response = await axios.get(`${server}/book/get-books`);
        this.searchResults = response.data.books;
        this.totalBooks = response.data.totalBooks;
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
    async addBook() {
      try {
        const response = await axios.post(
          `${server}/book/create-book`,
          this.newBook
        );
        if (response.data.success) {
          alert("Added book!");
          this.newBook = {
            bookCode: "",
            bookName: "",
            price: "",
            numberBook: "",
            yearPB: "",
            NXBCode: "",
            writer: "",
          };
          // Refresh book list
          this.getBooks();
        }
      } catch (error) {
        console.error("Error adding book:", error);
      }
    },
    confirmDelete(bookId) {
      if (confirm("Are you sure?")) {
        // Proceed with book deletion
        // Redirect or send AJAX request to delete the book
      }
    },
    logout() {
      // Handle logout
      // Redirect to logout page or send AJAX request to logout
    },
  },
};
</script>

<style>
/* Your custom styles here */
</style>
