<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4 uppercase font-bold">
      Danh sách độc giả (Tổng số lượng độc giả: {{ totalReaders }})
    </h1>

    <div class="flex flex-wrap mb-3">
      <div class="w-full md:w-1/2">
        <form @submit.prevent="searchReader" class="flex">
          <input
            v-model="keyword"
            class="form-input mr-2"
            type="search"
            placeholder="Tìm kiếm"
            aria-label="Search"
          />
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Tìm kiếm
          </button>
        </form>
      </div>
      <div class="w-full md:w-1/4">
        <select v-model="sortBy" @change="sortReader" class="form-select">
          <option value="TenDocGia">Sắp xếp theo Tên</option>
          <option value="DiaChi">Sắp xếp theo Địa chỉ</option>
          <option value="SoThe">Sắp xếp theo Số thẻ</option>
        </select>
      </div>
      <div class="w-full md:w-1/4">
        <button
          @click="showAddForm"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Thêm độc giả
        </button>
      </div>
    </div>

    <div class="mt-4" v-show="showForm">
      <form @submit.prevent="addReader" class="mb-4">
        <div class="mb-4">
          <label for="MaDocGia" class="block text-sm font-medium text-gray-700"
            >Mã độc giả:</label
          >
          <input
            v-model="newReader.MaDocGia"
            type="text"
            id="MaDocGia"
            class="form-input mt-1"
            required
          />
        </div>
        <div class="mb-4">
          <label for="TenDocGia" class="block text-sm font-medium text-gray-700"
            >Tên độc giả:</label
          >
          <input
            v-model="newReader.TenDocGia"
            type="text"
            id="TenDocGia"
            class="form-input mt-1"
            required
          />
        </div>
        <div class="mb-4">
          <label for="DiaChi" class="block text-sm font-medium text-gray-700"
            >Địa chỉ:</label
          >
          <input
            v-model="newReader.DiaChi"
            type="text"
            id="DiaChi"
            class="form-input mt-1"
          />
        </div>
        <div class="mb-4">
          <label for="SoThe" class="block text-sm font-medium text-gray-700"
            >Số thẻ:</label
          >
          <input
            v-model="newReader.SoThe"
            type="text"
            id="SoThe"
            class="form-input mt-1"
            @keyup="searchTheThuVien"
          />
        </div>
        <div id="theThuVienResult"></div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Thêm độc giả
        </button>
      </form>
    </div>

    <div class="table-responsive mt-4">
      <table class="table-auto w-full">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="px-4 py-2">Mã độc giả</th>
            <th class="px-4 py-2">Tên độc giả</th>
            <th class="px-4 py-2">Địa chỉ</th>
            <th class="px-4 py-2">Số Thẻ</th>
            <th class="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr v-for="reader in readers" :key="reader.MaDocGia">
            <td class="border px-4 py-2">{{ reader.MaDocGia }}</td>
            <td class="border px-4 py-2">{{ reader.TenDocGia }}</td>
            <td class="border px-4 py-2">{{ reader.DiaChi }}</td>
            <td class="border px-4 py-2">{{ reader.SoThe }}</td>
            <td class="border px-4 py-2">
              <button
                @click="editReader(reader.MaDocGia)"
                class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded-full"
              >
                Sửa
              </button>
              <button
                @click="deleteReader(reader.MaDocGia)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
              >
                Xoá
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
      sortBy: "TenDocGia",
      keyword: "",
      showForm: false,
      newReader: {
        MaDocGia: "",
        TenDocGia: "",
        DiaChi: "",
        SoThe: "",
      },
    };
  },
  methods: {
    searchReader() {
      // Xử lý tìm kiếm độc giả
      // Sử dụng this.keyword để lấy từ khóa tìm kiếm
      // Gửi yêu cầu AJAX hoặc thực hiện tìm kiếm trên mảng this.readers
    },
    sortReader() {
      // Xử lý sắp xếp độc giả
      // Sử dụng this.sortBy để lấy cách sắp xếp được chọn
      // Gửi yêu cầu AJAX hoặc sắp xếp trực tiếp mảng this.readers
    },
    showAddForm() {
      this.showForm = true; // Hiển thị form thêm độc giả khi nhấn nút "Thêm độc giả"
    },
    addReader() {
      // Xử lý thêm độc giả
      // Sử dụng this.newReader để lấy thông tin của độc giả mới
      // Gửi yêu cầu AJAX hoặc thêm độc giả vào mảng this.readers
    },
    editReader(id) {
      // Xử lý sửa độc giả
      // Sử dụng id để xác định độc giả cần sửa
      // Chuyển hướng đến trang sửa độc giả hoặc hiển thị form sửa tùy thuộc vào thiết kế ứng dụng của bạn
    },
    deleteReader(id) {
      // Xử lý xoá độc giả
      // Sử dụng id để xác định độc giả cần xoá
      // Gửi yêu cầu AJAX hoặc xoá trực tiếp khỏi mảng this.readers
    },
    searchTheThuVien(soThe) {
      // Xử lý tìm kiếm mã thẻ thư viện
      // Sử dụng soThe để tìm kiếm
      // Gửi yêu cầu AJAX để tìm kiếm mã thẻ và hiển thị kết quả
    },
  },
};
</script>
