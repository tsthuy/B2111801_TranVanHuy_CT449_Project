<template>
  <div>
    <div class="container mx-auto py-8 p-2">
      <div>
        <h3 class="text-lg font-semibold mb-2 mt-4">Thông tin người mượn</h3>
        <div class="flex flex-wrap mb-3">
          <div class="w-full md:w-1/2">
            <form @submit.prevent="searchBorrows" class="flex">
              <input
                v-model="keyword"
                class="form-input mr-2 border"
                type="search"
                placeholder="Tìm kiếm Độc Giả"
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
        </div>
        <table
          v-if="results.length > 0"
          class="min-w-full divide-y divide-black-700 border border-black table-auto"
        >
          <thead class="bg-green-500">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border"
              >
                Mã Phiếu Mượn
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border"
              >
                Hạn Trả
              </th>

              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border"
              >
                Chọn
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="row in results" :key="row.borrowCode">
              <td class="px-6 py-4 whitespace-nowrap border">
                {{ row.borrowCode }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border">
                {{ formatDate(row.deadlineDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border">
                <button
                  @click="fillForm(row.borrowCode, row.deadlineDate)"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Chọn
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else>No results found</div>
      </div>
      <h2 class="text-2xl font-semibold mb-4 text-center">Trả Sách</h2>
      <div class="bg-white shadow rounded border-2 border-indigo-600 p-2">
        <form @submit.prevent="returnBook" enctype="multipart/form-data">
          <div class="mb-4">
            <label
              for="maPhieuMuon"
              class="block text-sm font-medium text-gray-700"
              >Mã Phiếu Mượn</label
            >
            <input
              v-model="borrowInfo.borrowCode"
              type="text"
              id="maPhieuMuon"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="hanTra" class="block text-sm font-medium text-gray-700"
              >Hạn Trả</label
            >
            <input
              v-model="borrowInfo.deadlineDate"
              type="text"
              id="hanTra"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="ngayTra" class="block text-sm font-medium text-gray-700"
              >Ngày Trả</label
            >
            <input
              v-model="borrowInfo.returnDate"
              type="date"
              id="ngayTra"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="phiPhat" class="block text-sm font-medium text-gray-700"
              >Phí Phạt</label
            >
            <input
              v-model="borrowInfo.phiPhat"
              type="text"
              id="phiPhat"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label
              for="ttLucTra"
              class="block text-sm font-medium text-gray-700"
              >Tình Trạng Lúc Trả</label
            >
            <input
              v-model="borrowInfo.status"
              type="text"
              id="status"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto block"
          >
            Lưu Thông Tin Trả Sách
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../server";

export default {
  data() {
    return {
      results: [],
      keyword: "",
      borrows: [],
      borrowInfo: {
        borrowCode: "",
        deadlineDate: "",
        returnDate: "",
        totalPrice: "",
        status: "",
        phiPhat: "",
      },
    };
  },
  methods: {
    fillForm(borrowCode, deadlineDate) {
      this.borrowInfo = {
        borrowCode,
        deadlineDate: this.formatDate(deadlineDate),
      };
    },

    async returnBook() {
      try {
        // Gửi yêu cầu cập nhật thông tin trả sách tới backend
        const response = await axios.put(
          `${server}/borrow/update-borrow`,
          this.borrowInfo
        );
        console.log(response.data); // Log response từ backend
        this.$router.push("/history");
      } catch (error) {
        console.error("Error returning book:", error);
        // Xử lý lỗi (nếu cần)
      }
    },

    formatDate(date) {
      // Sử dụng filter để định dạng ngày
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(date).toLocaleDateString("vi-VN", options);
    },

    async getBorrows() {
      try {
        const response = await axios.get(`${server}/borrow/get-borrows`);
        this.borrows = response.data.borrows;
      } catch (error) {
        console.error("Error fetching borrows:", error);
      }
    },

    searchBorrows() {
      try {
        if (!this.keyword.trim()) {
          this.getBorrows();
        } else {
          const filteredBorrows = this.borrows.filter((borrow) =>
            borrow.borrowCode.toLowerCase().includes(this.keyword.toLowerCase())
          );
          this.results = filteredBorrows;
        }
      } catch (error) {
        console.error("Error searching borrows:", error);
      }
    },
  },
  mounted() {
    this.getBorrows();
  },
};
</script>

<style>
/* Your custom styles here */
</style>
