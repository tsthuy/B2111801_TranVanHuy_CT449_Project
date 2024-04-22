<template>
  <div>
    <div
      class="container max-w-full mx-auto bg-white p-8 mt-8 rounded-lg shadow-lg"
    >
      <h1 class="text-2xl font-bold mb-4 text-center uppercase">
        Quản lý bản sao sách
      </h1>

      <!-- Hiển thị thông báo kết quả -->
      <p v-if="addCopyResult" class="mb-4">{{ addCopyResult }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Form tìm kiếm sách -->
        <div>
          <h2 class="text-xl font-bold">Tìm kiếm sách</h2>
          <form @submit.prevent="searchBooks" class="mb-4">
            <input
              v-model="search"
              type="text"
              placeholder="Tìm kiếm sách"
              class="p-2 border rounded-md mr-2 text-black"
            />
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Tìm kiếm
            </button>
          </form>

          <!-- Danh sách kết quả tìm kiếm sách -->
          <div v-if="searchResultsBooks.length > 0">
            <h2 class="text-xl font-bold">Kết quả tìm kiếm sách</h2>
            <table class="mt-4">
              <tr>
                <th class="px-4 py-2">Mã Sách</th>
                <th class="px-4 py-2">Tên Sách</th>
                <th class="px-4 py-2">Thao Tác</th>
              </tr>
              <tr v-for="book in searchResultsBooks" :key="book.maSach">
                <td class="border px-4 py-2">{{ book.maSach }}</td>
                <td class="border px-4 py-2">{{ book.tenSach }}</td>
                <td class="border px-4 py-2">
                  <button
                    @click="viewBookCopies(book.maSach, book.maNXB)"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Xem bản sao
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Hiển thị danh sách bản sao sách -->
        <div v-if="showBookCopies">
          <h2 class="text-xl font-bold">Danh sách bản sao của sách</h2>
          <table class="mt-4">
            <tr>
              <th class="px-4 py-2">Mã Bản Sao</th>
              <th class="px-4 py-2">Năm Xuất Bản</th>
              <th class="px-4 py-2">Tình Trạng</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
            <tr v-for="copy in searchResultsCopies" :key="copy.maBanSao">
              <td class="border px-4 py-2">{{ copy.maBanSao }}</td>
              <td class="border px-4 py-2">{{ copy.namXB }}</td>
              <td class="border px-4 py-2">{{ copy.ttMuon }}</td>
              <td class="border px-4 py-2">
                <a
                  :href="
                    './edit_book_copy.php?maBanSao=' +
                    copy.maBanSao +
                    '&maSach=' +
                    maSach
                  "
                  class="text-blue-500 hover:text-blue-700"
                  >Edit</a
                >
                |
                <a
                  :href="
                    './delete_copy_book.php?maBanSao=' +
                    copy.maBanSao +
                    '&maSach=' +
                    maSach +
                    '&maNXB=' +
                    maNXB +
                    '&searchcopy=' +
                    searchcopy
                  "
                  @click.prevent="confirmDelete"
                  class="text-red-500 hover:text-red-700"
                  >Delete</a
                >
              </td>
            </tr>
            <tr v-if="searchResultsCopies.length === 0">
              <td colspan="4" class="border px-4 py-2">Chưa có bản sao.</td>
            </tr>
          </table>

          <!-- Form thêm bản sao mới -->
          <h2 class="text-xl font-bold mt-8">Thêm bản sao mới</h2>
          <form @submit.prevent="addBookCopy" class="mb-4">
            <input type="hidden" name="searchcopy" v-model="searchcopy" />
            <input
              type="text"
              name="maSach"
              :value="maSach"
              class="p-2 border rounded-md mr-2 text-black"
            />
            <input
              type="text"
              name="maBanSao"
              placeholder="Mã bản sao"
              class="p-2 border rounded-md mr-2 text-black"
            />
            <input
              type="text"
              name="namXB"
              placeholder="Năm xuất bản"
              class="p-2 border rounded-md mr-2 text-black"
            />
            <input
              type="text"
              name="ttMuon"
              placeholder="Tình trạng"
              class="p-2 border rounded-md mr-2 text-black"
            />
            <input
              type="text"
              name="maNXB"
              :value="maNXB"
              class="p-2 border rounded-md mr-2 text-black"
            />
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Thêm bản sao
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      searchResultsBooks: [],
      showBookCopies: false,
      searchResultsCopies: [],
      maSach: "",
      maNXB: "",
      searchcopy: "",
      addCopyResult: "",
    };
  },
  methods: {
    searchBooks() {
      // Handle book search
    },
    viewBookCopies(maSach, maNXB) {
      // Handle viewing book copies
      this.maSach = maSach;
      this.maNXB = maNXB;
      this.showBookCopies = true;
      // Fetch book copies based on maSach
    },
    addBookCopy() {
      // Handle adding book copy
    },
    confirmDelete() {
      // Handle delete confirmation
      // Show confirm dialog and delete book copy
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
