<template>
  <div class="bg-gray-100">
    <!-- Phần Header -->

    <!-- Phần Content -->
    <div class="container mx-auto py-8">
      <h2 class="text-2xl font-semibold mb-4 uppercase text-center">
        Danh sách các loại sách
      </h2>

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
            {{ book.title }}
          </h3>
          <p class="text-gray-600 mb-4">Tác giả: {{ book.author }}</p>
          <p class="text-gray-600 mb-4">Nhà xuất bản: {{ book.publisher }}</p>
          <a
            :href="'borrow?maSach=' + book.id"
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
export default {
  components: {},
  data() {
    return {
      books: [
        // Dữ liệu sách có thể là một mảng các đối tượng
        {
          id: 1,
          title: "Tên sách 1",
          author: "Tác giả 1",
          publisher: "Nhà xuất bản 1",
        },
        {
          id: 2,
          title: "Tên sách 2",
          author: "Tác giả 2",
          publisher: "Nhà xuất bản 2",
        },
        // Thêm các đối tượng sách khác tương tự ở đây
      ],
    };
  },
};
</script>

<style>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
