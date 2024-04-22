<template>
  <div>
    <div class="container mx-auto py-8 p-2">
      <h2 class="text-2xl font-semibold mb-4 text-center">Trả Sách</h2>
      <div class="bg-white p-4 shadow rounded border-2 border-indigo-600 p-2">
        <form @submit.prevent="returnBook" enctype="multipart/form-data">
          <div class="mb-4">
            <label
              for="maPhieuMuon"
              class="block text-sm font-medium text-gray-700"
              >Mã Phiếu Mượn</label
            >
            <input
              v-model="maPhieuMuon"
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
              v-model="hanTra"
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
              v-model="ngayTra"
              type="text"
              id="ngayTra"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              @change="calculateLateFee"
            />
            <button
              @click="calculateLateFee"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Tính Phí Phạt
            </button>
          </div>
          <div class="mb-4">
            <label for="phiPhat" class="block text-sm font-medium text-gray-700"
              >Phí Phạt</label
            >
            <input
              v-model="phiPhat"
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
              v-model="ttLucTra"
              type="text"
              id="ttLucTra"
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
export default {
  data() {
    return {
      maPhieuMuon: "",
      hanTra: "",
      ngayTra: "",
      phiPhat: "",
      ttLucTra: "",
    };
  },
  methods: {
    calculateLateFee() {
      const hanTraDate = new Date(this.hanTra);
      const ngayTraDate = new Date(this.ngayTra);
      const timeDiff = ngayTraDate.getTime() - hanTraDate.getTime();
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (diffDays > 0) {
        this.phiPhat = "10000"; // Phí phạt là 10k nếu trả muộn
      } else {
        this.phiPhat = "0"; // Không có phí phạt nếu trả đúng hạn hoặc sớm
      }
    },
    returnBook() {
      // Xử lý việc trả sách
    },
  },
};
</script>

<style>
/* Your custom styles here */
</style>
