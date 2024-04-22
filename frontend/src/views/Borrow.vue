<template>
  <div>
    <div style="padding: 10px" class="container mx-auto py-8">
      <table
        v-if="results.length > 0"
        class="min-w-full divide-y divide-black-700 border border-black-600"
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Mã Độc Giả
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tên Độc Giả
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Địa Chỉ
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Số Thẻ Thư Viện
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Chọn
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="row in results" :key="row.MaDocGia">
            <td class="px-6 py-4 whitespace-nowrap">{{ row.MaDocGia }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ row.TenDocGia }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ row.DiaChi }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ row.SoThe }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="
                  fillForm(row.MaDocGia, row.TenDocGia, row.DiaChi, row.SoThe)
                "
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Chọn
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>No results found</div>
      <h2 class="text-2xl font-semibold mb-4 text-center uppercase">
        Mượn Sách
      </h2>
      <div class="bg-white p-4 shadow rounded">
        <form @submit.prevent="submitForm">
          <div>
            <h1 class="text-xl font-semibold mb-2">Thông tin sách</h1>
            <div
              class="bg-white p-2 shadow-inner rounded border-2 border-indigo-600 flex"
            >
              <div>
                <h3 class="text-lg font-semibold mb-2 text-red-500">
                  {{ bookInfo.tenSach }}
                </h3>
                <p class="text-gray-600 mb-4">Mã Sách: {{ bookInfo.maSach }}</p>
                <p class="text-gray-600 mb-4">Tác giả: {{ bookInfo.maTG }}</p>
                <p class="text-gray-600 mb-4">
                  Nhà xuất bản: {{ bookInfo.maNXB }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2 mt-4">
              Thông tin người mượn
            </h3>
            <div class="mb-4">
              <label
                for="MaDocGia"
                class="block text-sm font-medium text-gray-700"
                >Mã độc giả</label
              >
              <input
                v-model="borrower.MaDocGia"
                type="text"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div class="mb-4">
              <label
                for="tenDocGia"
                class="block text-sm font-medium text-gray-700"
                >Tên độc giả</label
              >
              <input
                v-model="borrower.TenDocGia"
                type="text"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div class="mb-4">
              <label
                for="diaChi"
                class="block text-sm font-medium text-gray-700"
                >Địa chỉ</label
              >
              <input
                v-model="borrower.DiaChi"
                type="text"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Số Thẻ Thư Viện</label
              >
              <input
                v-model="borrower.SoThe"
                type="text"
                class="form-control"
              />
            </div>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Tạo Phiếu Mượn
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      results: [],
      bookInfo: {
        tenSach: "",
        maSach: "",
        maTG: "",
        maNXB: "",
      },
      borrower: {
        MaDocGia: "",
        TenDocGia: "",
        DiaChi: "",
        SoThe: "",
      },
    };
  },
  computed: {
    loginText() {
      return this.loggedIn ? "Log out" : "Đăng Nhập";
    },
    loginLink() {
      return this.loggedIn ? "Logout.php" : "login.php";
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  methods: {
    searchReader() {
      // Gửi yêu cầu tìm kiếm độc giả
      if (this.keyword.trim() !== "") {
        // Gửi yêu cầu AJAX
        // Đối với mục đích minh họa, chúng ta sẽ không gửi yêu cầu AJAX thực sự ở đây
        // Thay vào đó, chỉ hiển thị dữ liệu giả định
        this.results = [
          {
            MaDocGia: "123",
            TenDocGia: "Nguyen Van A",
            DiaChi: "123 ABC Street",
            SoThe: "456789",
          },
          {
            MaDocGia: "456",
            TenDocGia: "Nguyen Thi B",
            DiaChi: "456 XYZ Street",
            SoThe: "123456",
          },
        ];
      }
    },
    fillForm(MaDocGia, TenDocGia, DiaChi, SoThe) {
      this.borrower = { MaDocGia, TenDocGia, DiaChi, SoThe };
    },
    submitForm() {
      // Gửi yêu cầu tạo phiếu mượn
      // Đối với mục đích minh họa, chúng ta sẽ không gửi yêu cầu thực sự ở đây
      // Thay vào đó, chỉ hiển thị thông báo giả định
      alert("Tạo phiếu mượn thành công!");
    },
  },
};
</script>

<style scoped>
/* Đặt style CSS tại đây */
</style>
