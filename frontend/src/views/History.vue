<template>
  <div class="container mx-auto p-2">
    <h2 class="text-2xl font-bold mb-4 uppercase text-center mt-4">
      Lịch sử mượn trả
    </h2>
    <div class="overflow-x-auto">
      <table class="w-full table-auto text-center">
        <thead>
          <tr class="bg-green-300">
            <th class="border px-4 py-2">Mã Phiếu Mượn</th>
            <th class="border px-4 py-2">Mã Độc Giả</th>
            <th class="border px-4 py-2">Mã Sach</th>
            <th class="border px-4 py-2">Ngày Mượn</th>
            <th class="border px-4 py-2">Hạn Trả</th>
            <th class="border px-4 py-2">Ngày Trả</th>
            <th class="border px-4 py-2">Số Lượng</th>
            <th class="border px-4 py-2">Phí</th>
            <th class="border px-4 py-2">Tình Trạng Lúc Trả</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in borrows" :key="row.borrowCode">
            <td class="border px-4 py-2">{{ row.borrowCode }}</td>
            <td class="border px-4 py-2">{{ row.readerCode }}</td>
            <td class="border px-4 py-2">{{ row.bookCode }}</td>
            <td class="border px-4 py-2">{{ formatDate(row.borrowDate) }}</td>
            <td class="border px-4 py-2">{{ formatDate(row.deadlineDate) }}</td>
            <!-- <td class="border px-4 py-2">{{ row.returnDate }}</td> -->
            <td class="border px-4 py-2">
              {{ row.returnDate ? formatDate(row.returnDate) : "Chưa Trả" }}
            </td>
            <td class="border px-4 py-2">{{ row.num }}</td>

            <td class="border px-4 py-2">{{ row.totalPrice }}</td>
            <td class="border px-4 py-2">{{ row.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4">
      <button
        @click="toggleStatistics"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Thống kê
      </button>
      <div
        v-if="showStatistics"
        class="mt-4 flex justify-around border border-gray-300 rounded-md p-4"
      >
        <h3 class="font-bold">Thống kê:</h3>
        <div class="ml-4 border-2 border-indigo-600 rounded p-1">
          Số lượng phiếu mượn đã được trả: <b>{{ daTraCount }}</b>
        </div>
        <div class="ml-4 border-2 border-indigo-600 rounded p-1">
          Số lượng phiếu mượn đang còn mượn: <b>{{ dangMuonCount }}</b>
        </div>
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
      borrows: [],
      daTraCount: 0,
      dangMuonCount: 0,
      showStatistics: false,
    };
  },
  mounted() {
    this.getBorrows();
  },
  methods: {
    async getBorrows() {
      try {
        const response = await axios.get(`${server}/borrow/get-borrows`);
        this.borrows = response.data.borrows;
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
    calculateStatistics() {
      // Đặt lại giá trị ban đầu cho biến
      this.daTraCount = 0;
      this.dangMuonCount = 0;

      // Tính số lượng phiếu mượn đã được trả và chưa được trả
      this.borrows.forEach((item) => {
        if (item.returnDate) {
          this.daTraCount++;
        } else {
          this.dangMuonCount++;
        }
      });
    },

    toggleStatistics() {
      this.showStatistics = !this.showStatistics;
      this.calculateStatistics();
    },
    formatDate(date) {
      // Sử dụng filter để định dạng ngày
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(date).toLocaleDateString("vi-VN", options);
    },
  },
};
</script>

<style>
/* Your custom styles here */
</style>
