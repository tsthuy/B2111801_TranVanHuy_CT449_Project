<template>
  <div>
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Form tìm kiếm sách -->
      <form @submit.prevent="searchBooks" class="mb-4">
        <a
          href="book_copy.php"
          class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md m-4"
          >Quản Lý Sách Copy</a
        >
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
              <th class="px-4 py-2">Mã Tác Giả</th>
              <th class="px-4 py-2">Mã Nhà Xuất Bản</th>
              <th class="px-4 py-2">Mã Loại</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in searchResults" :key="book.maSach">
              <td class="border px-4 py-2">{{ book.maSach }}</td>
              <td class="border px-4 py-2">{{ book.tenSach }}</td>
              <td class="border px-4 py-2">{{ book.maTG }}</td>
              <td class="border px-4 py-2">{{ book.maNXB }}</td>
              <td class="border px-4 py-2">{{ book.maLoai }}</td>
              <td class="border px-4 py-2">
                <a
                  :href="'book_manage.php?delete_id=' + book.maSach"
                  @click.prevent="confirmDelete(book.maSach)"
                  class="text-red-500"
                  >Delete</a
                >
                <span class="px-2">|</span>
                <a
                  :href="'book_manage.php?update=' + book.maSach"
                  class="text-blue-500"
                  >Edit</a
                >
              </td>
            </tr>
            <tr v-if="searchResults.length === 0">
              <td colspan="6" class="text-center">No books found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Form thêm sách mới -->
      <h2 class="text-2xl font-bold mt-8">Add New Book</h2>
      <form @submit.prevent="addBook" class="mt-4">
        <input
          v-model="newBook.maSach"
          type="text"
          placeholder="Mã Sách"
          class="p-2 border rounded-md mr-2 text-black"
        />
        <input
          v-model="newBook.tenSach"
          type="text"
          placeholder="Tên Sách"
          class="p-2 border rounded-md mr-2 text-black"
        />
        <input
          v-model="newBook.maTG"
          type="text"
          placeholder="Mã Tác Giả"
          class="p-2 border rounded-md mr-2 text-black"
        />
        <input
          v-model="newBook.maNXB"
          type="text"
          placeholder="Mã Nhà Xuất Bản"
          class="p-2 border rounded-md mr-2 text-black"
        />
        <input
          v-model="newBook.maLoai"
          type="text"
          placeholder="Mã Loại"
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
export default {
  data() {
    return {
      search: "",
      searchResults: [],
      totalBooks: 0,
      newBook: {
        maSach: "",
        tenSach: "",
        maTG: "",
        maNXB: "",
        maLoai: "",
      },
      isLoggedIn: false, // assuming you have a way to check login status
    };
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    searchBooks() {
      // Handle book search
      // Use this.search to get the search keyword
      // Send AJAX request or filter directly based on this.search
    },
    getBooks() {
      // Fetch all books
      // Populate this.searchResults with the fetched books data
      // You can use AJAX or fetch API
    },
    addBook() {
      // Handle adding new book
      // Use this.newBook to get the new book data
      // Send AJAX request to add the book
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
