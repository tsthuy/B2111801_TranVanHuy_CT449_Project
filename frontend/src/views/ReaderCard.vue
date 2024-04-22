<template>
  <div class="container mx-auto mt-5">
    <h1 class="text-center mb-4 uppercase font-bold">
      Danh sách thẻ thư viện (Tổng số lượng thẻ thư viện:
      {{ total_library_cards }})
    </h1>

    <div class="flex items-center space-x-4">
      <!-- Phần tìm kiếm -->
      <div class="w-1/3">
        <form @submit.prevent="searchReaderCards" class="flex items-center">
          <input
            v-model="keyword"
            type="text"
            placeholder="Tìm kiếm..."
            class="p-2 border rounded-md mr-2 text-black"
          />
          <button
            type="submit"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Tìm
          </button>
        </form>
      </div>

      <!-- Phần sắp xếp -->
      <div class="w-1/3">
        <form @submit.prevent="sortBy" class="flex items-center">
          <select
            v-model="sort_by"
            class="block appearance-none w-full bg-green-500 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-none focus:bg-black focus:border-gray-500"
          >
            <option value="NgayBatDau">Sắp xếp theo ngày bắt đầu</option>
            <option value="NgayHetHan">Sắp xếp theo ngày hết hạn</option>
          </select>
          <button
            type="submit"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Chọn
          </button>
        </form>
      </div>

      <!-- Nút thêm thẻ thư viện -->
      <button
        @click="toggleAddForm"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Thêm thẻ thư viện
      </button>
    </div>

    <!-- Form thêm thẻ thư viện -->
    <form v-show="showAddForm" @submit.prevent="addReaderCard" class="mt-4">
      <div class="flex items-center space-x-4">
        <div>
          <label for="SoThe" class="block">Số Thẻ:</label>
          <input
            v-model="newReaderCard.SoThe"
            type="text"
            id="SoThe"
            class="p-2 border rounded-md text-black"
          />
        </div>
        <div>
          <label for="NgayBatDau" class="block">Ngày bắt đầu:</label>
          <input
            v-model="newReaderCard.NgayBatDau"
            type="date"
            id="NgayBatDau"
            class="p-2 border rounded-md text-black"
          />
        </div>
        <div>
          <label for="NgayHetHan" class="block">Ngày hết hạn:</label>
          <input
            v-model="newReaderCard.NgayHetHan"
            type="date"
            id="NgayHetHan"
            class="p-2 border rounded-md text-black"
          />
        </div>
        <div>
          <label for="GhiChu" class="block">Ghi chú:</label>
          <input
            v-model="newReaderCard.GhiChu"
            type="text"
            id="GhiChu"
            class="p-2 border rounded-md text-black"
          />
        </div>
        <button
          @click="toggleAddForm"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Thêm thẻ thư viện
        </button>
      </div>
    </form>

    <!-- Bảng danh sách thẻ thư viện -->
    <div class="mt-4">
      <table class="w-full table-auto text-center">
        <thead>
          <tr class="bg-blue-300">
            <th class="px-4 py-2">Số thẻ</th>
            <th class="px-4 py-2">Ngày bắt đầu</th>
            <th class="px-4 py-2">Ngày hết hạn</th>
            <th class="px-4 py-2">Ghi chú</th>
            <th class="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="readerCard in readerCards" :key="readerCard.SoThe">
            <td class="border px-4 py-2">{{ readerCard.SoThe }}</td>
            <td class="border px-4 py-2">{{ readerCard.NgayBatDau }}</td>
            <td class="border px-4 py-2">{{ readerCard.NgayHetHan }}</td>
            <td class="border px-4 py-2">{{ readerCard.GhiChu }}</td>
            <td class="border px-4 py-2">
              <button
                @click="editReaderCard(readerCard.SoThe)"
                class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Sửa
              </button>
              <button
                @click="deleteReaderCard(readerCard.SoThe)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      sort_by: "NgayBatDau",
      readerCards: [],
      total_library_cards: 0,
      newReaderCard: {
        SoThe: "",
        NgayBatDau: "",
        NgayHetHan: "",
        GhiChu: "",
      },
      showAddForm: false,
    };
  },
  mounted() {
    this.fetchReaderCards();
  },
  methods: {
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
    },
    fetchReaderCards() {
      // Lấy danh sách thẻ thư viện từ API hoặc cơ sở dữ liệu
      // Cập nhật readerCards và total_library_cards
    },
    searchReaderCards() {
      // Tìm kiếm thẻ thư viện dựa trên keyword
      // Gọi fetchReaderCards() để cập nhật lại danh sách
    },
    sortBy() {
      // Sắp xếp thẻ thư viện theo thuộc tính được chọn
      // Gọi fetchReaderCards() để cập nhật lại danh sách
    },
    addReaderCard() {
      // Thêm một thẻ thư viện mới
      // Gọi fetchReaderCards() để cập nhật lại danh sách
      this.showAddForm = false;
    },
    editReaderCard(SoThe) {
      // Chỉnh sửa một thẻ thư viện
      // Đưa dữ liệu thẻ thư viện cần chỉnh sửa vào form
    },
    deleteReaderCard(SoThe) {
      // Xóa một thẻ thư viện
      // Gọi fetchReaderCards() để cập nhật lại danh sách
    },
  },
};
</script>

<style scoped>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
