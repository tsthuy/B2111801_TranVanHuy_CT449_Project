<template>
  <div class="container mx-auto">
    <h2 class="text-2xl font-bold mb-4 uppercase text-center mt-4">
      Lịch sử mượn trả
    </h2>
    <div class="overflow-x-auto">
      <table class="w-full table-auto text-center">
        <thead>
          <tr class="bg-blue-300">
            <th class="px-4 py-2">Mã Phiếu Mượn</th>
            <th class="px-4 py-2">Mã Độc Giả</th>
            <th class="px-4 py-2">Mã Sach</th>
            <th class="px-4 py-2">Mã Bản Sao</th>
            <th class="px-4 py-2">Ngày Mượn</th>
            <th class="px-4 py-2">Hạn Trả</th>
            <th class="px-4 py-2">Ngày Trả</th>
            <th class="px-4 py-2">Phí Phạt</th>
            <th class="px-4 py-2">Tình Trạng Lúc Trả</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in result" :key="row.maPhieuMuon">
            <td class="border px-4 py-2">{{ row.maPhieuMuon }}</td>
            <td class="border px-4 py-2">{{ row.maDocGia }}</td>
            <td class="border px-4 py-2">{{ row.maSach }}</td>
            <td class="border px-4 py-2">{{ row.maBanSao }}</td>
            <td class="border px-4 py-2">{{ row.ngayMuon }}</td>
            <td class="border px-4 py-2">{{ row.hanTra }}</td>
            <td class="border px-4 py-2">{{ row.ngayTra }}</td>
            <td class="border px-4 py-2">{{ row.phiPhat }}</td>
            <td class="border px-4 py-2">{{ row.ttLucTra }}</td>
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
export default {
  data() {
    return {
      result: [],
      daTraCount: 0,
      dangMuonCount: 0,
      showStatistics: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      fetch("your-api-endpoint")
        .then((response) => response.json())
        .then((data) => {
          this.result = data.result;
          this.calculateStatistics();
        })
        .catch((error) => console.error("Error:", error));
    },
    calculateStatistics() {
      this.daTraCount = this.result.filter((item) => item.ngayTra).length;
      this.dangMuonCount = this.result.filter((item) => !item.ngayTra).length;
    },
    toggleStatistics() {
      this.showStatistics = !this.showStatistics;
    },
  },
};
</script>

<style>
/* Your custom styles here */
</style>
